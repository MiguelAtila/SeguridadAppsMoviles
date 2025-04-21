# Diario Clínico

## Información de Modelo Entidad Relación

### Entidades Principales 

#### Usuario
-    id_usuario (PK)
-    nombre
-    correo
-    contraseña
-    fecha_registro
-    activo

#### Psicólogo
-    id_psicologo (PK)
-    nombre
-    correo
-    especialidad
-    cedula_profesional
-    contraseña

#### Cita
-    id_cita (PK)
-    id_usuario (FK)
-    id_psicologo (FK)
-    fecha_hora
-    estado
-    tipo_cita
-    fecha_creacion

#### Sesión
-    id_sesion (PK)
-    id_cita (FK)
-    notas_clinicas
-    recomendaciones
-    avance
-    documentos_adjuntos

#### Consentimiento
-    id_consentimiento (PK)
-    id_usuario (FK)
-    fecha_firma
-    consentimiento_aceptado

#### Penalización
-    id_penalizacion (PK)
-    id_usuario (FK)
-    motivo
-    fecha
-    activo

## Diagrama Relacional
![DiagramaBd](./assets/diagramaBd2.png)

## Relaciones Existentes entre Entidades

- Un Usuario puede tener muchas Citas.
- Un Psicólogo puede tener muchas Citas.
- Una Cita genera una única Sesión.
- Un Usuario debe aceptar un único Consentimiento.
- Un Usuario puede tener varias Penalizaciones.

## Tablas Relacionales 


## Tabla: usuarios

| Campo         | Tipo de Dato     | Clave     |
|---------------|------------------|-----------|
| usuario_id    | INT AUTO         | PK        |
| nombre        | VARCHAR(50)      |           |
| apellidos     | VARCHAR(50)      |           |
| email         | VARCHAR(100)     | UQ        |
| contraseña    | VARCHAR(255)     |           |
| fecha_registro| DATETIME         |           |

---

## Tabla: citas

| Campo         | Tipo de Dato     | Clave     |
|---------------|------------------|-----------|
| cita_id       | INT AUTO         | PK        |
| usuario_id    | INT              | FK        |
| fecha_cita    | DATETIME         |           |
| motivo        | TEXT             |           |
| estado        | VARCHAR(30)      | (Agendada, Cancelada, Finalizada) |

---

## Tabla: sesiones

| Campo          | Tipo de Dato     | Clave     |
|----------------|------------------|-----------|
| sesion_id      | INT AUTO         | PK        |
| cita_id        | INT              | FK        |
| fecha_sesion   | DATETIME         |           |
| notas          | TEXT             |           |
| avance         | TEXT             |           |

---

## Tabla: consentimientos

| Campo             | Tipo de Dato     | Clave     |
|-------------------|------------------|-----------|
| consentimiento_id | INT AUTO         | PK        |
| usuario_id        | INT              | FK        |
| fecha_firma       | DATETIME         |           |
| aceptado          | BOOLEAN          |           |

---

## Tabla: penalizaciones

| Campo             | Tipo de Dato     | Clave     |
|-------------------|------------------|-----------|
| penalizacion_id   | INT AUTO         | PK        |
| usuario_id        | INT              | FK        |
| motivo            | VARCHAR(100)     |           |
| fecha             | DATETIME         |           |
| observaciones     | TEXT             |           |

---

## Relaciones

- `usuarios` → `citas`: 1 a M (un usuario puede tener muchas citas)
- `citas` → `sesiones`: 1 a 1 o 1 a M (una cita puede generar una o más sesiones)
- `usuarios` → `consentimientos`: 1 a 1 (cada usuario tiene un consentimiento)
- `usuarios` → `penalizaciones`: 1 a M (un usuario puede tener varias penalizaciones)


## Reglas de Negocio

### Entidad: Usuarios

Representan a los terapeutas o administradores del sistema.


	•	Un usuario debe tener un email único para acceder al sistema.
	•	Un usuario puede registrar nuevos pacientes.
	•	Un usuario puede crear, modificar o cancelar citas.
	•	Un usuario puede registrar sesiones asociadas a una cita.
	•	Un usuario puede agregar y gestionar recursos para las sesiones.
	•	El nombre y apellido son requeridos para identificación profesional.
	•	La contraseña debe tener una longitud segura (mínimo 8 caracteres recomendados).

⸻

### Entidad: pacientes

Representan a las personas que reciben atención.

	•	Un paciente no puede registrarse por sí mismo, debe ser ingresado por un usuario.
	•	Cada paciente debe tener registrada su fecha de nacimiento y género.
	•	El consentimiento informado (campo consentimiento) debe estar marcado como TRUE antes de generar cualquier cita o sesión.
	•	Un paciente puede tener múltiples citas.
	•	No se debe permitir la eliminación de un paciente si tiene citas activas o sesiones registradas.

⸻

### Entidad: citas

Representan los encuentros programados entre el usuario y el paciente.

	•	Una cita debe estar asociada a un usuario y un paciente válidos.
	•	El campo estado solo puede tener los valores: programada, cancelada, o completada.
	•	Si una cita se cancela con menos de 24 horas de anticipación, se debe marcar penalizacion = TRUE.
	•	No se debe poder programar citas en el pasado.
	•	Las citas solo pueden modificarse si su estado es programada.
	•	Al completarse una cita, debe permitirse asociar una o más sesiones.

⸻

### Entidad: sesiones

Registran el detalle del trabajo clínico realizado durante una cita.


	•	Una sesión solo puede existir si hay una cita completada correspondiente.
	•	Las sesiones deben tener un tipo válido: artículo, video o podcast.
	•	Se permite registrar múltiples sesiones por cita.
	•	La descripción de la sesión debe estar presente, como resumen clínico o nota de evolución.
	•	Una sesión no puede ser editada después de 24 horas de registrada (por fines ético-legales).

⸻


