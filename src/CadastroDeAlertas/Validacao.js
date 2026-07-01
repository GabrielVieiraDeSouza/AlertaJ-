
let usuario = JSON.parse(localStorage.getItem("alertaJa_sessao"));

if (!usuario.admin){
    window.location.href = "/src"
}