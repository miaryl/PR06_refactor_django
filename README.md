# IdentityMap Django Refactoring & Integration

Proyecto de integración y refactorización del módulo de evaluación psicométrica y motivacional IdentityMap (Nexus DNA) dentro de una arquitectura estándar Model-View-Template (MVT) en Django.

<img width="1544" height="886" alt="Screenshot 2026-09-18 235518" src="https://github.com/user-attachments/assets/a1590b78-4fc1-4bb7-b30e-f227d8406c33" />


📋 Descripción del Proyecto

El proyecto toma una aplicación web originalmente construida como un prototipo monolítico en un único archivo HTML (IdentityMap.html) y la reestructura siguiendo las mejores prácticas de desarrollo web con Django:

Desacoplamiento de Estilos y Lógica: Extracción de reglas CSS y lógica JavaScript a archivos estáticos dedicados (static/).

Plantillas Django (Templates): Limpieza del archivo HTML utilizando el motor de renderizado de plantillas de Django y la etiqueta {% static %}.

Rutas y Controladores: Configuración de vistas modulares (views.py) y enrutamiento centralizado (urls.py).

Preparado para Backend: Conectividad lista para persistencia de datos (POST de resultados psicométricos y reportes generados por IA).

📂 Estructura del Proyecto

```diagram
django_refactor/
│
├── manage.py
├── .gitignore
├── README.md
│
├── config/                      # Configuración global del proyecto Django
│   ├── __init__.py
│   ├── settings.py              # Configuración de apps, templates y static
│   ├── urls.py                  # Enrutamiento raíz
│   ├── asgi.py
│   └── wsgi.py
│
└── assessment/                  # Aplicación de evaluación (IdentityMap)
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py                # Modelos para almacenamiento de resultados
    ├── views.py                 # Lógica de renderizado y endpoints de API
    ├── urls.py                  # Rutas internas de la app
    ├── templates/
    │   └── IdentityMap.html    # Plantilla HTML refactorizada
    └── static/
        ├── css/
        │   └── identitymap.css # Estilos CSS desacoplados
        └── js/
            └── identitymap.js  # Lógica del test, scoring y gráficos
```

🛠️ Tecnologías Utilizadas

Backend: Python 3.12+ / Django 5+

Frontend: HTML5, CSS3 modular (Tailwind-like custom properties), JavaScript Vanilla (ES6+)

Librerías externas:

Chart.js 4.4+ (renderizado de gráficos radar y barras)

Google Fonts (Montserrat, JetBrains Mono)

🚀 Instalación y Puesta en Marcha

1. Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>
cd django_refactor


2. Crear y activar el entorno virtual

En Windows (PowerShell):

python -m venv .venv
.venv\Scripts\Activate.ps1


En macOS / Linux:

python -m venv .venv
source .venv/Scripts/activate


3. Instalar dependencias

pip install django


4. Aplicar migraciones iniciales

python manage.py migrate


5. Iniciar el servidor de desarrollo

python manage.py runserver


Abre tu navegador en http://localhost:8000/ para acceder a la aplicación.
