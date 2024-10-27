from flask import Flask, Blueprint, request, jsonify, url_for
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
    
    remitente = 'aguilaryoseph@gmail.com' 
    contraseña = 'ljyb iplw mnqp vqja'     
    servidor = smtplib.SMTP('smtp.gmail.com', 587)
    servidor.starttls()
    servidor.login(remitente, contraseña)

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
    correo = data.get('Correo')
    tipo = data.get('Tipo', 'Usuario')
    nombre = data.get('Nombre')
    contraseña = data.get('Contraseña')
    estado = data.get('Estado', True)

    # Verificar si el correo ya existe en la base de datos
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM Usuarios WHERE correo = %s", (correo,))
    usuario_existente = cursor.fetchone()
    if usuario_existente:
        return jsonify({'success': False, 'message': 'El correo ya existe'})


    DatosTemporales[correo]={
        'tipo': tipo,
        'nombre': nombre,
        'contraseña': contraseña,
        'estado': estado
    }

    # Generar el token para activación de la cuenta
    token = generar_token(correo)
    url_activacion = url_for('registrar_correo_bp.activar_cuenta', 
                             token=token, 
                             _external=True)
    asunto = "Activa tu cuenta"
    cuerpo = f"Por favor haz clic en el siguiente enlace para activar tu cuenta: {url_activacion}, con nombre {nombre} y contraseña {contraseña}"

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
                         max_age=3000)  # El token expira en 5 minutos
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
    "INSERT INTO Usuarios (correo, tipo, nombre, contraseña, estado) VALUES (%s, %s, %s, %s, %s)",
     (correo, InfoUsuario['tipo'], InfoUsuario['nombre'], InfoUsuario['contraseña'], InfoUsuario['estado'])
    )
    conexion.commit()

    return jsonify({'success': True, 'message': 'Cuenta activada exitosamente'})


app.register_blueprint(registrar_correo_bp)

if __name__ == '__main__':
    app.run(port=5000)