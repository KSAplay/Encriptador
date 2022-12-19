
const inputText = document.getElementById('inputText');
const resultado = document.getElementById('resultado');
const btnCopiar = document.getElementById('btnCopiar');
const muñeco = document.getElementById('muñeco');
const textosIniciales = document.getElementById('textosIniciales');

inputText.value = "Ingrese el texto aqui";

inputText.addEventListener('focusout', () =>{
    if(inputText.value == ""){
        inputText.value = "Ingrese el texto aqui";
    }
});

inputText.addEventListener('focusin', () =>{
    if(inputText.value == "Ingrese el texto aqui"){
        inputText.value = "";
    }
});

var texto = "";

function encriptar(){
    if(inputText.value == "Ingrese el texto aqui"){
        muñeco.style.display = "block";
        textosIniciales.style.display = "flex";
        resultado.style.display = "none";
        btnCopiar.style.display = "none";
    } else {
        muñeco.style.display = "none";
        textosIniciales.style.display = "none";
        resultado.style.display = "block";
        btnCopiar.style.display = "block";
        texto = inputText.value;
        texto = texto.replaceAll("e","enter");
        texto = texto.replaceAll("i","imes");
        texto = texto.replaceAll("a","ai");
        texto = texto.replaceAll("o","ober");
        texto = texto.replaceAll("u","ufat");

        resultado.textContent = texto;
    }
}

function desencriptar(){
    if(inputText.value == "Ingrese el texto aqui"){
        muñeco.style.display = "block";
        textosIniciales.style.display = "flex";
        resultado.style.display = "none";
        btnCopiar.style.display = "none";
    } else {
        muñeco.style.display = "none";
        textosIniciales.style.display = "none";
        resultado.style.display = "block";
        btnCopiar.style.display = "block";
        texto = inputText.value;
        texto = texto.replaceAll("ai","a");
        texto = texto.replaceAll("enter","e");
        texto = texto.replaceAll("imes","i");
        texto = texto.replaceAll("ober","o");
        texto = texto.replaceAll("ufat","u");

        resultado.textContent = texto;
    }
}

function copiar(){
    navigator.clipboard.writeText(resultado.textContent);
}