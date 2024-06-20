import unittest
import sys
import os
from flask import Flask, json
from flask_testing import TestCase
import mysql.connector
from unittest.mock import patch, MagicMock

# Asegurar que el directorio raíz del proyecto esté en el PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Importar el blueprint de registro
from Backend.registro import registro_bp

class TestRegistroBlueprint(TestCase):
    def create_app(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False

        # Registra el blueprint con un prefijo de URL único
        app.register_blueprint(registro_bp, url_prefix='/test_registro', name='test_registro_bp')
        
        return app

# Testeo de codigo existente y se logre registrar correctamente

    @patch('Backend.registro.conectar_bd')
    def test_registro_exitoso(self, mock_conectar_bd):
        mock_conexion = MagicMock()
        mock_cursor = MagicMock()
        mock_conectar_bd.return_value = mock_conexion
        mock_conexion.cursor.return_value = mock_cursor

        mock_cursor.fetchone.return_value = ('11', 'Steven', '1')  # Simular que el usuario existe

        data = {
            'codigo': '11',
            'nombre': 'Steven',
            'contraseña': '1',
            'confirmacion': '1'
        }
        response = self.client.post('/test_registro/registro', data=json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['mensaje'], 'Registro exitoso')

#Testeo si no hay un codigo existente
    @patch('Backend.registro.conectar_bd')
    def test_codigo_inexistente(self, mock_conectar_bd):
        mock_conexion = MagicMock()
        mock_cursor = MagicMock()
        mock_conectar_bd.return_value = mock_conexion
        mock_conexion.cursor.return_value = mock_cursor

        mock_cursor.fetchone.return_value = None  # Simular que el usuario no existe

        data = {
            'codigo': '12345678',
            'nombre': 'Steven',
            'contraseña': '1',
            'confirmacion': '1'
        }
        response = self.client.post('/test_registro/registro', data=json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertEqual(data['mensaje'], 'El código no está registrado')

#Testeo de errores en la conexion a la base de datos
    @patch('Backend.registro.conectar_bd')
    def test_error_conexion_bd(self, mock_conectar_bd):
        mock_conectar_bd.return_value = None  # Simular error al conectar a la base de datos

        data = {
            'codigo': '11',
            'nombre': 'Steven',
            'contraseña': '1',
            'confirmacion': '1'
        }
        response = self.client.post('/test_registro/registro', data=json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 500)
        data = json.loads(response.data)
        self.assertEqual(data['mensaje'], 'Error al conectar a la base de datos')

    @patch('Backend.registro.conectar_bd')
    def test_error_interno_servidor(self, mock_conectar_bd):
        mock_conexion = MagicMock()
        mock_cursor = MagicMock()
        mock_conectar_bd.return_value = mock_conexion
        mock_conexion.cursor.side_effect = Exception('Error interno')

        data = {
            'codigo': '11',
            'nombre': 'Steven',
            'contraseña': '1',
            'confirmacion': '1'
        }
        response = self.client.post('/test_registro/registro', data=json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 500)
        data = json.loads(response.data)
        self.assertEqual(data['mensaje'], 'Error interno del servidor')

    def test_campos_obligatorios(self):
        data = {'codigo': '11', 'nombre': 'Steven'}  # Faltan campos de contraseña y confirmación
        response = self.client.post('/test_registro/registro', data=json.dumps(data), content_type='application/json')
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertEqual(data['mensaje'], 'Todos los campos son obligatorios')

# Definir una función para ejecutar las pruebas y manejar la salida
def run_tests():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestRegistroBlueprint)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    if result.wasSuccessful():
        print("\nExcelente, funcionaron todas las pruebas")
    else:
        print("\nHubo fallos en las pruebas")

if __name__ == '__main__':
    run_tests()
