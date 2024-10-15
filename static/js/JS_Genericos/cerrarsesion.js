function CerrarSesion(){

    localStorage.removeItem("LogUsuario");
      Swal.fire({
                title: "Sesion cerrada",
                text: "Vuelva pronto",
                icon: 'success'
            }).then(() => {
                window.location.href = "/";
            });
}