from flask import Flask, Blueprint, request, jsonify, url_for, render_template_string
import mysql.connector
import smtplib
from email.mime.text import MIMEText
from itsdangerous import URLSafeTimedSerializer

app = Flask(__name__)
registrar_correo_bp = Blueprint('registrar_correo_bp', __name__)

app.config['SECRET_KEY'] = 'clave_secreta_para_firmar'

# Configuración de la base de datos
conexion = mysql.connector.connect(
       host="localhost",  
        user="root",     
        password="",        
        database="siru"
)

# Inicialización del serializador para generar tokens
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

DatosTemporales = {}

def generar_token(correo):
    return s.dumps(correo, 
                   salt="token-activacion")

def enviar_correo(destinatario, asunto, cuerpo):
    
    remitente = 'sirunivalle@gmail.com' 
    contra = 'hqru wcwf ssya ozam'     
    servidor = smtplib.SMTP('smtp.gmail.com', 587)
    servidor.starttls()
    servidor.login(remitente, contra)

    # Crear el mensaje
    mensaje = MIMEText(cuerpo)
    mensaje['From'] = remitente
    mensaje['To'] = destinatario
    mensaje['Subject'] = asunto

    # Enviar el correo
    servidor.sendmail(remitente, destinatario, mensaje.as_string())
    servidor.quit()

@registrar_correo_bp.route('/registrar_correo', methods=['POST'])
def registrar_correo():

    # Obtener los datos enviados desde el cliente
    data = request.get_json()
    correo = data.get('correo')
    tipo = data.get('tipo', 'Usuario')
    nombre = data.get('nombre')
    password = data.get('password')
    estado = data.get('estado', True)

    if not correo.endswith('@correounivalle.edu.co'):
        return jsonify({'success': False, 'error': 'CorreoInvalido',
                        'message': 'El correo debe terminar en @correounivalle.edu.co'}), 400

    # Verificar si el correo ya existe en la base de datos
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE correo = %s", (correo,))
    usuario_existente = cursor.fetchone()
    if usuario_existente:
        return jsonify({'success': False, 'error': 'CorreoExistente',
                        'message': 'El correo ya existe'}), 400


    DatosTemporales[correo]={
        'tipo': tipo,
        'nombre': nombre,
        'password': password,
        'estado': estado
    }

    # Generar el token para activación de la cuenta
    token = generar_token(correo)
    url_activacion = url_for('registrar_correo_bp.activar_cuenta', 
                             token=token, 
                             _external=True)
    asunto = "Activa tu cuenta"
    cuerpo = f"Por favor haz clic en el siguiente enlace para activar tu cuenta: {url_activacion}, con nombre {nombre}"

    # Enviar el correo con el token
    enviar_correo(correo, asunto, cuerpo)

    return jsonify({'success': True, 
                    'message': 'Correo de activación enviado'})


@registrar_correo_bp.route('/activar/<token>', methods=['GET'])
def activar_cuenta(token):

    try:
        # Verificar el token y obtener el correo asociado
        correo = s.loads(token, 
                         salt="token-activacion", 
                         max_age=300)  # El token expira en 5 minutos
    except:
        return jsonify({'success': False, 
                        'message': 'Token inválido o expirado'})
    
    #obtener los datos del usuario almacenados temporalmente
    InfoUsuario= DatosTemporales.pop(correo, None)

    if InfoUsuario is None:
        return jsonify({'sucess': False, 
                        'message': 'No se encontraron datos para este correo'})

    cursor = conexion.cursor()
    cursor.execute(
        ##CAMBIAR LO DE CODIGO Y CONTRASEÑA 
    "INSERT INTO usuarios (correo, tipo, nombre, password, estado) VALUES (%s, %s, %s, %s, %s)",
     (correo, InfoUsuario['tipo'], InfoUsuario['nombre'], InfoUsuario['password'], InfoUsuario['estado'])
    )
    conexion.commit()

    html_content = '''

<!DOCTYPE html>
<html lang="es">
<head>
   <meta charset= "UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title> Activacion de la cuenta </title>
   <style>
      body{
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f4f4f9;
      }

      .card {
      max-width: 400px;
      padding: 20px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      text-align: center;
      }

      h1{
      color: #4CAF50;
      font-size:24px;
      }

        p {
                font-size: 16px;
                color: #333;
            }
            .button {
                padding: 10px 20px;
                color: #fff;
                background-color: #ff0000;
                border: none;
                border-radius: 5px;
                text-decoration: none;
                font-size: 16px;
                margin-top: 15px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>¡Cuenta Activada Exitosamente!</h1>
            <p>Gracias por confirmar tu cuenta, {{ nombre }}. Ahora puedes iniciar sesión.</p>
            <a href="/" 
            class="button">
            Ir a la página principal</a>

            <!--falta el enlace-->
        </div>
    </body>
    </html>
    '''
    return render_template_string(html_content, nombre=InfoUsuario['nombre'])
    