
const textoEntrada = document.querySelector('.texto-entrada');
const textoSalida = document.querySelector('.texto-salida');
const bloqueResultado = document.querySelector('.bloque');

var texto = "", temaOscuro = false;

function encriptar(){
    if(textoEntrada.value == "" || textoEntrada.value == null){
        bloqueResultado.add('display: none');
    } else {
        bloqueResultado.add('display: block');

        texto = textoEntrada.value;
        texto = texto.replaceAll("e","enter");
        texto = texto.replaceAll("i","imes");
        texto = texto.replaceAll("a","ai");
        texto = texto.replaceAll("o","ober");
        texto = texto.replaceAll("u","ufat");

        textoSalida.textContent = texto;
    }
}

function desencriptar(){
    if(textoEntrada.value == ""){
        if(window.innerWidth >= 900){
            muñeco.style.display = "block";
        } else {
            muñeco.style.display = "none";
        }
        textosIniciales.style.display = "block";
        textoSalida.style.display = "none";
    } else {
        muñeco.style.display = "none";
        textosIniciales.style.display = "none";
        textoSalida.style.display = "block";
        texto = textoEntrada.value;
        texto = texto.replaceAll("ai","a");
        texto = texto.replaceAll("enter","e");
        texto = texto.replaceAll("imes","i");
        texto = texto.replaceAll("ober","o");
        texto = texto.replaceAll("ufat","u");

        textoSalida.textContent = texto;
    }
}

function validar(e){
    textoEntrada.value = textoEntrada.value.toLowerCase();
    let key = e.keyCode || e.which;
    let especiales="8-37-38-46-164";
    let teclaEspeciales = false;

    for (var i in especiales){
        if (key == especiales[i]){
            teclaEspeciales = true;
            break;
        }
    }
    texto = textoEntrada.value;
    if(texto.match('[á,é,í,ó,ú]') != null && !teclaEspeciales){
        textoEntrada.value = texto.substring(0, texto.length() - 1);
    }     
}

function copiar(){
    navigator.clipboard.writeText(textoSalida.textContent);
}

function cambiarTema(){
    if(temaOscuro){
        // Pasar a Tema Claro
        document.querySelector('.reglas').querySelector('p').style.color = "#0A3871";
        document.querySelector('.reglas').querySelector('img').src = "img/exclamation-dark.svg";
        document.body.style.backgroundColor = "#F3F5FC";
        textoEntrada.style.color = "#052051";
        textoEntrada.classList.remove("texto-entrada-light");
        textoEntrada.classList.add("texto-entrada-dark");
        document.querySelector('.btn-encriptar').style.backgroundColor = "#0A3871";
        document.querySelector('.btn-encriptar').style.color = "#F3F5FC";
        temaOscuro = false;
    } else {
        // Pasar a Tema Oscuro
        document.querySelector('.reglas').querySelector('p').style.color = "#F3F5FC";
        document.querySelector('.reglas').querySelector('img').src = "img/exclamation-light.svg";
        document.body.style.backgroundColor = "#052051";
        textoEntrada.style.color = "#F3F5FC";
        textoEntrada.classList.remove("texto-entrada-dark");
        textoEntrada.classList.add("texto-entrada-light");
        document.querySelector('.btn-encriptar').style.backgroundColor = "#E9ECF8";
        document.querySelector('.btn-encriptar').style.color = "#0A3871";
        temaOscuro = true;
    }
}