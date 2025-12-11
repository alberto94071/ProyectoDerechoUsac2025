// --- 1. Definición de Módulos y Temas (DERECHO) ---
const modulos = [
    {
        titulo: "Módulo 1: Introducción al Derecho",
        temas: [
            "1.1 Origen y Definición del Derecho",
            "1.2 Normas Jurídicas vs. Normas Morales",
            "1.3 Fuentes del Derecho",
            "1.4 Jerarquía Normativa (Pirámide de Kelsen)"
        ]
    },
    {
        titulo: "Módulo 2: Derecho Constitucional",
        temas: [
            "2.1 ¿Qué es la Constitución?",
            "2.2 Derechos Humanos Individuales",
            "2.3 La Organización del Estado",
            "2.4 Corte de Constitucionalidad"
        ]
    }
];

// --- 2. Obtenemos los Elementos del HTML ---
const inputNombre = document.getElementById('nombreUsuario');
const btnComenzar = document.getElementById('btnComenzar');
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaMenu = document.getElementById('pantalla-menu');
const saludoNombre = document.getElementById('saludoNombre');
const menuOpciones = document.querySelector('.menu-opciones');

// Elementos de Pantalla Teoría
const pantallaTeoria = document.getElementById('pantalla-teoria');
const btnVolverMenu = document.getElementById('btnVolverMenu');
const teoriaTitulo = document.getElementById('teoriaTitulo');
const teoriaContenido = document.getElementById('teoriaContenido');
const btnIrQuiz = document.getElementById('btnIrQuiz');

// Elementos de Pantalla Quiz
const pantallaQuiz = document.getElementById('pantalla-quiz');
const btnVolverTeoria = document.getElementById('btnVolverTeoria');
const quizTitulo = document.getElementById('quizTitulo');
const quizContenedor = document.getElementById('quizContenedor');
const btnCalificarQuiz = document.getElementById('btnCalificarQuiz');
const quizResultados = document.getElementById('quizResultados');
const quizPuntaje = document.getElementById('quizPuntaje');
const btnVolverMenuQuiz = document.getElementById('btnVolverMenuQuiz');

// Elementos de Pantalla Diploma
const pantallaDiploma = document.getElementById('pantalla-diploma');
const btnVolverMenuDiploma = document.getElementById('btnVolverMenuDiploma');
const diplomaNombre = document.getElementById('diplomaNombre');
const diplomaFecha = document.getElementById('diplomaFecha');

// Elementos de Pantalla Equipo
const pantallaEquipo = document.getElementById('pantalla-equipo');
const btnVolverMenuEquipo = document.getElementById('btnVolverMenuEquipo');

// Variables de Estado
const PUNTAJE_PARA_DIPLOMA = 50; 
let puntajeTotal = 0;
let temaActual = "";
let quizzesCompletados = []; 

// --- 3. Función para Cargar el Menú ---
function cargarMenu() {
    menuOpciones.innerHTML = ''; 

    modulos.forEach(modulo => {
        const tituloModulo = document.createElement('h3');
        tituloModulo.textContent = modulo.titulo;
        menuOpciones.appendChild(tituloModulo);
        
        const contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('grid-temas');
        
        modulo.temas.forEach(tema => {
            const botonTema = document.createElement('button');
            botonTema.textContent = tema;
            botonTema.classList.add('btn-tema');
            botonTema.dataset.tema = tema; 
            
            // Si ya completó el quiz, lo pintamos de verde
            if (quizzesCompletados.includes(tema)) {
                botonTema.classList.add('tema-completado');
            }
            
            contenedorBotones.appendChild(botonTema);
        });
        
        menuOpciones.appendChild(contenedorBotones);
    });

    // --- Botón del Diploma ---
    const botonDiploma = document.createElement('button');
    botonDiploma.id = 'btnDiploma';
    botonDiploma.classList.add('btn-tema');
    
    if (puntajeTotal >= PUNTAJE_PARA_DIPLOMA) {
        botonDiploma.textContent = "🏆 ¡Ver mi Diploma!";
        botonDiploma.disabled = false;
        botonDiploma.classList.add('btn-diploma-activo'); // Clase especial para destacarlo
    } else {
        botonDiploma.textContent = `🏆 Diploma (Faltan ${PUNTAJE_PARA_DIPLOMA - puntajeTotal} pts)`;
        botonDiploma.disabled = true;
    }
    menuOpciones.appendChild(botonDiploma);

    // --- Botón de Equipo ---
    const botonEquipo = document.createElement('button');
    botonEquipo.id = 'btnEquipo';
    botonEquipo.textContent = "⚖️ Equipo de Desarrollo"; // Ícono de balanza
    botonEquipo.classList.add('btn-tema');
    menuOpciones.appendChild(botonEquipo);
}

// --- 4. Evento: Comenzar ---
btnComenzar.addEventListener('click', () => {
    const nombre = inputNombre.value;
    if (nombre.trim() === "") {
        alert("Por favor, ingresa tu nombre para continuar.");
        return;
    }
    saludoNombre.textContent = nombre;
    pantallaInicio.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
    cargarMenu();
});

// --- 5. Lógica de Navegación del Menú ---
menuOpciones.addEventListener('click', (evento) => {
    
    // 1. Botón Diploma
    if (evento.target.id === 'btnDiploma') {
        mostrarDiploma(); 
        pantallaMenu.classList.add('oculta'); 
        pantallaDiploma.classList.remove('oculta'); 

    // 2. Botón Equipo
    } else if (evento.target.id === 'btnEquipo') {
        pantallaMenu.classList.add('oculta');
        pantallaEquipo.classList.remove('oculta');

    // 3. Botón de Tema (Teoría)
    } else if (evento.target.classList.contains('btn-tema')) {
        const temaSeleccionado = evento.target.dataset.tema;
        if (temaSeleccionado) { 
            temaActual = temaSeleccionado;
            cargarContenidoTeoria(temaActual);
            pantallaMenu.classList.add('oculta');
            pantallaTeoria.classList.remove('oculta');
        }
    }
});

// --- 6. Función para Cargar Contenido de Teoría ---
function cargarContenidoTeoria(tema) {
    teoriaTitulo.textContent = tema;
    const contenido = baseDeDatosContenido[tema] || "<p>Contenido próximamente.</p>";
    teoriaContenido.innerHTML = contenido;
}

// --- 7. Navegación Básica (Volver) ---
btnVolverMenu.addEventListener('click', () => {
    pantallaTeoria.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
});

btnIrQuiz.addEventListener('click', () => {
    cargarQuiz(temaActual);
    pantallaTeoria.classList.add('oculta');
    pantallaQuiz.classList.remove('oculta');
    quizResultados.classList.add('oculta');
    btnCalificarQuiz.classList.remove('oculta');
});

btnVolverTeoria.addEventListener('click', () => {
    pantallaQuiz.classList.add('oculta');
    pantallaTeoria.classList.remove('oculta');
});

btnVolverMenuQuiz.addEventListener('click', () => {
    pantallaQuiz.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
});

// --- 8. BASE DE DATOS DE CONTENIDO (DERECHO) ---
const baseDeDatosContenido = {
    "1.1 Origen y Definición del Derecho": `
        <p>La palabra <b>Derecho</b> proviene del vocablo latino <i>directum</i>, que significa "no apartarse del buen camino" o "seguir el sendero señalado por la ley".</p>
        <p>En general se entiende como el conjunto de normas jurídicas, creadas por el Estado, para regular la conducta externa de los hombres y, en caso de incumplimiento, está prevista una sanción judicial.</p>
        <h4>Fines del Derecho:</h4>
        <ul>
            <li><b>Justicia:</b> Dar a cada quien lo que le corresponde.</li>
            <li><b>Seguridad Jurídica:</b> La certeza de que la ley se cumplirá.</li>
            <li><b>Bien Común:</b> El bienestar de la mayoría de la sociedad.</li>
        </ul>
    `,

    "1.2 Normas Jurídicas vs. Normas Morales": `
        <p>Es fundamental distinguir entre los tipos de reglas que rigen nuestra vida.</p>
        <h4>Normas Morales</h4>
        <p>Son unilaterales, internas e incoercibles. Si no las cumples, el castigo es el remordimiento o el rechazo social, pero nadie te puede obligar por la fuerza.</p>
        <h4>Normas Jurídicas</h4>
        <p>Son bilaterales, externas y <b>coercibles</b>. Esto significa que si no las cumples voluntariamente, el Estado tiene la facultad de obligarte a cumplirlas por la fuerza (multas, prisión, embargo).</p>
    `,

    "1.3 Fuentes del Derecho": `
        <p>Se refiere al origen de donde nacen las normas jurídicas. Se clasifican tradicionalmente en:</p>
        <ul>
            <li><b>Fuentes Reales:</b> Son los fenómenos sociales, políticos o económicos que motivan la creación de una norma (ej. una revolución, una crisis económica).</li>
            <li><b>Fuentes Históricas:</b> Documentos antiguos que sirven de base (ej. El Derecho Romano).</li>
            <li><b>Fuentes Formales:</b> El proceso legislativo mediante el cual se crea la ley (Iniciativa, Discusión, Aprobación, Sanción, Promulgación).</li>
        </ul>
    `,

    "1.4 Jerarquía Normativa (Pirámide de Kelsen)": `
        <p>El ordenamiento jurídico no es plano, tiene jerarquía. Ninguna ley inferior puede contradecir a una superior.</p>
        <ol>
            <li><b>Nivel Constitucional:</b> La Constitución Política de la República (CPRG) y tratados de DDHH. Es la ley suprema.</li>
            <li><b>Nivel Ordinario:</b> Leyes creadas por el Congreso (Código Civil, Penal, Laboral).</li>
            <li><b>Nivel Reglamentario:</b> Reglamentos creados por el Ejecutivo para aplicar las leyes ordinarias.</li>
            <li><b>Nivel Individualizado:</b> Sentencias o contratos que aplican a personas específicas.</li>
        </ol>
    `,
    
    "2.1 ¿Qué es la Constitución?": `
        <p>Es la ley suprema de un Estado. En Guatemala, nuestra constitución actual fue promulgada en <b>1985</b>.</p>
        <p>Se divide en tres partes:</p>
        <ul>
            <li><b>Parte Dogmática:</b> Contiene los derechos humanos y libertades fundamentales.</li>
            <li><b>Parte Orgánica:</b> Establece la estructura y organización del Estado (Organismos Ejecutivo, Legislativo y Judicial).</li>
            <li><b>Parte Práctica:</b> Garantías constitucionales (Amparo, Exhibición Personal).</li>
        </ul>
    `,

    "2.2 Derechos Humanos Individuales": `
        <p>Son los derechos inherentes a la persona humana. En la Constitución de Guatemala inician desde el Artículo 3 (Derecho a la vida).</p>
        <ul>
            <li>Derecho a la Vida</li>
            <li>Libertad e Igualdad</li>
            <li>Derecho de Defensa</li>
            <li>Presunción de Inocencia</li>
        </ul>
    `,

    "2.3 La Organización del Estado": `
        <p>Guatemala es una república soberana. El poder proviene del pueblo y se divide en tres organismos para evitar el abuso de poder (Teoría de Pesos y Contrapesos):</p>
        <ul>
            <li><b>Ejecutivo:</b> Administra el Estado (Presidente, Vicepresidente, Ministros).</li>
            <li><b>Legislativo:</b> Crea las leyes (Congreso de la República).</li>
            <li><b>Judicial:</b> Juzga y promueve la ejecución de lo juzgado (Corte Suprema de Justicia, Tribunales).</li>
        </ul>
    `,

    "2.4 Corte de Constitucionalidad": `
        <p>La Corte de Constitucionalidad (CC) es el máximo tribunal en materia constitucional.</p>
        <p>Su función principal es la defensa del orden constitucional. Actúa como un tribunal independiente de los demás organismos del Estado.</p>
    `
};

// --- 9. BASE DE DATOS DE QUIZZES (DERECHO) ---
const baseDeDatosQuizzes = {
    "1.1 Origen y Definición del Derecho": [
        { pregunta: "¿Qué significa el vocablo latino 'directum'?", opciones: ["Torcido", "Directo o conforme a la regla", "Ley de Talión"], respuestaCorrecta: 1 },
        { pregunta: "¿Cuál NO es uno de los fines del Derecho?", opciones: ["Bien Común", "Justicia", "Venganza Privada"], respuestaCorrecta: 2 },
        { pregunta: "¿Quién crea las normas jurídicas principalmente?", opciones: ["El Estado", "La Iglesia", "La Familia"], respuestaCorrecta: 0 }
    ],
    "1.2 Normas Jurídicas vs. Normas Morales": [
        { pregunta: "Las normas jurídicas son 'coercibles'. ¿Qué significa?", opciones: ["Que son opcionales", "Que se pueden imponer por la fuerza", "Que dependen de la religión"], respuestaCorrecta: 1 },
        { pregunta: "Si no saludo a mi vecino, incumplo una norma:", opciones: ["Jurídica", "Penal", "Moral o de trato social"], respuestaCorrecta: 2 },
        { pregunta: "Las normas jurídicas regulan la conducta:", opciones: ["Interna (pensamientos)", "Externa (actos)", "Sentimental"], respuestaCorrecta: 1 }
    ],
    "1.3 Fuentes del Derecho": [
        { pregunta: "¿Cuáles son las fuentes que describen el proceso de creación de la ley?", opciones: ["Reales", "Históricas", "Formales"], respuestaCorrecta: 2 },
        { pregunta: "El Derecho Romano es un ejemplo de fuente:", opciones: ["Histórica", "Real", "Formal"], respuestaCorrecta: 0 },
        { pregunta: "¿Qué organismo del Estado aprueba las leyes ordinarias?", opciones: ["Ejecutivo", "Legislativo (Congreso)", "Judicial"], respuestaCorrecta: 1 }
    ],
    "1.4 Jerarquía Normativa (Pirámide de Kelsen)": [
        { pregunta: "¿Cuál es la norma suprema en la jerarquía?", opciones: ["El Código Civil", "La Constitución (CPRG)", "El Reglamento de Tránsito"], respuestaCorrecta: 1 },
        { pregunta: "Una ley ordinaria NO puede contradecir a:", opciones: ["Un reglamento", "Una sentencia", "La Constitución"], respuestaCorrecta: 2 },
        { pregunta: "¿En qué año se promulgó la Constitución actual de Guatemala?", opciones: ["1944", "1985", "2020"], respuestaCorrecta: 1 }
    ],
    "2.1 ¿Qué es la Constitución?": [
        { pregunta: "¿Qué parte de la Constitución organiza el Estado?", opciones: ["Dogmática", "Orgánica", "Práctica"], respuestaCorrecta: 1 },
        { pregunta: "¿Qué parte contiene los Derechos Humanos?", opciones: ["Dogmática", "Orgánica", "Práctica"], respuestaCorrecta: 0 },
        { pregunta: "¿Es la Constitución superior a las leyes del Congreso?", opciones: ["Sí", "No", "Son iguales"], respuestaCorrecta: 0 }
    ],
    "2.2 Derechos Humanos Individuales": [
        { pregunta: "¿En qué artículo de la CPRG inicia el derecho a la vida?", opciones: ["Artículo 1", "Artículo 3", "Artículo 10"], respuestaCorrecta: 1 },
        { pregunta: "¿Qué es la presunción de inocencia?", opciones: ["Ser culpable hasta demostrar lo contrario", "Ser inocente hasta ser citado", "Ser inocente hasta que una sentencia declare lo contrario"], respuestaCorrecta: 2 },
        { pregunta: "Los Derechos Humanos son:", opciones: ["Inherentes a la persona", "Regalos del Estado", "Comprables"], respuestaCorrecta: 0 }
    ],
    "2.3 La Organización del Estado": [
        { pregunta: "¿Qué organismo crea las leyes?", opciones: ["Ejecutivo", "Legislativo", "Judicial"], respuestaCorrecta: 1 },
        { pregunta: "¿Qué organismo administra el Estado?", opciones: ["Ejecutivo", "Legislativo", "Judicial"], respuestaCorrecta: 0 },
        { pregunta: "¿Qué organismo juzga?", opciones: ["Ejecutivo", "Legislativo", "Judicial"], respuestaCorrecta: 2 }
    ],
    "2.4 Corte de Constitucionalidad": [
        { pregunta: "¿Cuál es la función principal de la CC?", opciones: ["Aprobar el presupuesto", "Defensa del orden constitucional", "Juzgar delitos comunes"], respuestaCorrecta: 1 },
        { pregunta: "La CC es un tribunal:", opciones: ["Dependiente del Congreso", "Independiente", "Militar"], respuestaCorrecta: 1 },
        { pregunta: "¿La CC es el máximo tribunal en materia constitucional?", opciones: ["Sí", "No", "Depende del caso"], respuestaCorrecta: 0 }
    ]
};

// --- 10. Función para Cargar Quiz ---
function cargarQuiz(tema) {
    quizTitulo.textContent = `Quiz: ${tema}`;
    quizContenedor.innerHTML = '';
    const preguntas = baseDeDatosQuizzes[tema];
    
    if (!preguntas) {
        quizContenedor.innerHTML = "<p>Próximamente.</p>";
        btnCalificarQuiz.classList.add('oculta');
        return;
    }

    btnCalificarQuiz.classList.remove('oculta');
    
    preguntas.forEach((pregunta, indicePregunta) => {
        const bloquePregunta = document.createElement('div');
        bloquePregunta.classList.add('pregunta-bloque');
        
        const textoPregunta = document.createElement('p');
        textoPregunta.classList.add('pregunta-texto');
        textoPregunta.innerHTML = `${indicePregunta + 1}. ${pregunta.pregunta}`;
        bloquePregunta.appendChild(textoPregunta);
        
        const grupoOpciones = document.createElement('div');
        grupoOpciones.classList.add('opciones-grupo');
        
        pregunta.opciones.forEach((opcion, indiceOpcion) => {
            const inputRadio = document.createElement('input');
            inputRadio.type = 'radio';
            inputRadio.id = `q${indicePregunta}o${indiceOpcion}`;
            inputRadio.name = `pregunta-${indicePregunta}`;
            inputRadio.value = indiceOpcion;
            inputRadio.classList.add('opcion-radio');
            
            const labelOpcion = document.createElement('label');
            labelOpcion.htmlFor = `q${indicePregunta}o${indiceOpcion}`;
            labelOpcion.classList.add('opcion-label');
            labelOpcion.innerHTML = opcion;
            
            grupoOpciones.appendChild(inputRadio);
            grupoOpciones.appendChild(labelOpcion);
        });
        
        bloquePregunta.appendChild(grupoOpciones);
        quizContenedor.appendChild(bloquePregunta);
    });
}

// --- 11. Función Calificar Quiz (Feedback Colores) ---
btnCalificarQuiz.addEventListener('click', () => {
    const preguntas = baseDeDatosQuizzes[temaActual];
    if (!preguntas) return;

    let correctas = 0;
    const correctasParaGanar = 2; // Mínimo para aprobar
    
    preguntas.forEach((pregunta, indicePregunta) => {
        const respuestaCorrectaIndex = pregunta.respuestaCorrecta;
        const selector = `input[name="pregunta-${indicePregunta}"]:checked`;
        const respuestaUsuario = document.querySelector(selector);
        
        if (respuestaUsuario) {
            const respuestaUsuarioIndex = parseInt(respuestaUsuario.value);
            
            if (respuestaUsuarioIndex === respuestaCorrectaIndex) {
                correctas++;
                const labelCorrecto = document.querySelector(`label[for="q${indicePregunta}o${respuestaCorrectaIndex}"]`);
                labelCorrecto.classList.add('opcion-correcta');
            } else {
                const labelIncorrecto = document.querySelector(`label[for="q${indicePregunta}o${respuestaUsuarioIndex}"]`);
                labelIncorrecto.classList.add('opcion-incorrecta');
                // No mostramos la correcta para que reintente
            }
        }
    });

    const puntaje = (correctas / preguntas.length) * 100;
    const puntosGanados = correctas * 10;
    let mensajePuntos = "";

    if (quizzesCompletados.includes(temaActual)) {
        mensajePuntos = `(Quiz ya completado anteriormente. Puntos no sumados. Total: ${puntajeTotal})`;
    } else {
        if (correctas >= correctasParaGanar) {
            puntajeTotal += puntosGanados;
            quizzesCompletados.push(temaActual);
            cargarMenu(); 
            mensajePuntos = `¡Aprobado! Ganaste ${puntosGanados} puntos. (Total: ${puntajeTotal})`;
        } else {
            mensajePuntos = `Resultado: ${correctas}/${preguntas.length}. Necesitas al menos ${correctasParaGanar} para aprobar. ¡Inténtalo de nuevo!`;
        }
    }
    
    quizPuntaje.textContent = mensajePuntos;
    
    if (correctas >= correctasParaGanar) {
        quizPuntaje.className = 'puntaje-bien';
    } else {
        quizPuntaje.className = 'puntaje-mal';
    }
    
    btnCalificarQuiz.classList.add('oculta');
    quizResultados.classList.remove('oculta');
});

// --- 12. Diploma y Equipo ---
btnVolverMenuDiploma.addEventListener('click', () => {
    pantallaDiploma.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
});

function mostrarDiploma() {
    const nombre = inputNombre.value;
    diplomaNombre.textContent = nombre || "Estudiante de Derecho"; 
    const fecha = new Date();
    diplomaFecha.textContent = `Guatemala, ${fecha.toLocaleDateString()}`;
}

btnVolverMenuEquipo.addEventListener('click', () => {
    pantallaEquipo.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
});