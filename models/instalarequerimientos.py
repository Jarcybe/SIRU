import subprocess
import sys

# Lista de requisitos
requirements = [
    "alembic==1.13.1",
    "bidict==0.22.1",
    "blinker==1.7.0",
    "click==8.1.7",
    "colorama==0.4.6",
    "Flask==3.0.0",
    "Flask-Cors==4.0.1",
    "Flask-Migrate==4.0.7",
    "Flask-SocketIO==5.3.6",
    "Flask-SQLAlchemy==3.1.1",
    "greenlet==3.0.3",
    "h11==0.14.0",
    "itsdangerous==2.1.2",
    "Jinja2==3.1.2",
    "Mako==1.3.5",
    "MarkupSafe==2.1.3",
    "mysql-connector-python==8.4.0",
    "python-engineio==4.8.0",
    "python-socketio==5.10.0",
    "simple-websocket==1.0.0",
    "SQLAlchemy==2.0.30",
    "typing_extensions==4.11.0",
    "Werkzeug==3.0.1",
    "wsproto==1.2.0"
]

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

if __name__ == "__main__":
    for req in requirements:
        try:
            print(f"Instalando {req}...")
            install(req)
            print(f"{req} instalado correctamente.")
        except subprocess.CalledProcessError:
            print(f"Error al instalar {req}")
