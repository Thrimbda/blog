---
"title": "Conceptos de RBAC y Diseño de Sistemas"
"summary": "Este artículo detalla el modelo de Control de Acceso Basado en Roles (RBAC), incluyendo sus conceptos centrales como los objetos sujeto, rol, permiso, sesión y sus relaciones de muchos a muchos. Explica que RBAC es un modelo de Control de Acceso Obligatorio (MAC), donde un administrador del sistema gestiona de forma centralizada los roles de los usuarios, y enfatiza que un sujeto solo puede ejercer los permisos de un rol durante una sesión. El autor explora además los escenarios de aplicación de RBAC, señalando que es adecuado para sistemas donde los recursos son compartidos por el sistema y tienen roles jerárquicos, como empresas comerciales y sistemas operativos que siguen el principio de privilegio mínimo. Simultáneamente, el artículo contrasta RBAC con el modelo de Control de Acceso Discrecional (DAC), indicando que DAC es más apropiado en sistemas donde los recursos son propiedad individual (como redes sociales), y menciona que en la práctica suelen mezclarse ambos modelos."
"tags":
  - "Diseño y Análisis de Sistemas"
  - "RBAC"
  - "Control de Acceso"
  - "MAC"
  - "DAC"
  - "Gestión de Permisos"
  - "Modelo de Roles"
  - "Modelo de Seguridad"
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

RBAC (**C**ontrol de **A**cceso **B**asado en **R**oles) es una técnica de control de acceso más neutral y flexible que el Control de Acceso Obligatorio (MAC) y el Control de Acceso Discrecional (DAC).

Primero, los diferentes objetos en RBAC:

- S = Sujeto (Subject) = Un usuario o agente automático
- R = Rol (Role) = Definido como una posición laboral o título con un nivel de autorización
- P = Permiso (Permission) = Una forma de acceder a un recurso
- SE = Sesión (Session) = La relación de mapeo entre S, R o P
- SA = Asignación de Sujeto (Subject Assignment)
- PA = Asignación de Permiso (Permission Assignment)
- RH = Jerarquía de Roles (Role Hierarchy). Puede representarse como: ≥ (x ≥ y significa que x hereda los permisos de y)

En segundo lugar, las relaciones entre estos objetos son las siguientes:

- **Sujeto** y **Rol** tienen una relación de muchos a muchos.

  ${\displaystyle SA\subseteq S\times R}$

- **Rol** y **Permiso** tienen una relación de muchos a muchos.

  ${\displaystyle PA\subseteq P\times R}$

<!--more-->

## Comprensión de RBAC

Después de comprender los conceptos relacionados con RBAC, comparto aquí mi propia interpretación.

RBAC es un tipo de MAC (**C**ontrol de **A**cceso **O**bligatorio), es decir, un administrador del sistema configura y gestiona de forma centralizada los roles de cada usuario.

La relación entre **S** (Sujeto), **R** (Rol) y **SE** (Sesión) es como se muestra en la figura anterior: aunque un sujeto puede tener múltiples roles, después de iniciar sesión en el sistema (es decir, durante una sesión con el sistema) solo puede ejercer los privilegios de un rol.

Mientras que **P** (Permiso) está determinado por los servicios proporcionados por el sistema. En realidad, es una combinación de los recursos que el sistema proporciona y las operaciones que se pueden realizar sobre ellos. Es precisamente esta combinación de recursos y operaciones lo que da significado al concepto de permiso.

### Aplicación

Mi definición del escenario de aplicación de RBAC es: **Un sistema donde los recursos son compartidos por el sistema y tiene múltiples roles jerárquicos con separación de responsabilidades**.

Los recursos son compartidos por el sistema y existen múltiples roles jerárquicos, lo que indica que los recursos del sistema tienen un significado diferente para cada rol. Por lo tanto, la responsabilidad que cada rol asume sobre los recursos también es diferente. Para este tipo de sistemas, RBAC es un modelo de control de acceso muy adecuado, que puede distribuir eficazmente derechos y responsabilidades, protegiendo y utilizando mejor los recursos del sistema.

Ejemplos: Empresas comerciales y sistemas operativos que siguen el principio de privilegio mínimo (Principle of least privilege).

Para un sistema donde los recursos son propiedad individual, cada rol es igual y tiene control total sobre sus propios recursos. En este caso, el modelo RBAC resulta insuficiente y debería utilizarse el modelo DAC (**C**ontrol de **A**cceso **D**iscrecional), lo cual es muy común en sistemas de redes sociales.

En escenarios reales, es imposible que existan recursos puramente compartidos o puramente exclusivos, por lo que a menudo se mezclan estos dos modelos. Por ejemplo: En WeChat, un usuario común tiene permisos de gestión completos sobre sus propios "recursos" (como el círculo de amigos). Pero un usuario común no puede gestionar a otros usuarios; la implementación de la función "reportar" depende de la intervención de otros roles dentro del sistema con mayores privilegios.