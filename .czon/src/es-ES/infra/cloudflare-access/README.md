# Runbook de Cloudflare Access con Terraform

Este directorio gestiona únicamente la aplicación y política de Cloudflare Zero Trust Access para la ruta `/const`. No lo utilices para DNS, Pages, Workers ni otros recursos no relacionados con Cloudflare.

## 1. Crea un token de API de Cloudflare con privilegios mínimos

En el panel de Cloudflare, abre **Mi perfil → Tokens de API → Crear token → Crear token personalizado**.

Forma recomendada del token:

- Nombre: `terraform-const-access` o similar, con un alcance reducido.
- Ámbito de cuenta: solo la cuenta de destino.
- Ámbito de zona: solo la zona de destino para el nombre de host del sitio.
- Permisos: únicamente lectura y escritura/edición de aplicaciones y políticas de Access. En la interfaz de Cloudflare puede aparecer como `Access: Apps and Policies Read` y `Access: Apps and Policies Write` o `Edit`.
- No otorgues la clave API global, administrador total, DNS Write, Zone Settings Write, Workers, Pages ni acceso a todas las cuentas o zonas.
- Medidas adicionales opcionales: caducidad del token y restricciones de IP de origen si se adaptan al entorno operativo.

Copia el token una sola vez y pégalo únicamente en el archivo SOPS que se indica más adelante. **No** pegues tokens, ID de cuenta, ID de zona, reglas de identidad, dominios de equipo, ID de grupo ni correos electrónicos en chats, documentación, historial de la terminal o archivos sin cifrar.

## 2. Rellena el archivo de entorno SOPS

Edita la plantilla dotenv cifrada desde la raíz del repositorio:

```sh
sops secrets/cloudflare-access.enc.env
```

Rellena al menos las siguientes variables dentro del editor de SOPS:

- `CLOUDFLARE_API_TOKEN`
- `TF_VAR_account_id`
- `TF_VAR_zone_id`
- `TF_VAR_site_hostname` — solo el nombre de host, sin esquema ni ruta.
- `TF_VAR_access_policy_include` — sintaxis de reglas Include de Access del proveedor v5, por ejemplo `[{"email":{"email":"REEMPLAZA_CON_TU_EMAIL"}}]` con tu valor de correo privado.

Mantén `TF_VAR_const_path=const` a menos que un cambio revisado por separado modifique intencionadamente la ruta protegida.

Comprueba que el archivo se descifra sin imprimir los valores:

```sh
sops -d secrets/cloudflare-access.enc.env >/dev/null
```

## 3. Ejecuta Terraform a través de `sops exec-env`

Desde la raíz del repositorio, ejecuta Terraform con los secretos inyectados únicamente en el proceso hijo:

Si `terraform` no está en el `PATH`, entra primero en `nix-shell`; `shell.nix` incluye Terraform para este flujo de trabajo.

```sh
terraform -chdir=infra/cloudflare-access fmt -check
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access init'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access validate'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access plan'
```

Revisa el plan antes de aplicar. Debe afectar únicamente a:

- `cloudflare_zero_trust_access_policy.const`
- `cloudflare_zero_trust_access_application.const`

La cobertura de destino debe seguir siendo el nombre de host de destino más exactamente:

- `/const`
- `/const/`
- `/const/*`

No continúes si el plan incluye DNS, Pages, Workers, protección de todo el dominio, recursos no relacionados o reglas de identidad inesperadas.

Solo después de que el plan sea aceptable y el operador o usuario apruebe explícitamente la puerta de aplicación:

```sh
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access apply'
```

No ejecutes `terraform destroy` a menos que se solicite explícitamente como una reversión destructiva separada.

## 4. Manejo del estado local cifrado

Esta pila utiliza intencionadamente estado local de Terraform, pero la copia duradera rastreada está cifrada con SOPS:

```text
secrets/cloudflare-access.tfstate.enc.json
```

Antes de planificar o aplicar, restaura el estado si ya existe un estado cifrado:

```sh
if [ -f secrets/cloudflare-access.tfstate.enc.json ]; then
  sops -d --input-type json --output-type json \
    --output infra/cloudflare-access/terraform.tfstate \
    secrets/cloudflare-access.tfstate.enc.json
  chmod 600 infra/cloudflare-access/terraform.tfstate
fi
```

Después de una aplicación exitosa, cifra el estado resultante a través de un archivo temporal, verifícalo y luego muévelo a su ubicación definitiva:

```sh
tmp_state="$(mktemp /tmp/cloudflare-access.tfstate.enc.json.XXXXXX)"
sops --encrypt --input-type json --output-type json \
  --filename-override secrets/cloudflare-access.tfstate.enc.json \
  --output "$tmp_state" \
  infra/cloudflare-access/terraform.tfstate
sops -d --input-type json --output-type json "$tmp_state" >/dev/null
mv "$tmp_state" secrets/cloudflare-access.tfstate.enc.json
rm -f infra/cloudflare-access/terraform.tfstate \
      infra/cloudflare-access/terraform.tfstate.backup
```

Nunca hagas commit del archivo `terraform.tfstate` en texto plano, copias de seguridad del estado, archivos de plan, `terraform.tfvars`, `*.auto.tfvars` o archivos de entorno sin cifrar. La lista blanca de `.gitignore` es solo para el archivo de estado cifrado mencionado anteriormente.

## 5. Puerta de aplicación

Solo se permite aplicar después de que se cumplan todas las condiciones siguientes:

1. El archivo de entorno SOPS está relleno localmente y se descifra correctamente sin imprimir valores.
2. Las variables de entorno requeridas están presentes a través de `sops exec-env`.
3. `terraform fmt`, `init`, `validate` y `plan` finalizan con éxito.
4. El plan se limita a la aplicación y política de Access previstas y a la cobertura de la ruta `/const`.
5. El operador o usuario acepta explícitamente el plan revisado.

Si alguna compuerta falla, detente y corrige el problema concreto antes de reintentar. No amplíes los permisos del token de Cloudflare más allá del ámbito de aplicaciones y políticas de Access sin revisión previa.