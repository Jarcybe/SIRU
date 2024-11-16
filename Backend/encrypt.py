import hashlib
from flask import Blueprint, jsonify, request

encriptar_bp = Blueprint('encriptar', __name__)

@encriptar_bp.route('/encriptar', methods=['POST'])
def registrar_contraseña():
    data = request.get_json()
    password = data.get("password")

    if not password:
        return jsonify({"error": "Contraseña no proporcionada"}), 400

    hashed = hashlib.sha256(password.encode('utf-8')).hexdigest()
    return jsonify({"hashed_password": hashed})
