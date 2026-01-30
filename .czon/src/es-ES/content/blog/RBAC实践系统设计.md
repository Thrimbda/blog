---
"title": "Conceptos de RBAC y Diseño de Sistemas"
"summary": "Este artículo detalla los conceptos centrales del modelo RBAC (Control de Acceso Basado en Roles), incluyendo los objetos como sujeto, rol, permiso, sesión y sus relaciones de muchos a muchos. Explica que RBAC es un modelo de control de acceso obligatorio, administrado de manera centralizada por el administrador del sistema, y enfatiza que durante una sesión, un sujeto solo puede ejercer los permisos de un rol. El autor explora además los escenarios de aplicación de RBAC, es decir, sistemas donde los recursos son compartidos por el sistema y existen múltiples roles jerárquicos, como empresas comerciales y sistemas operativos que siguen el principio del mínimo privilegio. Simultáneamente, el artículo contrasta el modelo DAC (Control de Acceso Discrecional), señalando que DAC es más apropiado en sistemas donde los recursos son propiedad individual, y sugiere el uso combinado de ambos modelos en escenarios reales. Finalmente, utiliza WeChat como ejemplo para ilustrar la aplicación práctica del modelo híbrido."
"tags":
  - "RBAC"
  - "Diseño de Sistemas"
  - "Control de Acceso"
  - "Gestión de Permisos"
  - "MAC"
  - "DAC"
  - "Rol"
  - "Principio del Mínimo Privilegio"
"date": "2017-05-07"
---

---
title: Conceptos de RBAC y Diseño de Sistemas
date: 2017-05-07
taxonomies:
  tags:
    - Diseño y Análisis de Sistemas
    - RBAC
---

![RBACmodel](http://0xc1.space/images/2017/05/07/RBACmodel.png)

## Conceptos de RBAC

RBAC (**C**ontrol de **A**cceso **B**asado en **R**oles) es una tecnología de control de acceso más neutral y flexible que los modelos de control de acceso obligatorio y discrecional.

Primero, varios objetos en RBAC:

- S = Sujeto (Subject) = Un usuario o agente automático
- R = Rol (Role) = Definido como una posición laboral o título con un nivel de autorización
- P = Permiso (Permission) = Una forma de acceder a un recurso
- SE = Sesión (Session) = Relación de mapeo entre S, R o P
- SA = Asignación de Sujeto (Subject Assignment)
- PA = Asignación de Permiso (Permission Assignment)
- RH = Jerarquía de Roles (Role Hierarchy). Puede representarse como: ≥ (x ≥ y significa que x hereda los permisos de y)

En segundo lugar, las relaciones entre los objetos son las siguientes:

- **Sujeto** y **Rol** tienen una relación de muchos a muchos.

  ${\displaystyle SA\subseteq S\times R}$

- **Rol** y **Permiso** tienen una relación de muchos a muchos.

  ${\displaystyle PA\subseteq P\times R}$

<!--more-->

## Comprensión de RBAC

Después de comprender los conceptos relacionados con RBAC, aquí comparto mi propia interpretación.

RBAC es un tipo de MAC (**C**ontrol de **A**cceso **O**bligatorio), es decir, es configurado y administrado de manera centralizada por el administrador del sistema para los roles de los usuarios.

La relación entre **S** (Sujeto), **R** (Rol) y **SE** (Sesión) se muestra en la figura anterior. Aunque un sujeto puede tener múltiples roles, después de iniciar sesión en el sistema (es decir, durante una sesión con el sistema), solo puede ejercer la autoridad de un rol.

Mientras que **P** (Permiso) está determinado por los servicios proporcionados por el sistema. En realidad, es una combinación de los recursos proporcionados por el sistema y las operaciones realizadas sobre esos recursos. Es precisamente esta combinación de recursos y operaciones lo que da significado al concepto de permiso.

### Aplicación

Mi definición del escenario de aplicación de RBAC: **Un sistema donde los recursos son compartidos por el sistema y existen múltiples roles jerárquicos con separación de responsabilidades**.

Los recursos son compartidos por el sistema y existen múltiples roles jerárquicos, lo que indica que los recursos del sistema tienen un significado diferente para cada rol. Por lo tanto, la responsabilidad que cada rol asume sobre los recursos también es diferente. Para tales sistemas, RBAC es un modelo de control de acceso muy adecuado, que puede asignar efectivamente derechos y responsabilidades, protegiendo y utilizando mejor los recursos del sistema.

Ejemplos: Empresas comerciales y sistemas operativos que siguen el principio del mínimo privilegio (Principle of least privilege).

Para un sistema donde los recursos son propiedad individual, cada rol es igual, y cada rol tiene control total sobre sus propios recursos. En este caso, el modelo RBAC parece inadecuado, y debería usarse el modelo DAC (**C**ontrol de **A**cceso **D**iscrecional), lo cual es muy común en sistemas de redes sociales.

En escenarios reales, no puede existir un recurso puramente compartido o puramente exclusivo, por lo que a menudo se combinan estos dos modelos. Por ejemplo: en WeChat, los usuarios comunes tienen permisos de administración completos sobre sus propios "recursos" (como el círculo de amigos). Sin embargo, los usuarios comunes no pueden administrar a otros usuarios. La implementación de la función "reportar" depende de la intervención de otros roles en el sistema con mayores privilegios.