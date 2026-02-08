# Caffenio_Innovacore

Proyecto desarrollado para **Caffenio** como parte del **IMU**.

## Descripción General

Este proyecto tiene como objetivo construir una solución moderna, escalable y mantenible, siguiendo buenas prácticas de desarrollo y trabajo colaborativo.

La arquitectura estará basada en **microservicios**, permitiendo separar responsabilidades y facilitar el despliegue, mantenimiento y escalabilidad del sistema.

## Tecnologías

### Backend

* **TypeScript** como lenguaje principal.
* Arquitectura basada en microservicios.

### Frontend

* **React** o **Astro** (la elección final dependerá de cuál se adapte mejor al diseño y requerimientos del proyecto).

### Base de Datos

* **MongoDB** como base de datos **NoSQL**.

### Infraestructura

* Contenerización con **Docker** (pendiente definir el entorno de alojamiento).
* Implementación de **CI/CD** para automatizar pruebas y despliegues.

## Metodología de Trabajo

Se utilizará la metodología **SCRUM**, organizada de la siguiente manera:

* **3 Sprints** hasta la entrega final del proyecto.
* Los sprints no deberán exceder los **20 puntos**.
* Cada historia o tarea será claramente descrita.

### Seguimiento Diario

* Se evaluará la implementación de **Daily Meetings**.
* En caso de no realizarlas, se deberá reportar diariamente el progreso realizado.
* El seguimiento será compartido entre **Erick** y **Gael**, quienes revisarán los avances.

## Calidad y Pruebas

* Se realizarán **pruebas unitarias**, donde cada integrante será responsable de probar su propio código.
* Posteriormente, se pasará a una fase de **QA**, en la cual cada integrante probará el trabajo de otro.
* La documentación de pruebas será **clara y concisa**, evitando sobrecargarla y facilitando su replicación.

## Arquitectura del Sistema

La arquitectura del proyecto estará basada en **microservicios**, donde cada servicio es independiente, escalable y responsable de una funcionalidad específica del sistema.

### Enfoque Arquitectónico

* **Microservicios desacoplados**: cada servicio tendrá su propia lógica, configuración y pruebas.
* **Comunicación vía API (REST/HTTP)** entre servicios.
* **Base de datos NoSQL (MongoDB)**, con colecciones organizadas por dominio.
* Preparado para **contenedores Docker**, facilitando despliegues locales y productivos.

Esta arquitectura permite:

* Escalar servicios de forma independiente.
* Reducir el impacto de cambios.
* Facilitar el trabajo en paralelo del equipo.

## Organización del Proyecto

El proyecto se organizará por **servicios**, manteniendo una estructura clara y modular que permita crecer sin perder orden.

### Estructura General de Carpetas

```bash
Caffenio_Innovacore/
├── services/
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   └── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── user-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   └── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── other-service/
│       └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
├── .github/
│   └── workflows/   # CI/CD
├── README.md
└── docs/
    └── arquitectura.md
```

### Descripción de Carpetas Clave

* **services/**: contiene todos los microservicios del backend.
* **controllers/**: manejo de peticiones HTTP.
* **routes/**: definición de endpoints.
* **models/**: esquemas y modelos de MongoDB.
* **services/**: lógica de negocio.
* **middlewares/**: validaciones, autenticación, etc.
* **tests/**: pruebas unitarias del servicio.
* **frontend/**: aplicación web (React o Astro).
* **.github/workflows/**: pipelines de CI/CD.
* **docs/**: documentación adicional del proyecto.

Esta estructura permite mantener el proyecto ordenado y facilita la colaboración y el mantenimiento a largo plazo.

---

Este documento sirve como base inicial y podrá ajustarse conforme avance el desarrollo del proyecto.
