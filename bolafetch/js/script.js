// URL de la API REST
const API_URL = 'http://54.227.16.132:8080/api?';

// Función para obtener respuesta desde la API
async function obtenerRespuestaAPI(pregunta) {
    try {
        const response = await fetch(`${API_URL}pregunta=${encodeURIComponent(pregunta)}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        return data.respuesta;
    } catch (error) {
        console.error('Error al conectar con la API:', error);
        return 'Error al obtener respuesta. Intenta de nuevo más tarde.';
    }
}

// Manejar el envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('magicBallForm');
    const ball = document.querySelector('.ball');
    const answerWindow = document.querySelector('.answer-window');
    const questionInput = document.getElementById('pregunta');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const pregunta = questionInput.value.trim();
        
        if (!pregunta) {
            return;
        }

        // Añadir animación de sacudida
        ball.classList.add('shake');
        
        // Mostrar mensaje de carga
        answerWindow.innerHTML = `<div class="answer-text">...</div>`;
        
        // Obtener respuesta desde la API
        const respuesta = await obtenerRespuestaAPI(pregunta);
        
        // Mostrar respuesta en la ventana de la bola
        answerWindow.innerHTML = `<div class="answer-text">${escapeHtml(respuesta)}</div>`;
        
        // Eliminar animación después de que termine
        setTimeout(() => {
            ball.classList.remove('shake');
        }, 500);
    });
});

// Función para escapar HTML y prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
