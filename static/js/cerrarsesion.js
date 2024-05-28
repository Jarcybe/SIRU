function CerrarSesion(){

    localStorage.removeItem("LogUsuario");
    alert("sesion cerrada");
    window.location.href = "/";


}