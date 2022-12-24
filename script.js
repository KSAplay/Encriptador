
const textoEntrada = document.querySelector('.texto-entrada');
const textoSalida = document.querySelector('.texto-salida');
const bloqueResultado = document.querySelector('.bloque');
const noMensajeNotify = document.querySelector('.no-mensaje');
const tieneAcentoNotify = document.querySelector('.tiene-acento');
const textoCopiadoNotify = document.querySelector('.texto-copiado');

var texto = "", longitudInput = 28, pixelAlturaInput = 31;
var tieneAcento = false, temaOscuro = false, estaMostrandoNotify = false;

function encriptar(){
    if(textoEntrada.value == '' || textoEntrada.value == null ){
        mostrarNotificacion(noMensajeNotify);
    } else if(tieneAcento){
        mostrarNotificacion(tieneAcentoNotify);
    } else {
        textoSalida.textContent = '';
        bloqueResultado.style.display = "block";
        texto = textoEntrada.value;
        texto = texto.replaceAll("e","enter");
        texto = texto.replaceAll("i","imes");
        texto = texto.replaceAll("a","ai");
        texto = texto.replaceAll("o","ober");
        texto = texto.replaceAll("u","ufat");

        setTimeout(()=>{
            animacionEscritura(texto);
        },200);
    }
}

function desencriptar(){
    if(textoEntrada.value == "" || textoEntrada.value == null){
        mostrarNotificacion(noMensajeNotify);
    } else if(tieneAcento){
        mostrarNotificacion(tieneAcentoNotify);
    } else {
        textoSalida.textContent = '';
        bloqueResultado.style.display = "block";
        texto = textoEntrada.value;
        texto = texto.replaceAll("ai","a");
        texto = texto.replaceAll("enter","e");
        texto = texto.replaceAll("imes","i");
        texto = texto.replaceAll("ober","o");
        texto = texto.replaceAll("ufat","u");

        setTimeout(()=>{
            animacionEscritura(texto);
        },200);
    }
}

function soloLetras(texto){
    return texto ? !/[^a-z\sñ]/.test(texto) : true;
}

function validar(e){

    textoEntrada.value = textoEntrada.value.toLowerCase();
    texto = textoEntrada.value;

    if(!soloLetras(texto)){
        tieneAcento = true;
        document.querySelector('.reglas').style.animation = 'shake-horizontal 0.8s ease-in-out both';
        document.querySelector('.reglas').style.color = "#e93f3f";
    } else {
        tieneAcento = false;
        document.querySelector('.reglas').style.animation = '';
        if(temaOscuro){
            document.querySelector('.reglas').style.color = "#fafbff";
        } else {
            document.querySelector('.reglas').style.color = "#073481";
        }
    }
    comprobarTamañoInput();
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

    cerrarBloque();
    mostrarNotificacion(textoCopiadoNotify);
}

function cambiarTema(){
    if(temaOscuro){
        // Pasar a Tema Claro
        temaOscuro = false;
        // - fondo
        document.body.style.backgroundColor = "#fafbff";
        // - texto entrada y su placeholder
        textoEntrada.style.color = "#2e2e2e";
        textoEntrada.classList.remove("texto-entrada-light");
        textoEntrada.classList.add("texto-entrada-dark");
        // - reglas
        document.querySelector('.reglas').style.color = "#073481";
        // - bloque
        bloqueResultado.style.backgroundColor = "white";
        textoSalida.style.color = "#2e2e2e";
        // - footer
        document.querySelector('footer').querySelector('span').style.color = "#2e2e2e";
        document.querySelector('.fa-github').style.color = "#2e2e2e";
        document.querySelector('.fa-linkedin').style.color = "#2e2e2e";
    } else {
        // Pasar a Tema Oscuro
        temaOscuro = true;
        // - fondo
        document.body.style.backgroundColor = "#1A1A1A";
        // - texto entrada y su placeholder
        textoEntrada.style.color = "#fafbff";
        textoEntrada.classList.remove("texto-entrada-dark");
        textoEntrada.classList.add("texto-entrada-light");
        // - reglas
        document.querySelector('.reglas').style.color = "#fafbff";
        // - bloque
        bloqueResultado.style.backgroundColor = "#454545";
        textoSalida.style.color = "#fafbff";
        // - footer
        document.querySelector('footer').querySelector('span').style.color = "#fafbff";
        document.querySelector('.fa-github').style.color = "#fafbff";
        document.querySelector('.fa-linkedin').style.color = "#fafbff";
    }

    if(tieneAcento) {
        document.querySelector('.reglas').style.color = "#e93f3f";
    }
}

function cerrarBloque(){
    bloqueResultado.style.animation = 'cerrar-bloque 0.3s ease both';
    document.querySelector('.contenedor-bloque').style.backgroundColor = '#2e2e2e00';
    setTimeout(()=>{
        bloqueResultado.style.animation = '';
        bloqueResultado.style.display = 'none';
    },300);
}

function animacionEscritura(texto) {
    textoSalida.innerText = '';
    let pos = 0;
    let final = texto.length - 1;
    const interval = setInterval(() => {
      if(pos <= final) {
        if(texto[pos] == ' '){
            textoSalida.innerText += '\u00A0';
        } else {
            textoSalida.innerText += texto[pos];
        }
        pos++
      } else {
        clearInterval(interval);
      }
    }, 30);
  }

function mostrarNotificacion(notify){
    if(!estaMostrandoNotify){
        estaMostrandoNotify = true;
        notify.style.display = 'flex';
        notify.style.animation = 'notificar-entrada 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both';
        setTimeout(()=>{
            notify.style.animation = 'notificar-salida 0.5s cubic-bezier(0.550, 0.055, 0.675, 0.190) both';
        }, 2000);
        setTimeout(()=>{
            notify.style.animation = '';
            notify.style.display = 'none';
            estaMostrandoNotify = false;
        }, 2500);
    }
}

function comprobarTamañoInput(){
    while(texto.length + 28 < longitudInput){
        longitudInput -= 28;
        pixelAlturaInput -= 31;
        textoEntrada.style.height = pixelAlturaInput+"px";
    }
    while(texto.length >= longitudInput){
        longitudInput += 28;
        pixelAlturaInput += 31;
        textoEntrada.style.height = pixelAlturaInput+"px";
    }
}

textoEntrada.addEventListener('input', validar);