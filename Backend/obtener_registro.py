from flask import Flask, jsonify

app = Flask(__name__)



@app.route('/obtener_registro/<int:index>', methods=['GET'])
def obtener_registro(index):
    if 0 <= index < len(registros):
        return jsonify({"registro": registros[index]})
    else:
        return jsonify({"error": "Registro no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True)
