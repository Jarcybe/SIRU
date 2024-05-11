from flask import Flask, render_template


app = Flask(__name__, template_folder="templates")


# Página de menú de registro (MenuRegistro.html)
@app.route('/')
def menu_registro():
    return render_template('MenuRegistro.html')

# Página de menú principal (MenuPrincipal.html)
@app.route('/menu_principal')
def menu_principal():
    return render_template('MenuPrincipal.html')

# Página de menú de administrador (MenuAdmin.html)
@app.route('/menu_admin')
def menu_admin():
    return render_template('MenuAdmin.html')



if __name__ == '__main__':
    app.run(debug=True)

