const textoEntrada = document.querySelector('.texto-entrada');
const textoSalida = document.querySelector('.texto-salida');
const bloqueResultado = document.querySelector('.bloque');
const noMensajeNotify = document.querySelector('.no-mensaje');
const tieneAcentoNotify = document.querySelector('.tiene-acento');
const textoCopiadoNotify = document.querySelector('.texto-copiado');

var textoActual = "", textoNuevo = "";
var vecesAlturaAñadida = 0, incrementoInput = 31, pixelAlturaInput = textoEntrada.clientHeight;
var cumpleCondiciones = false, temaOscuro = false, estaMostrandoNotify = false;

function encriptar(){
    if(textoEntrada.value == '' || textoEntrada.value == null ){
        mostrarNotificacion(noMensajeNotify);
    } else if(cumpleCondiciones){
        mostrarNotificacion(tieneAcentoNotify);
    } else {
        textoSalida.textContent = '';
        bloqueResultado.style.display = "block";
        textoActual = textoEntrada.value;
        textoNuevo = textoActual.split("").map((char) => {
            if (char === "a") return "ai";
            if (char === "e") return "enter";
            if (char === "i") return "imes";
            if (char === "o") return "ober";
            if (char === "u") return "ufat";
            return char;
        }).join("");

        setTimeout(()=>{
            animacionEscritura(textoNuevo);
        },200);
    }
}

function desencriptar(){
    if(textoEntrada.value == "" || textoEntrada.value == null){
        mostrarNotificacion(noMensajeNotify);
    } else if(cumpleCondiciones){
        mostrarNotificacion(tieneAcentoNotify);
    } else {
        textoSalida.textContent = '';
        bloqueResultado.style.display = "block";
        textoActual = textoEntrada.value;
        textoNuevo = textoActual.replace(/ai|enter|imes|ober|ufat/g, (match) => {
            if (match === "ai") return "a";
            if (match === "enter") return "e";
            if (match === "imes") return "i";
            if (match === "ober") return "o";
            if (match === "ufat") return "u";
        });

        setTimeout(()=>{
            animacionEscritura(textoNuevo);
        },200);
    }
}

function caracteresPermitidos(texto){
    return texto ? !/[^a-z\sñ,.¡!¿?]/.test(texto) : true;
}
// Validación de cada input ingresado
textoEntrada.addEventListener('input', () => {
    // Pasamos el texto que ingresa a minúsculas
    textoEntrada.value = textoEntrada.value.toLowerCase();
    
    let texto = textoEntrada.value;
    // Verifica si el texto incluye o no los valores permitidos (solo minusculas y algunos caracteres especiales)
    if(!caracteresPermitidos(texto)){
        cumpleCondiciones = true;
        document.querySelector('.reglas').style.animation = 'shake-horizontal 0.8s ease-in-out both';
        document.querySelector('.reglas').style.color = "#e93f3f";
    } else {
        cumpleCondiciones = false;
        document.querySelector('.reglas').style.animation = '';
        if(temaOscuro){
            document.querySelector('.reglas').style.color = "#fafbff";
        } else {
            document.querySelector('.reglas').style.color = "#073481";
        }
    }
    // Ajusta el tamaño del textArea en base al texto ingresado.
    textoEntrada.style.height = "31px";
    textoEntrada.style.height = (textoEntrada.scrollHeight-4)+"px";
});

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
    Clipboard.copy(textoNuevo);

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

    if(cumpleCondiciones) {
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