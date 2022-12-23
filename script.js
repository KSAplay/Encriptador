
const textoEntrada = document.querySelector('.texto-entrada');
const textoSalida = document.querySelector('.texto-salida');
const bloqueResultado = document.querySelector('.bloque');

var texto = "", temaOscuro = false, longitudInput = 28, pixelAlturaInput = 31;

function encriptar(){
    if(textoEntrada.value == "" || textoEntrada.value == null){
        bloqueResultado.style.display = "none";
    } else {
        bloqueResultado.style.display = "block";

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
    if(textoEntrada.value == "" || textoEntrada.value == null){
        bloqueResultado.style.display = "none";
    } else {
        bloqueResultado.style.display = "block";
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
        // advertir
        textoEntrada.value = texto.substring(0, texto.length() - 1);
    }   

    if(texto.length >= longitudInput){
        longitudInput += 28;
        pixelAlturaInput += 31;
        textoEntrada.style.height = pixelAlturaInput+"px";
    }
    if(texto.length + 28 < longitudInput){
        longitudInput -= 28;
        pixelAlturaInput -= 31;
        textoEntrada.style.height = pixelAlturaInput+"px";
    }
}

function copiar(){
    window.Clipboard = (function(window, document, navigator) {
        var textArea,
            copy;
    
        function isOS() {
            return navigator.userAgent.match(/ipad|iphone/i);
        }
    
        function createTextArea(text) {
            textArea = document.createElement('textArea');
            textArea.value = text;
            document.body.appendChild(textArea);
        }
    
        function selectText() {
            var range,
                selection;
    
            if (isOS()) {
                range = document.createRange();
                range.selectNodeContents(textArea);
                selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textArea.setSelectionRange(0, 999999);
            } else {
                textArea.select();
            }
        }
    
        function copyToClipboard() {        
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    
        copy = function(text) {
            createTextArea(text);
            selectText();
            copyToClipboard();
        };
    
        return {
            copy: copy
        };
    })(window, document, navigator);
    Clipboard.copy(texto);

    bloqueResultado.style.display = "none";
}

function cambiarTema(){
    if(temaOscuro){
        // Pasar a Tema Claro
        document.querySelector('.reglas').querySelector('p').style.color = "#073481";
        document.querySelector('.reglas').querySelector('img').src = "img/exclamation-dark.svg";
        document.body.style.backgroundColor = "#fafbff";
        textoEntrada.style.color = "#073481";
        textoEntrada.classList.remove("texto-entrada-light");
        textoEntrada.classList.add("texto-entrada-dark");
        document.querySelector('footer').querySelector('span').style.color = "#2e2e2e";
        document.querySelector('.icon-linkedin').src = "img/icon-linkedin-dark.svg";
        document.querySelector('.icon-github').src = "img/icon-github-dark.svg";
        bloqueResultado.style.backgroundColor = "white";
        textoSalida.style.color = "#2e2e2e";
        temaOscuro = false;
    } else {
        // Pasar a Tema Oscuro
        document.querySelector('.reglas').querySelector('p').style.color = "#fafbff";
        document.querySelector('.reglas').querySelector('img').src = "img/exclamation-light.svg";
        document.body.style.backgroundColor = "#1A1A1A";
        textoEntrada.style.color = "#fafbff";
        textoEntrada.classList.remove("texto-entrada-dark");
        textoEntrada.classList.add("texto-entrada-light");
        document.querySelector('footer').querySelector('span').style.color = "#fafbff";
        document.querySelector('.icon-linkedin').src = "img/icon-linkedin-light.svg";
        document.querySelector('.icon-github').src = "img/icon-github-light.svg";
        bloqueResultado.style.backgroundColor = "#454545";
        textoSalida.style.color = "#fafbff";
        temaOscuro = true;
    }
}