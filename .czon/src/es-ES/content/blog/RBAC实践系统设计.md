---
title: Conceptos y Diseño de Sistemas RBAC
date: 2017-05-07
taxonomies:
  tags:
    - Diseño y Análisis de Sistemas
    - RBAC
---

![RBACmodel](http://0xc1.space/images/2017/05/07/RBACmodel.png)

## Conceptos de RBAC

RBAC (**C**ontrol de **A**cceso **B**asado en **R**oles) es un modelo de control de acceso que, en comparación con el control de acceso obligatorio y el control de acceso discrecional, es más neutral y flexible.

Primero, los diferentes objetos en RBAC:

- S = Sujeto (Subject) = Un usuario o agente automático
- R = Rol (Role) = Definido como un puesto de trabajo o título con un nivel de autorización
- P = Permiso (Permission) = Una forma de acceder a un recurso
- SE = Sesión (Session) = Relación de mapeo entre S, R o P
- SA = Asignación de Sujeto (Subject Assignment)
- PA = Asignación de Permiso (Permission Assignment)
- RH = Jerarquía de Roles (Role Hierarchy). Puede representarse como: ≥ (x ≥ y significa que x hereda los permisos de y)

En segundo lugar, las relaciones entre estos objetos son las siguientes:

- La relación entre **Sujeto** y **Rol** es de muchos a muchos.

  ${\displaystyle SA\subseteq S\times R}$

- La relación entre **Rol** y **Permiso** es de muchos a muchos.

  ${\displaystyle PA\subseteq P\times R}$


<!--more-->

## Comprensión de RBAC

Después de comprender los conceptos relacionados con RBAC, comparto mi propia interpretación.

RBAC es un tipo de MAC (**C**ontrol de **A**cceso **O**bligatorio), es decir, la configuración y gestión de los roles de usuario la realiza de manera unificada un administrador del sistema.

La relación entre **S** (Sujeto), **R** (Rol) y **SE** (Sesión) se muestra en la imagen anterior. Aunque un sujeto puede tener múltiples roles, una vez que inicia sesión en el sistema (es decir, durante una sesión con el sistema) solo puede ejercer los privilegios de un rol.

Los **P** (Permisos) están determinados por los servicios que proporciona el sistema. En realidad, son una combinación de los recursos que el sistema ofrece y las operaciones que se pueden realizar sobre ellos. Es precisamente esta combinación de recursos y operaciones lo que da significado al concepto de permiso.



### Aplicación

Mi definición del escenario de aplicación de RBAC es: **Un sistema donde los recursos son compartidos por el sistema y existen múltiples roles jerárquicos con responsabilidades separadas**.

Los recursos son compartidos por el sistema y existen múltiples roles jerárquicos, lo que indica que los recursos del sistema tienen un significado diferente para cada rol. Por lo tanto, la responsabilidad que cada rol asume sobre los recursos también es diferente. Para este tipo de sistemas, RBAC es un modelo de control de acceso muy adecuado, ya que puede asignar eficazmente derechos y responsabilidades, protegiendo y utilizando mejor los recursos del sistema.

Ejemplos: Empresas comerciales y sistemas operativos que siguen el principio de privilegio mínimo (Principle of least privilege).



En cambio, para un sistema donde los recursos son propiedad de individuos, cada rol es igual y tiene control total sobre sus propios recursos. En este caso, el modelo RBAC resulta insuficiente y debería utilizarse el modelo DAC (**C**ontrol de **A**cceso **D**iscrecional), que es muy común en sistemas de redes sociales.

En escenarios reales, es raro encontrar recursos puramente compartidos o puramente exclusivos, por lo que a menudo se combinan ambos modelos. Por ejemplo: en WeChat, un usuario común tiene permisos de administración completos sobre sus "recursos" (como el círculo de amigos). Sin embargo, un usuario común no puede administrar a otros usuarios. La implementación de funciones como "reportar" depende de la intervención de otros roles dentro del sistema que tengan permisos más altos.