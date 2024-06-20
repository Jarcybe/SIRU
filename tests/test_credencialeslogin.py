import unittest
import sys
import os
from flask import json
from flask_testing import TestCase

# Asegurar que el directorio raíz del proyecto esté en el PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Importar la aplicación Flask
from app import app

# Importar la función para verificar credenciales
from Backend.login import verificar_credenciales

class TestLoginBlueprint(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        return app

    def test_verificar_credenciales_correctas(self):
        # Prueba con las credenciales correctas
        usuario = verificar_credenciales('123', '3')
        self.assertIsNotNone(usuario)
        self.assertEqual(usuario[0], '123')
        self.assertEqual(usuario[1], 'Admin')  # Asegurar que el tipo es Admin

    def test_verificar_credenciales_incorrectas(self):
        # Prueba con credenciales incorrectas
        usuario = verificar_credenciales('456', 'wrong_password')
        self.assertIsNone(usuario)  # Debe devolver None si las credenciales son incorrectas

    def test_login_route_correct_credentials(self):
        # Prueba de la ruta de inicio de sesión con credenciales correctas
        response = self.client.post('/login', 
                                    data=json.dumps(dict(codigo='123', contraseña='3')),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data['success']) 
        self.assertIn('usuario', data)
        self.assertEqual(data['usuario']['codigo'], '123')
        self.assertEqual(data['usuario']['tipo'], 'Admin')  # Asegurar que el tipo es Admin
        self.assertIn('nombre', data['usuario'])

    def test_login_route_incorrect_credentials(self):
        # Prueba de la ruta de inicio de sesión con credenciales incorrectas
        response = self.client.post('/login', 
                                    data=json.dumps(dict(codigo='124', contraseña='12')),
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertFalse(data['success'])  # Debe ser False si las credenciales son incorrectas
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Código o contraseña incorrectos')

        # Opcional: Imprimir un mensaje si las credenciales son incorrectas
        if not data['success']:
            print("\nLos datos son incorrectos")

    def test_logout_route(self):
        # Iniciar sesión primero
        response_login = self.client.post('/login', 
                                         data=json.dumps(dict(codigo='123', contraseña='3')),
                                         content_type='application/json')
        self.assertEqual(response_login.status_code, 200)

        # Luego probar el cierre de sesión
        response_logout = self.client.get('/logout')
        self.assertEqual(response_logout.status_code, 302)  # Debe redirigir después del cierre de sesión

# Definir una función para ejecutar las pruebas y manejar la salida
def run_tests():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestLoginBlueprint)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    if result.wasSuccessful():
        print("\nExcelente, funcionaron todas las pruebas")
    else:
        print("\nHubo fallos en las pruebas")

if __name__ == '__main__':
    run_tests()
