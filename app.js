let puntajeTotal = 0;
let temaActual = "";
const PUNTAJE_PARA_DIPLOMA = 230; // ¡puntos para el diploma!
let quizzesCompletados = []; 
// --- 1. Definimos los temas de la aplicación ---
const modulos = [
    {
        titulo: "Módulo 1: Fundamentos",
        temas: [
            "1.1 Números reales",
            "1.2 Exponentes y radicales",
            "1.3 Expresiones algebraicas",
            "1.4 Expresiones racionales",
            "1.5 Ecuaciones (Lineales, Cuadráticas, Radicales)",
            "1.6 Modelado con ecuaciones",
            "1.7 Desigualdades",
            "1.8 Geometría de coordenadas",
            "1.10 Rectas",
            "1.11 Modelos con el uso de variaciones"
        ]
    },
    {
        titulo: "Módulo 2: Funciones",
        temas: [
            "2.1 ¿Qué es una función?",
            "2.2 Graficas de funciones"
        ]
    }
];

// --- 2. Obtenemos los Elementos del HTML ---
const btnComenzar = document.getElementById('btnComenzar');
const inputNombre = document.getElementById('nombreUsuario');
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaMenu = document.getElementById('pantalla-menu');
const saludoNombre = document.getElementById('saludoNombre');
const menuOpciones = document.querySelector('.menu-opciones');
const pantallaTeoria = document.getElementById('pantalla-teoria');
const btnVolverMenu = document.getElementById('btnVolverMenu');
const teoriaTitulo = document.getElementById('teoriaTitulo');
const teoriaContenido = document.getElementById('teoriaContenido');
//--- PANTALLA TEORIA ---
const pantallaQuiz = document.getElementById('pantalla-quiz');
const btnVolverTeoria = document.getElementById('btnVolverTeoria');
const quizTitulo = document.getElementById('quizTitulo');
const quizContenedor = document.getElementById('quizContenedor');
const btnCalificarQuiz = document.getElementById('btnCalificarQuiz');
const quizResultados = document.getElementById('quizResultados');
const quizPuntaje = document.getElementById('quizPuntaje');
const btnVolverMenuQuiz = document.getElementById('btnVolverMenuQuiz');
const pantallaDiploma = document.getElementById('pantalla-diploma');
const btnVolverMenuDiploma = document.getElementById('btnVolverMenuDiploma');
const diplomaNombre = document.getElementById('diplomaNombre');
const diplomaFecha = document.getElementById('diplomaFecha');
const pantallaEquipo = document.getElementById('pantalla-equipo');
const btnVolverMenuEquipo = document.getElementById('btnVolverMenuEquipo');

// --- 3. Función para Cargar el Menú ---
function cargarMenu() {
    menuOpciones.innerHTML = ''; 

    // Recorremos cada módulo (Fundamentos, Funciones)
    modulos.forEach(modulo => {

        const tituloModulo = document.createElement('h3');
        tituloModulo.textContent = modulo.titulo;
        menuOpciones.appendChild(tituloModulo);

        modulo.temas.forEach(tema => {
            const botonTema = document.createElement('button');
            botonTema.textContent = tema;
            botonTema.classList.add('btn-tema'); 
            botonTema.dataset.tema = tema; 
            // Comprobamos si el tema está en la lista de completados
        if (quizzesCompletados.includes(tema)) {
        botonTema.classList.add('tema-completado');
}
            menuOpciones.appendChild(botonTema);
        });
    });
    const botonDiploma = document.createElement('button');
    botonDiploma.id = 'btnDiploma';
    botonDiploma.classList.add('btn-tema'); // Reutilizamos el estilo

    // Verificamos si ya puede ver el diploma
    if (puntajeTotal >= PUNTAJE_PARA_DIPLOMA) {
        botonDiploma.textContent = "🏆 ¡Ver mi Diploma!";
        botonDiploma.disabled = false;
    } else {
        botonDiploma.textContent = `🏆 Diploma (Faltan ${PUNTAJE_PARA_DIPLOMA - puntajeTotal} pts)`;
        botonDiploma.disabled = true; // Lo bloqueamos
    }
    menuOpciones.appendChild(botonDiploma);
    // --- Creamos el botón de Equipo ---
    const botonEquipo = document.createElement('button');
    botonEquipo.id = 'btnEquipo';
    botonEquipo.textContent = "👥 Equipo de Desarrollo";
    botonEquipo.classList.add('btn-tema'); // Reutilizamos el estilo
    menuOpciones.appendChild(botonEquipo);
}



btnComenzar.addEventListener('click', () => {
    const nombre = inputNombre.value;

    if (nombre.trim() === "") {
        alert("Por favor, escribe tu nombre para continuar.");
        return; 
    }

    saludoNombre.textContent = nombre;

    cargarMenu();

    // 3. Ocultamos la pantalla de inicio
    pantallaInicio.classList.add('oculta');

    // 4. Mostramos la pantalla del menú
    pantallaMenu.classList.remove('oculta');
});

// --- 5. Lógica para mostrar contenido de Teoría ---

// Usamos "delegación de eventos". Escuchamos clics en el CONTENEDOR del menú.
// --- 5. Lógica para mostrar contenido de Teoría ---
menuOpciones.addEventListener('click', (evento) => {
    
    if (evento.target.id === 'btnDiploma') {
        
        mostrarDiploma(); 
        pantallaMenu.classList.add('oculta'); 
        pantallaDiploma.classList.remove('oculta'); 
    
    // (ESTO SOLO SE EJECUTA SI NO FUE EL BOTÓN DEL DIPLOMA)
    } else if (evento.target.id === 'btnEquipo') {
        // Lógica de Equipo
        pantallaMenu.classList.add('oculta');
        pantallaEquipo.classList.remove('oculta');
    }else if (evento.target.classList.contains('btn-tema')) {
        
        const temaSeleccionado = evento.target.dataset.tema;
        
        if (temaSeleccionado) { 
            temaActual = temaSeleccionado;
            cargarContenidoTeoria(temaActual);
            pantallaMenu.classList.add('oculta');
            pantallaTeoria.classList.remove('oculta');
        }
    }
});
// Evento para el botón "Volver al Menú"
btnVolverMenu.addEventListener('click', () => {
    pantallaTeoria.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
});


// --- 6. Función para Cargar el Contenido ---
// Esta función busca el contenido del tema y lo pone en la pantalla.

function cargarContenidoTeoria(tema) {
    // 1. Ponemos el título en la pantalla
    teoriaTitulo.textContent = tema;

    // 2. Buscamos el contenido (POR AHORA, USAMOS UN SIMULADOR)
    const contenido = obtenerContenidoSimulado(tema);

    // 3. Ponemos el contenido HTML en la pantalla
    teoriaContenido.innerHTML = contenido;
    // 4.Le avisamos a MathJax que revise este nuevo contenido
    if (window.MathJax) {
    MathJax.typesetPromise([teoriaContenido]);
    }
}

function obtenerContenidoSimulado(tema) {
    // Objeto que simula nuestro contenido
    const baseDeDatosContenido = {
        "1.1 Números reales": `
           
            <p>Los números reales, denotados por $\\mathbb{R}$, son el conjunto de todos los números que pueden ser representados en una línea recta continua (la recta numérica).</p>
            <p>Este conjunto incluye a todos los números que ya conoces.</p>

            <h4>Subconjuntos de Números Reales</h4>
            <ul>
                <li><b>Números Naturales ($\\mathbb{N}$):</b> Son los que usamos para contar. $\{1, 2, 3, 4, ...\}$</li>
                <li><b>Números Enteros ($\\mathbb{Z}$):</b> Incluyen los naturales, sus negativos y el cero. $\{... -2, -1, 0, 1, 2, ...\}$</li>
                <li><b>Números Racionales ($\\mathbb{Q}$):</b> Son aquellos que pueden escribirse como una fracción $\\frac{p}{q}$, donde $p$ y $q$ son enteros y $q \\neq 0$. (Ej: $\\frac{1}{2}$, $-3$, $0.25$)</li>
                <li><b>Números Irracionales ($\\mathbb{I}$):</b> Números que no pueden expresarse como fracción. Tienen decimales infinitos no periódicos. (Ej: $\\pi$, $\\sqrt{2}$)</li>
            </ul>

            <h4>Propiedades Principales (Axiomas)</h4>
            <p>Si $a$, $b$ y $c$ son números reales:</p>
            <ul>
                <li><b>Conmutativa (Suma):</b> $a + b = b + a$</li>
                <li><b>Conmutativa (Producto):</b> $a \\cdot b = b \\cdot a$</li>
                <li><b>Asociativa (Suma):</b> $(a + b) + c = a + (b + c)$</li>
                <li><b>Asociativa (Producto):</b> $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$</li>
                <li><b>Distributiva:</b> $a \\cdot (b + c) = a \\cdot b + a \\cdot c$</li>
            </ul>
            <div class="video-responsive-wrapper">
                <iframe width="481" height="855" src="https://www.youtube.com/embed/ANqlSgxEJeo" title="23 de octubre de 2025" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        `,
        "1.2 Exponentes y radicales": 
       `
                <h4>Exponentes Enteros</h4>
                <p>Un exponente indica cuántas veces un número (la base) se multiplica por sí mismo.</p>
                <p><b>Definición:</b> $a^n = a \\cdot a \\cdot a ... \\cdot a$ ($n$ veces)</p>
                
                <h4>Leyes de los Exponentes</h4>
                <p>Sean $a$ y $b$ números reales, y $m$ y $n$ enteros:</p>
                <ul>
                    <li><b>Producto:</b> $a^m \\cdot a^n = a^{m+n}$</li>
                    <li><b>Cociente:</b> $\\frac{a^m}{a^n} = a^{m-n}$ (si $a \\neq 0$)</li>
                    <li><b>Potencia de potencia:</b> $(a^m)^n = a^{m \\cdot n}$</li>
                    <li><b>Exponente Cero:</b> $a^0 = 1$ (si $a \\neq 0$)</li>
                    <li><b>Exponentes Negativos:</b> $a^{-n} = \\frac{1}{a^n}$</li>
                    <li><b>Potencia de un producto:</b> $(a \\cdot b)^n = a^n \\cdot b^n$</li>
                </ul>

                <h4>Radicales (Raíces)</h4>
                <p>Un radical es la operación inversa a la potenciación. La raíz $n$-ésima de $a$, denotada $\\sqrt[n]{a}$, es un número $b$ tal que $b^n = a$.</p>
                <p><b>Nota:</b> Si $n$ es par (como $\\sqrt{a}$), $a$ debe ser $\\ge 0$.</p>

                <h4>Exponentes Racionales (Fraccionarios)</h4>
                <p>Los radicales se pueden expresar como exponentes fraccionarios. Esta es la conexión clave:</p>
                <p><b>Definición:</b> $a^{1/n} = \\sqrt[n]{a}$</p>
                <p><b>Forma general:</b> $a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$</p>
                <p><b>Ejemplo:</b> $8^{2/3} = (\\sqrt[3]{8})^2 = (2)^2 = 4$.</p>
                <div class="video-responsive-wrapper">
                    <iframe width="1307" height="735" src="https://www.youtube.com/embed/azLPuPYXdso" title="Exponentes y radicales " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
        `,
        "1.3 Expresiones algebraicas":
        `
                <p>Una expresión algebraica es una combinación de variables (como $x$, $y$) y números (constantes) usando operaciones de suma, resta, multiplicación, división y potenciación/radicales.</p>

                <h4>Polinomios</h4>
                <p>Un polinomio es un tipo especial de expresión algebraica donde las variables solo tienen exponentes enteros no negativos (0, 1, 2, ...).</p>
                <ul>
                    <li><b>Monomio:</b> Un solo término (Ej: $5x^2$)</li>
                    <li><b>Binomio:</b> Dos términos (Ej: $3x + 4$)</li>
                    <li><b>Trinomio:</b> Tres términos (Ej: $2x^2 - x + 1$)</li>
                </ul>
                <p>El <b>grado</b> de un polinomio es el mayor exponente de su variable.</p>

                <h4>Suma y Resta</h4>
                <p>Solo podemos sumar o restar <b>términos semejantes</b>, es decir, términos que tienen las mismas variables elevadas a los mismos exponentes.</p>
                <p><b>Ejemplo:</b> $(3x^2 + 5x - 1) + (2x^2 - 3x + 7)$</p>
                <p>Agrupamos términos semejantes:</p>
                <p>$(3x^2 + 2x^2) + (5x - 3x) + (-1 + 7)$</p>
                <p>Resultado: $5x^2 + 2x + 6$</p>
                
                <h4>Multiplicación</h4>
                <p>Usamos la <b>propiedad distributiva</b> para multiplicar cada término de un polinomio por cada término del otro.</p>
                <p><b>Ejemplo (Método FOIL para binomios):</b> $(x + 2)(x + 3)$</p>
                <ul>
                    <li><b>F</b>irst (Primeros): $x \\cdot x = x^2$</li>
                    <li><b>O</b>uter (Externos): $x \\cdot 3 = 3x$</li>
                    <li><b>I</b>nner (Internos): $2 \\cdot x = 2x$</li>
                    <li><b>L</b>ast (Últimos): $2 \\cdot 3 = 6$</li>
                </ul>
                <p>Sumamos todo: $x^2 + 3x + 2x + 6 = x^2 + 5x + 6$</p>

                <h4>Factorización (Lo inverso de multiplicar)</h4>
                <p>Factorizar es descomponer un polinomio en el producto de polinomios más simples.</p>
                <ul>
                    <li><b>Factor Común:</b> $2x^3 + 4x^2 = 2x^2(x + 2)$</li>
                    <li><b>Diferencia de Cuadrados:</b> $a^2 - b^2 = (a - b)(a + b)$</li>
                    <li><b>Trinomios (Tanteo):</b> $x^2 + 5x + 6 = (x + 2)(x + 3)$</li>
                </ul>
                <div class="video-responsive-wrapper">
                    <iframe width="1307" height="735" src="https://www.youtube.com/embed/b7SgQ2Qt694" title="Expresiones algebraicas" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
        `,
        "1.4 Expresiones racionales":
        `
                <p>Una expresión racional es simplemente una fracción donde el numerador y el denominador son <b>polinomios</b>.</p>
                <p>Ejemplo: $\\frac{x^2 + 5x + 6}{x + 2}$</p>

                <h4>Dominio</h4>
                <p>El <b>dominio</b> de una expresión racional es el conjunto de todos los números reales que la variable $x$ puede tomar, <b>excepto</b> aquellos que hacen que el <b>denominador sea cero</b>.</p>
                <p>En el ejemplo $\\frac{x^2 + 5x + 6}{x + 2}$, el denominador es $x+2$.</p>
                <p>Si $x+2=0$, entonces $x=-2$.</p>
                <p>Por lo tanto, el dominio es "Todos los números reales excepto $x = -2$".</p>

                <h4>Simplificación</h4>
                <p>Para simplificar, <b>factorizamos</b> el numerador y el denominador, y luego cancelamos los factores comunes.</p>
                <p><b>Ejemplo:</b> $\\frac{x^2 + 5x + 6}{x + 2}$</p>
                <p>1. Factorizamos el numerador: $x^2 + 5x + 6 = (x + 2)(x + 3)$</p>
                <p>2. Reemplazamos: $\\frac{(x + 2)(x + 3)}{x + 2}$</p>
                <p>3. Cancelamos el factor común $(x + 2)$</p>
                <p><b>Resultado:</b> $x + 3$ (con la restricción de que $x \\neq -2$)</p>

                <h4>Multiplicación y División</h4>
                <ul>
                    <li><b>Multiplicación:</b> Se multiplican los numeradores entre sí y los denominadores entre sí. (Se recomienda factorizar y simplificar *antes* de multiplicar).</li>
                    <li><b>División:</b> Para dividir $\\frac{A}{B} \\div \\frac{C}{D}$, se invierte la segunda fracción y se multiplica: $\\frac{A}{B} \\cdot \\frac{D}{C}$</li>
                </ul>

                <h4>Suma y Resta</h4>
                <p>Para sumar o restar, debemos encontrar un <b>denominador común</b> (generalmente el Mínimo Común Múltiplo o MCM).</p>
                <p><b>Ejemplo:</b> $\\frac{2}{x+1} + \\frac{3}{x-1}$</p>
                <p>1. El MCM es $(x+1)(x-1)$.</p>
                <p>2. Convertimos: $\\frac{2(x-1)}{(x+1)(x-1)} + \\frac{3(x+1)}{(x+1)(x-1)}$</p>
                <p>3. Sumamos numeradores: $\\frac{2x - 2 + 3x + 3}{(x+1)(x-1)}$</p>
                <p><b>Resultado:</b> $\\frac{5x + 1}{x^2 - 1}$</p>
            `,
            "1.5 Ecuaciones (Lineales, Cuadráticas, Radicales)":
            `
                <p>Una <b>ecuación</b> es una igualdad entre dos expresiones algebraicas, que contiene una o más <b>variables</b> (incógnitas). </p>
                <p><b>Resolver</b> una ecuación es encontrar el valor (o valores) de la variable que hacen que la igualdad sea verdadera. A estos valores se les llama <b>soluciones</b> o <b>raíces</b>.</p>

                <h4>1. Ecuaciones Lineales (De Primer Grado)</h4>
                <p>Son ecuaciones donde el exponente más alto de la variable es 1. Tienen la forma general $ax + b = c$.</p>
                <p><b>Objetivo:</b> Despejar la variable $x$.</p>
                <p><b>Ejemplo:</b> Resolver $5x - 3 = 12$</p>
                <ol>
                    <li>Pasamos el 3 (que resta) a sumar al otro lado: $5x = 12 + 3$</li>
                    <li>Simplificamos: $5x = 15$</li>
                    <li>Pasamos el 5 (que multiplica) a dividir: $x = \\frac{15}{5}$</li>
                    <li>Solución: $x = 3$</li>
                </ol>

                <h4>2. Ecuaciones Cuadráticas (De Segundo Grado)</h4>
                <p>Son ecuaciones donde el exponente más alto es 2. La forma general es $ax^2 + bx + c = 0$, donde $a \\neq 0$.</p>
                
                <h5>Método 1: Factorización</h5>
                <p>Si podemos factorizar el polinomio, podemos usar la "Propiedad del Producto Cero" (si $A \\cdot B = 0$, entonces $A=0$ o $B=0$).</p>
                <p><b>Ejemplo:</b> $x^2 + 5x + 6 = 0$</p>
                <ol>
                    <li>Factorizamos el trinomio: $(x + 2)(x + 3) = 0$</li>
                    <li>Aplicamos la propiedad: $x+2=0$ o $x+3=0$</li>
                    <li>Soluciones: $x = -2$ y $x = -3$</li>
                </ol>

                <h5>Método 2: Fórmula Cuadrática (o General)</h5>
                <p>Funciona para *cualquier* ecuación cuadrática. Es la fórmula más importante:</p>
                <p>$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</p>
                <p>La parte interna $b^2 - 4ac$ se llama el <b>Discriminante</b> ($\Delta$):</p>
                <ul>
                    <li>Si $\Delta > 0$: Hay dos soluciones reales distintas.</li>
                    <li>Si $\Delta = 0$: Hay una solución real (repetida).</li>
                    <li>Si $\Delta < 0$: No hay soluciones reales (hay soluciones complejas/imaginarias).</li>
                </ul>

                <h4>3. Ecuaciones con Radicales</h4>
                <p>Son ecuaciones donde la variable se encuentra dentro de un radical (una raíz).</p>
                <p><b>Método:</b></p>
                <ol>
                    <li><b>Aislar el radical:</b> Dejar el término con la raíz solo en un lado de la ecuación.</li>
                    <li><b>Elevar al cuadrado:</b> Elevar ambos lados de la ecuación al cuadrado para eliminar la raíz.</li>
                    <li><b>Resolver</b> la ecuación resultante (que puede ser lineal o cuadrática).</li>
                    <li><b>¡COMPROBAR!</b> Este paso es <b>obligatorio</b>. Al elevar al cuadrado, a veces se introducen "soluciones extrañas" que no son válidas en la ecuación original.</li>
                </ol>
                <p><b>Ejemplo:</b> $\\sqrt{x + 7} = x + 1$</p>
                <ol>
                    <li>El radical ya está aislado.</li>
                    <li>Elevamos al cuadrado: $(\\sqrt{x + 7})^2 = (x + 1)^2$</li>
                    <li>$x + 7 = x^2 + 2x + 1$</li>
                    <li>Resolvemos la cuadrática (igualando a 0): $x^2 + x - 6 = 0$</li>
                    <li>Factorizamos: $(x + 3)(x - 2) = 0$</li>
                    <li>Soluciones posibles: $x = -3$ y $x = 2$</li>
                    <li><b>Comprobamos:</b>
                        <ul>
                            <li>Si $x = 2$: $\\sqrt{2 + 7} = 2 + 1 \\rightarrow \\sqrt{9} = 3 \\rightarrow 3 = 3$. (<b>Correcto</b>)</li>
                            <li>Si $x = -3$: $\\sqrt{-3 + 7} = -3 + 1 \\rightarrow \\sqrt{4} = -2 \\rightarrow 2 = -2$. (<b>Falso</b>)</li>
                        </ul>
                    </li>
                </ol>
                <p><b>Solución Final:</b> La única solución válida es $x = 2$. ($x=-3$ es una solución extraña).</p>
                <div class="video-responsive-wrapper">
                    <iframe width="1321" height="735" src="https://www.youtube.com/embed/zJeFLRunPJE" title="ECUACIONES" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `,
            "1.6 Modelado con ecuaciones":
            `
                <p>El <b>modelado</b> es el proceso de tomar un problema del mundo real (generalmente descrito en palabras) y traducirlo a un lenguaje matemático (una ecuación).</p>
                <p>Es una de las habilidades más importantes en la ingeniería y la ciencia, ya que nos permite usar el poder del álgebra para resolver problemas prácticos.</p>

                <h4>Lineamientos para Modelar Problemas</h4>
                <p>Aunque cada problema es diferente, el proceso general casi siempre sigue estos pasos:</p>
                <ol>
                    <li><b>Leer y Entender (Identificar):</b> Lee el problema varias veces. Identifica qué información te dan y, lo más importante, <b>qué te piden encontrar</b>.</li>
                    <li><b>Definir la Variable:</b> Asigna una variable (como $x$) a la cantidad desconocida principal que quieres encontrar. Escríbelo claramente (Ej: "Sea $x$ = el precio de la camisa").</li>
                    <li><b>Traducir a Matemáticas:</b> Divide el problema en partes. Escribe expresiones algebraicas para todas las demás cantidades mencionadas en el problema, usando tu variable $x$.</li>
                    <li><b>Formular la Ecuación:</b> Encuentra la relación clave en el problema que te permita igualar dos expresiones. Esta es la "frase" que contiene el "es igual a", "cuesta lo mismo que", "resulta en", etc.</li>
                    <li><b>Resolver la Ecuación:</b> Usa las técnicas algebraicas (lineales, cuadráticas) para encontrar el valor de $x$.</li>
                    <li><b>Interpretar y Comprobar:</b> ¿Tiene sentido tu respuesta? (Ej. una distancia no puede ser negativa). Responde la pregunta original del problema con una frase completa (Ej: "El precio de la camisa es de 15 dólares").</li>
                </ol>

                <h4>Ejemplo Clásico: Geometría</h4>
                <p><b>Problema:</b> Se quiere construir un jardín rectangular. El largo debe ser 3 metros mayor que el ancho. Si se dispone de 42 metros de valla para cercar el jardín completo, ¿cuáles son las dimensiones (largo y ancho) del jardín?</p>

                <h5>Resolución paso a paso:</h5>
                <ol>
                    <li><b>Identificar:</b> Buscamos el largo y el ancho. Nos dan el perímetro total (42 m).</li>
                    <li><b>Variable:</b> La cantidad principal (la más pequeña) es el ancho.
                        <p>Sea $x$ = Ancho del jardín.</p>
                    </li>
                    <li><b>Traducir:</b>
                        <ul>
                            <li>Ancho = $x$</li>
                            <li>Largo = "3 metros mayor que el ancho" $\\rightarrow x + 3$</li>
                        </ul>
                    </li>
                    <li><b>Ecuación:</b> La valla es el <b>Perímetro</b>. La fórmula del perímetro de un rectángulo es $P = 2 \cdot (\text{largo}) + 2 \cdot (\text{ancho})$.
                        <p>Sabemos que $P = 42$. Entonces, sustituimos:</p>
                        <p><b>$42 = 2(x + 3) + 2(x)$</b></p>
                    </li>
                    <li><b>Resolver:</b>
                        <p>$42 = 2x + 6 + 2x$ (Propiedad distributiva)</p>
                        <p>$42 = 4x + 6$ (Agrupar términos semejantes)</p>
                        <p>$42 - 6 = 4x$ (Despejar)</p>
                        <p>$36 = 4x$</p>
                        <p>$x = \\frac{36}{4}$</p>
                        <p>$x = 9$</p>
                    </li>
                    <li><b>Interpretar y Comprobar:</b>
                        <p>$x$ era el ancho, así que el <b>Ancho es de 9 metros</b>.</p>
                        <p>El largo era $x + 3$, así que $9 + 3 = 12$. El <b>Largo es de 12 metros</b>.</p>
                        <p><b>Comprobación:</b> $P = 2(12) + 2(9) = 24 + 18 = 42$ metros. ¡Es correcto!</p>
                    </li>
                </ol>
            `,
            "1.7 Desigualdades":
            `
                <p>Una <b>desigualdad</b> (o <b>inecuación</b>) es similar a una ecuación, pero en lugar de usar un signo de igual ($=$), utiliza símbolos para indicar que una expresión es mayor que ($>$), menor que ($<$), mayor o igual que ($\\ge$), o menor o igual que ($\\le$) otra.</p>
                <p>Resolver una desigualdad es encontrar el <b>conjunto</b> de todos los números (el "intervalo") que hacen que la afirmación sea verdadera.</p>

                <h4>Notación de Intervalos</h4>
                <p>Usamos una notación especial para describir estos conjuntos de soluciones:</p>
                <ul>
                    <li><b>Paréntesis $(a, b)$:</b> Intervalo <b>abierto</b>. No incluye los extremos. (Equivale a $a < x < b$)</li>
                    <li><b>Corchetes $[a, b]$:</b> Intervalo <b>cerrado</b>. Sí incluye los extremos. (Equivale a $a \\le x \\le b$)</li>
                    <li><b>Mixtos $[a, b)$ o $(a, b]$:</b> Semiabiertos o semicerrados.</li>
                    <li><b>Infinito $(\\infty)$:</b> Siempre usa paréntesis, ya que no es un número que se pueda "incluir". (Ej: $[3, \\infty)$ equivale a $x \\ge 3$)</li>
                </ul>

                <h4>Desigualdades Lineales</h4>
                <p>Se resuelven igual que las ecuaciones lineales (despejando $x$), con <b>una regla de oro</b>:</p>
                <p><b>¡REGLA DE ORO!</b> Si multiplicas o divides ambos lados de la desigualdad por un <b>número negativo</b>, DEBES <b>invertir el signo</b> de la desigualdad.</p>
                <p><b>Ejemplo:</b> Resolver $5 - 3x < 14$</p>
                <ol>
                    <li>Restamos 5: $-3x < 14 - 5$</li>
                    <li>Simplificamos: $-3x < 9$</li>
                    <li>Dividimos por -3 (¡Regla de Oro!): $x > \\frac{9}{-3}$</li>
                    <li>Solución: $x > -4$</li>
                    <li>En notación de intervalo: $(-4, \\infty)$</li>
                </ol>

                <h4>Desigualdades Polinomiales (Cuadráticas o Superiores)</h4>
                <p>¡No puedes simplemente despejar $x$!</p>
                <p><b>Método de Casos o "Método del Cementerio" (Sign Chart):</b></p>
                <ol>
                    <li><b>Paso 1:</b> Mueve todo a un lado para que la desigualdad se compare con <b>cero</b>. (Ej: $x^2 - 3x > 10 \\rightarrow x^2 - 3x - 10 > 0$)</li>
                    <li><b>Paso 2:</b> Factoriza la expresión. (Ej: $(x - 5)(x + 2) > 0$)</li>
                    <li><b>Paso 3:</b> Encuentra los <b>puntos críticos</b> (las raíces, donde cada factor es igual a cero). (Ej: $x = 5$ y $x = -2$)</li>
                    <li><b>Paso 4:</b> Dibuja una recta numérica y marca estos puntos. Esto divide la recta en intervalos. (Intervalos: $(-\\infty, -2)$, $(-2, 5)$, $(5, \\infty)$)</li>
                    <li><b>Paso 5:</b> Elige un <b>valor de prueba</b> dentro de cada intervalo y mira el signo (positivo o negativo) del producto total $(x - 5)(x + 2)$.
                        <ul>
                            <li><b>Prueba $x = -3$:</b> $(-3 - 5)(-3 + 2) = (-8)(-1) = +8$ (Positivo)</li>
                            <li><b>Prueba $x = 0$:</b> $(0 - 5)(0 + 2) = (-5)(2) = -10$ (Negativo)</li>
                            <li><b>Prueba $x = 6$:</b> $(6 - 5)(6 + 2) = (1)(8) = +8$ (Positivo)</li>
                        </ul>
                    </li>
                    <li><b>Paso 6:</b> Busca los intervalos que cumplen tu desigualdad original ($> 0$, o sea, <b>Positivo</b>).</li>
                </ol>
                <p><b>Solución:</b> Los intervalos positivos son $(-\\infty, -2)$ y $(5, \\infty)$.</p>
                <p><b>Solución final (unión):</b> $(-\\infty, -2) \\cup (5, \\infty)$</p>
                <div class="video-responsive-wrapper">
                    <iframe width="1307" height="735" src="https://www.youtube.com/embed/PUhtHAma2EE" title="23 de octubre de 2025" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>

            `,
            "1.8 Geometría de coordenadas":
            `
                <p>La geometría de coordenadas (o geometría analítica) nos permite describir figuras geométricas (como rectas, círculos, etc.) usando <b>ecuaciones</b> y un <b>sistema de coordenadas</b>.</p>

                <h4>1. El Plano Cartesiano</h4>
                <p>Es un sistema de dos ejes perpendiculares:</p>
                <ul>
                    <li><b>Eje X:</b> La recta numérica horizontal.</li>
                    <li><b>Eje Y:</b> La recta numérica vertical.</li>
                    <li><b>Origen (0,0):</b> El punto donde ambos ejes se cruzan.</li>
                </ul>
                <p>Cualquier punto $P$ en el plano se describe con un par ordenado $(x, y)$, que nos dice su ubicación horizontal ($x$) y vertical ($y$). El plano se divide en cuatro <b>cuadrantes</b> (I, II, III, IV).</p>
                

                <h4>2. Fórmula de la Distancia</h4>
                <p>Nos permite calcular la distancia $d$ entre dos puntos $P_1(x_1, y_1)$ y $P_2(x_2, y_2)$. Esta fórmula se deriva directamente del Teorema de Pitágoras.</p>
                <p><b>Fórmula:</b> $$d = \\sqrt{ (x_2 - x_1)^2 + (y_2 - y_1)^2 }$$</p>
                <p><b>Ejemplo:</b> Distancia entre $(1, 2)$ y $(4, 6)$</p>
                <p>$d = \\sqrt{ (4 - 1)^2 + (6 - 2)^2 }$</p>
                <p>$d = \\sqrt{ 3^2 + 4^2 } = \\sqrt{ 9 + 16 } = \\sqrt{ 25 }$</p>
                <p>$d = 5$ unidades.</p>

                <h4>3. Fórmula del Punto Medio</h4>
                <p>Nos da las coordenadas $M(x_m, y_m)$ del punto exacto que se encuentra a mitad de camino entre $P_1(x_1, y_1)$ y $P_2(x_2, y_2)$. Es simplemente el promedio de las coordenadas.</p>
                <p><b>Fórmula:</b> $$M = \\left( \\frac{x_1 + x_2}{2} , \\frac{y_1 + y_2}{2} \\right)$$</p>
                <p><b>Ejemplo:</b> Punto medio entre $(1, 2)$ y $(4, 6)$</p>
                <p>$M = \\left( \\frac{1 + 4}{2} , \\frac{2 + 6}{2} \\right) = \\left( \\frac{5}{2} , \\frac{8}{2} \\right)$</p>
                <p>$M = (2.5, 4)$</p>

                <h4>4. Ecuación del Círculo</h4>
                <p>Un círculo es el conjunto de todos los puntos $(x, y)$ que están a una distancia fija (el <b>radio $r$</b>) de un punto central (el <b>centro $(h, k)$</b>).</p>
                <p>Usando la fórmula de la distancia, obtenemos la <b>forma estándar</b> de la ecuación de un círculo:</p>
                <p><b>Ecuación:</b> $$(x - h)^2 + (y - k)^2 = r^2$$</p>
                <ul>
                    <li>Si el centro es el origen $(0,0)$, la ecuación es $x^2 + y^2 = r^2$.</li>
                </ul>
                <p><b>Ejemplo:</b> Un círculo con centro en $(3, -2)$ y radio $r=4$.</p>
                <p>La ecuación es: $(x - 3)^2 + (y - (-2))^2 = 4^2$</p>
                <p>$(x - 3)^2 + (y + 2)^2 = 16$</p>
                <div class="video-responsive-wrapper">
                    <iframe width="1307" height="735" src="https://www.youtube.com/embed/3sT3WzSbg0Y" title="Geometria de coordenadas p1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div class="video-responsive-wrapper">
                    <iframe width="1307" height="735" src="https://www.youtube.com/embed/N3tHMHvP3to" title="Geometria de coordenadas pt2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `,
            "1.10 Rectas":
            `
                <p>Las rectas son las figuras geométricas más simples, pero sus ecuaciones son fundamentales en matemáticas. Una recta se define por su <b>pendiente</b> y al menos un <b>punto</b>.</p>

                <h4>1. Pendiente (Inclinación)</h4>
                <p>La pendiente (denotada por $m$) mide qué tan inclinada está una recta. Es "la elevación sobre el avance" (cuánto sube $y$ por cada unidad que avanza $x$).</p>
                <p>Dados dos puntos $P_1(x_1, y_1)$ y $P_2(x_2, y_2)$:</p>
                <p><b>Fórmula:</b> $$m = \\frac{y_2 - y_1}{x_2 - x_1}$$</p>
                <ul>
                    <li><b>$m > 0$ (Positiva):</b> La recta sube de izquierda a derecha. 📈</li>
                    <li><b>$m < 0$ (Negativa):</b> La recta baja de izquierda a derecha. 📉</li>
                    <li><b>$m = 0$ (Cero):</b> La recta es <b>horizontal</b>. (Ecuación: $y = b$)</li>
                    <li><b>$m$ Indefinida:</b> La recta es <b>vertical</b>. (División por cero. Ecuación: $x = a$)</li>
                </ul>

                <h4>2. Forma Punto-Pendiente</h4>
                <p>Esta es la forma más útil para <b>encontrar</b> la ecuación de una recta si conoces su pendiente $m$ y un punto $(x_1, y_1)$ por el que pasa.</p>
                <p><b>Ecuación:</b> $$y - y_1 = m(x - x_1)$$</p>
                <p><b>Ejemplo:</b> Recta con $m=2$ que pasa por $(3, 4)$.</p>
                <p>$y - 4 = 2(x - 3)$</p>

                <h4>3. Forma Pendiente-Intersección</h4>
                <p>Esta es la forma más útil para <b>graficar</b> una recta. $m$ es la pendiente y $b$ es la <b>intersección con el eje Y</b> (el punto $(0, b)$).</p>
                <p><b>Ecuación:</b> $$y = mx + b$$</p>
                <p><b>Ejemplo:</b> $y = 2x - 1$</p>
                <ul>
                    <li>Pendiente $m=2$.</li>
                    <li>Corta al eje $y$ en $b = -1$.</li>
                </ul>
                <p>(Para obtener esta forma, solo despeja $y$ de la forma punto-pendiente).</p>

                <h4>4. Forma General</h4>
                <p>Es cuando se iguala toda la ecuación a cero. Es útil para ciertos cálculos avanzados, pero menos intuitiva.</p>
                <p><b>Ecuación:</b> $$Ax + By + C = 0$$</p>
                <p><b>Ejemplo:</b> $y = 2x - 1$ se puede reescribir como $2x - y - 1 = 0$.</p>

                <h4>5. Rectas Paralelas y Perpendiculares</h4>
                <p>Esto nos permite comparar dos rectas (Recta 1 con pendiente $m_1$ y Recta 2 con $m_2$):</p>
                <ul>
                    <li><b>Paralelas ($\\parallel$):</b> Nunca se cruzan. Tienen la <b>misma pendiente</b>.
                        <p>$$m_1 = m_2$$</p>
                    </li>
                    <li><b>Perpendiculares ($\\perp$):</b> Se cruzan formando un ángulo de 90°. Sus pendientes son <b>recíprocas negativas</b>.
                        <p>$$m_1 = -\\frac{1}{m_2}$$  (o $m_1 \\cdot m_2 = -1$)</p>
                    </li>
                </ul>
                <p><b>Ejemplo:</b> $y = 2x + 3$</p>
                <ul>
                    <li>Una recta <b>paralela</b> sería $y = 2x - 5$ (misma $m=2$).</li>
                    <li>Una recta <b>perpendicular</b> sería $y = -\\frac{1}{2}x + 1$ (pendiente opuesta e inversa).</li>
                </ul>
                <div class="video-responsive-wrapper">
                    <iframe width="1307" height="735" src="https://www.youtube.com/embed/Slop1-qIsJA" title="23 de octubre de 2025" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `,
            "1.11 Modelos con el uso de variaciones":
            `
                <p>En ciencia y en la vida real, muchas cantidades están relacionadas por <b>proporcionalidad</b>. Usamos el concepto de "variación" para modelar estas relaciones usando una <b>constante de proporcionalidad</b>, $k$.</p>

                <h4>1. Variación Directa</h4>
                <p>Se dice que "$y$ varía directamente con $x$" si $y$ es directamente proporcional a $x$.</p>
                <p><b>Significado:</b> Si $x$ aumenta, $y$ aumenta. Si $x$ disminuye, $y$ disminuye.</p>
                <p><b>Ecuación:</b> $$y = kx$$</p>
                <p><b>Ejemplo:</b> Tu salario ($y$) varía directamente con las horas que trabajas ($x$). La constante $k$ es tu tarifa por hora.</p>
                <p>Si trabajas el doble de horas ($x$), ganas el doble de salario ($y$).</p>

                <h4>2. Variación Inversa</h4>
                <p>Se dice que "$y$ varía inversamente con $x$" si $y$ es inversamente proporcional a $x$.</p>
                <p><b>Significado:</b> Si $x$ aumenta, $y$ disminuye. Si $x$ disminuye, $y$ aumenta.</p>
                <p><b>Ecuación:</b> $$y = \\frac{k}{x}$$</p>
                <p><b>Ejemplo:</b> La velocidad ($y$) para recorrer una distancia fija varía inversamente con el tiempo ($x$).</p>
                <p>Si quieres tardar la mitad de tiempo ($x$), necesitas ir al doble de velocidad ($y$).</p>

                <h4>3. Variación Conjunta</h4>
                <p>Esto involucra más de dos variables. Se dice que "$y$ varía conjuntamente con $x$ y $z$".</p>
                <p><b>Significado:</b> $y$ varía directamente con el <b>producto</b> de las otras variables.</p>
                <p><b>Ecuación:</b> $$y = kxz$$</p>
                <p><b>Ejemplo:</b> El interés simple ($I$) varía conjuntamente con el capital ($P$), la tasa ($r$) y el tiempo ($t$).</p>
                <p>La ecuación es $I = Prt$. En este caso, la constante $k=1$.</p>

                <h4>Resolución de Problemas de Variación</h4>
                <p>Generalmente, se resuelven en dos pasos:</p>
                <ol>
                    <li><b>Paso 1: Encontrar $k$.</b> Te darán un conjunto de datos iniciales (un valor de $y$, $x$, $z$, etc.). Usa esos datos para despejar la constante $k$.</li>
                    <li><b>Paso 2: Usar $k$.</b> Una vez que conoces $k$, puedes usar tu ecuación para encontrar el valor que falta en un segundo escenario.</li>
                </ol>

                <h5>Ejemplo (Variación Inversa):</h5>
                <p><b>Problema:</b> La presión ($P$) de un gas varía inversamente con su volumen ($V$). Si una presión de 50 psi corresponde a un volumen de 10 $m^3$, ¿cuál será la presión si el volumen se comprime a 4 $m^3$?</p>
                
                <p><b>Paso 1: Encontrar $k$</b></p>
                <p>Ecuación: $P = \\frac{k}{V}$</p>
                <p>Datos iniciales: $P=50$, $V=10$</p>
                <p>$50 = \\frac{k}{10} \\rightarrow k = 50 \\cdot 10 = 500$</p>
                <p>Nuestra fórmula específica es: $P = \\frac{500}{V}$</p>

                <p><b>Paso 2: Usar $k$</b></p>
                <p>Nuevos datos: $V=4$, $P=?$</p>
                <p>$P = \\frac{500}{4} = 125$</p>
                <p><b>Respuesta:</b> La presión será de 125 psi.</p>
            `,
            "2.1 ¿Qué es una función?":
            `
                <p>Una <b>función</b> es la idea central del precálculo. Es una <b>regla</b> que asigna a cada elemento de un conjunto de entrada (llamado <b>Dominio</b>) <b>exactamente un</b> elemento de un conjunto de salida (llamado <b>Rango</b>).</p>
                <p>Es la base de cómo modelamos relaciones en el mundo real (ej. cómo el tiempo afecta la altura de un cohete, o cómo el precio afecta la demanda de un producto).</p>

                <h4>La Analogía de la Máquina</h4>
                <p>Piensa en una función $f$ como una máquina:</p>
                <ul>
                    <li><b>Entrada (Input $x$):</b> Le das un número (del dominio).</li>
                    <li><b>Regla (Función $f$):</b> La máquina aplica un proceso (ej. "multiplicar por 2 y sumar 1").</li>
                    <li><b>Salida (Output $y$ o $f(x)$):</b> La máquina te da un resultado (del rango).</li>
                </ul>
                <p>La <b>regla de oro</b> es: si metes la misma entrada ($x$) varias veces, <b>siempre</b> debe salir el mismo resultado ($y$). No puede darte '5' un día y '7' otro día con la misma entrada.</p>

                <h4>Notación de Funciones: $f(x)$</h4>
                <p>Usamos la notación $f(x)$ (leído "f de x") para describir funciones. La $x$ es la variable de entrada (independiente), y $f(x)$ representa la variable de salida (dependiente). Es lo mismo que $y$.</p>
                <p><b>Ecuación:</b> $y = f(x)$</p>
                <p>Si tenemos la función $f(x) = x^2 + 3$, "evaluar" la función significa reemplazar $x$:</p>
                <ul>
                    <li>$f(2) = (2)^2 + 3 = 4 + 3 = 7$. Esto significa: "Si la entrada es 2, la salida es 7". El punto $(2, 7)$ está en la gráfica.</li>
                    <li>$f(-1) = (-1)^2 + 3 = 1 + 3 = 4$. El punto $(-1, 4)$ está en la gráfica.</li>
                </ul>

                <h4>Dominio y Rango</h4>
                <ul>
                    <li><b>Dominio (Domain):</b> Es el conjunto de <b>todas las entradas ($x$) permitidas</b>. Al buscar el dominio, debes tener cuidado con dos restricciones principales:
                        <ol>
                            <li>No se puede dividir por cero. (Ej. en $f(x) = \\frac{1}{x}$, el dominio no incluye $x=0$).</li>
                            <li>No se pueden sacar raíces pares ($\\sqrt{\\phantom{5}}$, $\\sqrt[4]{\\phantom{5}}$) de números negativos. (Ej. en $f(x) = \\sqrt{x}$, el dominio es $x \\ge 0$, o $[0, \\infty)$).</li>
                        </ol>
                    </li>
                    <li><b>Rango (Range):</b> Es el conjunto de <b>todas las salidas ($y$) posibles</b> que la función puede generar después de recibir las entradas del dominio.</li>
                </ul>
                <p><b>Ejemplo:</b> $f(x) = \\sqrt{x - 3}$</p>
                <ul>
                    <li><b>Dominio:</b> Lo de adentro, $x-3$, no puede ser negativo. $x - 3 \\ge 0 \\rightarrow x \\ge 3$. Dominio: $[3, \\infty)$.</li>
                    <li><b>Rango:</b> El resultado de una raíz cuadrada principal (positiva) nunca es negativo. Rango: $[0, \\infty)$.</li>
                </ul>

                <h4>Prueba de la Línea Vertical</h4>
                <p>Esta es una forma gráfica y rápida de saber si un dibujo es una función.</p>
                
                <p>"Una gráfica en el plano cartesiano representa una función si y solo si <b>ninguna línea vertical</b> puede cruzar la gráfica más de una vez."</p>
                <ul>
                    <li>Un círculo <b>NO</b> es una función (una línea vertical lo corta 2 veces).</li>
                    <li>Una parábola que abre hacia arriba o abajo <b>SÍ</b> es una función.</li>
                    <li>Una parábola que abre hacia la derecha (ej. $x=y^2$) <b>NO</b> es una función.</li>
                </ul>
                <div class="video-responsive-wrapper">
                    <iframe width="1307" height="735" src="https://www.youtube.com/embed/gXoni6QvsGo" title="23 de octubre de 2025" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `,
            "2.2 Graficas de funciones":
            `
                <p>La <b>gráfica de una función</b> $f$ es una representación visual de la relación entre $x$ y $y$. Es el conjunto de todos los puntos $(x, y)$ en el plano cartesiano que satisfacen la ecuación $y = f(x)$.</p>
                <p>Graficar nos permite "ver" el comportamiento de una función de un vistazo.</p>

                <h4>Funciones Crecientes, Decrecientes y Constantes</h4>
                <p>Observando una gráfica de izquierda a derecha:</p>
                <ul>
                    <li><b>Creciente:</b> Si la gráfica <b>sube</b>. 📈 (Formalmente: si $x_1 < x_2$, entonces $f(x_1) < f(x_2)$)</li>
                    <li><b>Decreciente:</b> Si la gráfica <b>baja</b>. 📉 (Formalmente: si $x_1 < x_2$, entonces $f(x_1) > f(x_2)$)</li>
                    <li><b>Constante:</b> Si la gráfica es <b>horizontal</b>. (Formalmente: $f(x_1) = f(x_2)$)</li>
                </ul>
                <p><b>Ejemplo:</b> Para la parábola $f(x) = x^2$, la función es decreciente en el intervalo $(-\\infty, 0)$ y creciente en el intervalo $(0, \\infty)$.</p>

                <h4>Funciones Pares e Impares (Simetría)</h4>
                <p>Esto nos dice si la gráfica tiene algún tipo de simetría especial.</p>
                <ul>
                    <li><b>Función Par (Simetría con eje Y):</b>
                        <p>Una función es par si $f(-x) = f(x)$ para toda $x$ en su dominio.</p>
                        <p><b>Ejemplo:</b> $f(x) = x^2$. $f(-3) = (-3)^2 = 9$ y $f(3) = (3)^2 = 9$. El lado izquierdo es un espejo del derecho.</p>
                    </li>
                    <li><b>Función Impar (Simetría con el Origen):</b>
                        <p>Una función es impar si $f(-x) = -f(x)$ para toda $x$ en su dominio.</p>
                        <p><b>Ejemplo:</b> $f(x) = x^3$. $f(-2) = (-2)^3 = -8$, que es el opuesto de $f(2) = (2)^3 = 8$. (Si giras la gráfica 180° sobre el origen, queda igual).</p>
                    </li>
                </ul>

                <h4>Funciones Definidas a Trocitos (Piecewise)</h4>
                <p>Son funciones que usan <b>diferentes reglas</b> para <b>diferentes partes</b> de su dominio.</p>
                <p><b>Ejemplo:</b> La función Valor Absoluto, $f(x) = |x|$, es una función a trocitos:</p>
                <p>$$
                f(x) = 
                \\begin{cases} 
                x & \\text{si } x \\ge 0 \\\\
                -x & \\text{si } x < 0 
                \\end{cases}
                $$</p>
                <p>Esto significa: "Usa la regla $f(x) = x$ para todos los números positivos y el cero, pero usa la regla $f(x) = -x$ para todos los números negativos". El resultado es la conocida gráfica en forma de 'V'.</p>
                <div class="video-responsive-wrapper">
                    <iframe width="1307" height="735" src="https://www.youtube.com/embed/ASURp6Bncx4" title="Gráficas de Funciones " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                `
    };

    // Buscamos el contenido. Si no lo encontramos, damos un mensaje por defecto.
    return baseDeDatosContenido[tema] || "<p>Lo sentimos, el contenido para este tema aún no está disponible. ¡Estamos trabajando en ello!</p>";
}
// --- 7. Lógica de Navegación del Quiz ---

// Ir de Teoría -> al Quiz
btnIrQuiz.addEventListener('click', () => {
    cargarQuiz(temaActual); // Carga el quiz del tema que estábamos viendo
    pantallaTeoria.classList.add('oculta');
    pantallaQuiz.classList.remove('oculta');

    // Ocultar resultados y botón de calificar por si se repite
    quizResultados.classList.add('oculta');
    btnCalificarQuiz.classList.remove('oculta');
});

// Volver de Quiz -> a Teoría
btnVolverTeoria.addEventListener('click', () => {
    pantallaQuiz.classList.add('oculta');
    pantallaTeoria.classList.remove('oculta');
});

// Volver de Resultados del Quiz -> al Menú
btnVolverMenuQuiz.addEventListener('click', () => {
    pantallaQuiz.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
});


// --- 8. SIMULADOR DE BASE DE DATOS DE QUIZZES ---
// Aquí definimos las preguntas para cada tema.
// 'opciones' es un array, 'respuestaCorrecta' es el ÍNDICE (0, 1, 2...)

const baseDeDatosQuizzes = {

    "1.1 Números reales": [
        {
            pregunta: "¿A qué conjunto pertenece el número $\\pi$ (Pi)?",
            opciones: ["Racionales ($\\mathbb{Q}$)", "Enteros ($\\mathbb{Z}$)", "Irracionales ($\\mathbb{I}$)"],
            respuestaCorrecta: 2
        },
        {
            pregunta: "La propiedad $a \\cdot (b + c) = a \\cdot b + a \\cdot c$ se llama:",
            opciones: ["Asociativa", "Distributiva", "Conmutativa"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Cuál de estos NO es un número real?",
            opciones: ["$\\sqrt{2}$", "$\\sqrt{-1}$", "1/3"],
            respuestaCorrecta: 1 
        }
    ],

    "1.2 Exponentes y radicales": [
        {
            pregunta: "¿Cuál es el resultado de $(x^3)^2$?",
            opciones: ["$x^5$", "$x^6$", "$x^9$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Cómo se escribe $a^{-n}$ de forma positiva?",
            opciones: ["$-a^n$", "$\\frac{1}{a^n}$", "$a^{1/n}$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Cuál es el equivalente de $a^{m/n}$ en forma de radical?",
            opciones: ["$\\sqrt[m]{a^n}$", "$m \\cdot \\sqrt[n]{a}$", "$\\sqrt[n]{a^m}$"],
            respuestaCorrecta: 2
        }
    ],

    "1.3 Expresiones algebraicas": [
        {
            pregunta: "Simplifica la expresión $(2x^2 + 3x) - (x^2 - x)$",
            opciones: ["$x^2 + 2x$", "$x^2 + 4x$", "$3x^2 + 2x$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Cuál es la factorización de $x^2 - 9$?",
            opciones: ["$(x-3)(x-3)$", "$(x-3)(x+3)$", "$(x-9)(x+1)$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "Al multiplicar $(x + 2)(x + 3)$, ¿cuál es el término central del resultado?",
            opciones: ["$5x$", "$6x$", "$x$"],
            respuestaCorrecta: 0
        }
    ],

    "1.4 Expresiones racionales": [
        {
            pregunta: "¿Cuál es el dominio de la expresión $\\frac{1}{x-4}$?",
            opciones: ["Todos los reales excepto $x=4$", "Todos los reales excepto $x=1$", "Solo $x > 4$"],
            respuestaCorrecta: 0
        },
        {
            pregunta: "Simplifica $\\frac{x^2 - 4}{x+2}$",
            opciones: ["$x+2$", "$x-4$", "$x-2$"],
            respuestaCorrecta: 2
        },
        {
            pregunta: "Calcula $\\frac{2}{x} + \\frac{3}{y}$",
            opciones: ["$\\frac{5}{x+y}$", "$\\frac{2y + 3x}{xy}$", "$\\frac{5}{xy}$"],
            respuestaCorrecta: 1
        }
    ],

    "1.5 Ecuaciones (Lineales, Cuadráticas, Radicales)": [
        {
            pregunta: "Resuelve la ecuación lineal $2x - 3 = 7$",
            opciones: ["$x = 4$", "$x = 5$", "$x = 2$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "En $ax^2 + bx + c = 0$, la parte $b^2 - 4ac$ se llama:",
            opciones: ["La Raíz", "El Discriminante", "La Hipotenusa"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "En la ecuación $\\sqrt{x} = -5$, ¿cuál es la solución?",
            opciones: ["$x = 25$", "$x = -25$", "No tiene solución real"],
            respuestaCorrecta: 2
        }
    ],

    "1.6 Modelado con ecuaciones": [
        {
            pregunta: "Si el largo $L$ de un rectángulo es 5 más que su ancho $W$, ¿cómo se escribe $L$?",
            opciones: ["$L = 5W$", "$L = W - 5$", "$L = W + 5$"],
            respuestaCorrecta: 2
        },
        {
            pregunta: "Un taxi cobra \\$3 fijos más \\$2 por km ($x$). ¿Cuál es la ecuación del costo ($C$)?",
            opciones: ["$C = 3x + 2$", "$C = 2x + 3$", "$C = 5x$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "Si $x$ es el precio de un artículo, ¿cómo se escribe 'el 20% de descuento sobre $x$'?",
            opciones: ["$x - 0.20$", "$x - 0.20x$", "$x + 0.20$"],
            respuestaCorrecta: 1
        }
    ],

    "1.7 Desigualdades": [
        {
            pregunta: "Resuelve $2x + 1 < 7$",
            opciones: ["$x > 3$", "$x < 3$", "$x < 4$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "Resuelve $-2x < 6$. (¡Cuidado!)",
            opciones: ["$x < -3$", "$x > -3$", "$x > 3$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Qué intervalo representa $x \\ge 5$?",
            opciones: ["$(5, \\infty)$", "$[5, \\infty)$", "$(-\\infty, 5]$"],
            respuestaCorrecta: 1
        }
    ],

    "1.8 Geometría de coordenadas": [
        {
            pregunta: "¿Cuál es la distancia entre $(0, 0)$ y $(3, 4)$?",
            opciones: ["5", "7", "25"],
            respuestaCorrecta: 0
        },
        {
            pregunta: "¿Cuál es el punto medio entre $(2, 0)$ y $(4, 2)$?",
            opciones: ["$(6, 2)$", "$(3, 1)$", "$(2, 2)$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Cuál es el centro del círculo $(x-1)^2 + (y+3)^2 = 9$?",
            opciones: ["$(1, -3)$", "$(-1, 3)$", "$(1, 3)$"],
            respuestaCorrecta: 0
        }
    ],

    "1.10 Rectas": [
        {
            pregunta: "¿Cuál es la pendiente de la recta $y = 3x - 1$?",
            opciones: ["3", "-1", "1"],
            respuestaCorrecta: 0
        },
        {
            pregunta: "Una recta $y = 2x + 1$ es paralela a:",
            opciones: ["$y = -\\frac{1}{2}x + 1$", "$y = 2x - 5$", "$y = -2x + 1$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "Una recta $y = 2x + 1$ es perpendicular a:",
            opciones: ["$y = -\\frac{1}{2}x + 1$", "$y = 2x - 5$", "$y = -2x + 1$"],
            respuestaCorrecta: 0
        }
    ],

    "1.11 Modelos con el uso de variaciones": [
        {
            pregunta: "Si $y$ varía directamente con $x$, la ecuación es:",
            opciones: ["$y = kx$", "$y = k/x$", "$y = k+x$"],
            respuestaCorrecta: 0
        },
        {
            pregunta: "Si $y$ varía inversamente con $x$, la ecuación es:",
            opciones: ["$y = kx$", "$y = k/x$", "$y = k-x$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "$y$ varía directamente con $x$. Si $y=10$ cuando $x=2$, ¿cuál es la constante $k$?",
            opciones: ["$k = 20$", "$k = 8$", "$k = 5$"],
            respuestaCorrecta: 2
        }
    ],
            
    "2.1 ¿Qué es una función?": [
        {
            pregunta: "Con la Prueba de la Línea Vertical, ¿cuántas veces puede una línea vertical tocar la gráfica de una función?",
            opciones: ["Infinitas veces", "Exactamente una vez", "Dos veces"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "¿Cuál es el dominio de la función $f(x) = \\frac{1}{x-2}$?",
            opciones: ["Todos los reales excepto $x=2$", "Todos los reales excepto $x=1$", "Solo $x > 2$"],
            respuestaCorrecta: 0
        },
        {
            pregunta: "Si $f(x) = x^2 + 5$, ¿cuál es el valor de $f(3)$?",
            opciones: ["11", "8", "14"],
            respuestaCorrecta: 2
        }
    ],

    "2.2 Graficas de funciones": [
        {
            pregunta: "Una función Par, como $f(x) = x^2$, ¿con qué eje tiene simetría?",
            opciones: ["Eje X", "Eje Y", "Origen"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "Una función Impar, como $f(x) = x^3$, ¿qué regla cumple?",
            opciones: ["$f(-x) = f(x)$", "$f(-x) = -f(x)$", "$f(x) = -x$"],
            respuestaCorrecta: 1
        },
        {
            pregunta: "Si una gráfica 'sube' de izquierda a derecha en un intervalo, se dice que es:",
            opciones: ["Creciente", "Decreciente", "Constante"],
            respuestaCorrecta: 0
        }
    ]
};

// --- 9. Función para Cargar y Mostrar el Quiz ---
function cargarQuiz(tema) {
    // Ponemos el título
    quizTitulo.textContent = `Quiz: ${tema}`;

    // Limpiamos el contenedor de preguntas
    quizContenedor.innerHTML = '';

    const preguntas = baseDeDatosQuizzes[tema];

    // Si no hay quiz para ese tema
    if (!preguntas) {
        quizContenedor.innerHTML = "<p>¡Ups! Aún no hay un quiz para este tema.</p>";
        btnCalificarQuiz.classList.add('oculta'); // Ocultamos el botón de calificar
        return;
    }

    // Si hay quiz, mostramos el botón
    btnCalificarQuiz.classList.remove('oculta');

    // Creamos el HTML para cada pregunta
    preguntas.forEach((pregunta, indicePregunta) => {

        // Div para el bloque de la pregunta
        const bloquePregunta = document.createElement('div');
        bloquePregunta.classList.add('pregunta-bloque');

        // El texto de la pregunta (ej. "¿Cuál es...?")
        const textoPregunta = document.createElement('p');
        textoPregunta.classList.add('pregunta-texto');
        textoPregunta.innerHTML = `${indicePregunta + 1}. ${pregunta.pregunta}`; // Usamos innerHTML por si la pregunta tiene MathJax
        bloquePregunta.appendChild(textoPregunta);

        // El contenedor para las opciones
        const grupoOpciones = document.createElement('div');
        grupoOpciones.classList.add('opciones-grupo');

        // Creamos las opciones (radio buttons)
        pregunta.opciones.forEach((opcion, indiceOpcion) => {
            // El input (radio)
            const inputRadio = document.createElement('input');
            inputRadio.type = 'radio';
            inputRadio.id = `q${indicePregunta}o${indiceOpcion}`;
            inputRadio.name = `pregunta-${indicePregunta}`; // Clave para que solo se marque uno
            inputRadio.value = indiceOpcion;
            inputRadio.classList.add('opcion-radio');

            // El label (el texto visible de la opción)
            const labelOpcion = document.createElement('label');
            labelOpcion.htmlFor = `q${indicePregunta}o${indiceOpcion}`;
            labelOpcion.classList.add('opcion-label');
            labelOpcion.innerHTML = opcion; // Usamos innerHTML por si la opción tiene MathJax

            grupoOpciones.appendChild(inputRadio);
            grupoOpciones.appendChild(labelOpcion);
        });

        bloquePregunta.appendChild(grupoOpciones);
        quizContenedor.appendChild(bloquePregunta);
    });

    // (¡IMPORTANTE!) Avisamos a MathJax que revise las nuevas preguntas y opciones
    if (window.MathJax) {
        MathJax.typesetPromise([quizContenedor]);
    }
}

// --- 10. Función para Calificar el Quiz (VERSIÓN 3) ---
btnCalificarQuiz.addEventListener('click', () => {
    const preguntas = baseDeDatosQuizzes[temaActual];
    if (!preguntas) return;

    let correctas = 0;
    const correctasParaGanar = 2; // ¡Debe sacar 2 de 3 para "ganar"!
    
    // --- PASO A (Calcular puntaje y Mostrar Aciertos/Errores) ---
    
    preguntas.forEach((pregunta, indicePregunta) => {
        
        // Obtenemos la respuesta correcta (índice)
        const respuestaCorrectaIndex = pregunta.respuestaCorrecta;
        
        // Buscamos la respuesta seleccionada por el usuario
        const selector = `input[name="pregunta-${indicePregunta}"]:checked`;
        const respuestaUsuario = document.querySelector(selector);
        
        if (respuestaUsuario) {
            // Si el usuario respondió
            const respuestaUsuarioIndex = parseInt(respuestaUsuario.value);
            
            if (respuestaUsuarioIndex === respuestaCorrectaIndex) {
                // --- RESPUESTA CORRECTA ---
                correctas++;
                // Pintamos su selección (que es la correcta) de verde
                const labelCorrecto = document.querySelector(`label[for="q${indicePregunta}o${respuestaCorrectaIndex}"]`);
                labelCorrecto.classList.add('opcion-correcta');
                
            } else {
                // --- RESPUESTA INCORRECTA ---
                // Pintamos la que seleccionó (la incorrecta) de rojo
                const labelIncorrecto = document.querySelector(`label[for="q${indicePregunta}o${respuestaUsuarioIndex}"]`);
                labelIncorrecto.classList.add('opcion-incorrecta');
                
                // ¡YA NO LE MOSTRAMOS LA VERDE!
            }
            
        } else {
            // Si el usuario NO respondió esa pregunta, no hacemos nada.
            // No le damos pistas.
        }
    });

    // --- PASO B (Decidir si gana puntos y si puede reintentar) ---

    const puntaje = (correctas / preguntas.length) * 100;
    const puntosGanados = correctas * 10;
    let mensajePuntos = "";

    // Verificamos si este quiz YA lo había ganado antes
    if (quizzesCompletados.includes(temaActual)) {
        
        mensajePuntos = `(Ya has completado este quiz. Puntos no sumados. Puntaje Total: ${puntajeTotal})`;
    
    } else {
        // Si no lo ha completado, verificamos si "ganó" (2 o más)
        if (correctas >= correctasParaGanar) {
            
            // 1. GANÓ: Sumamos puntos
            puntajeTotal += puntosGanados;
            
            // 2. Lo añadimos a la lista para que el botón se ponga verde
            quizzesCompletados.push(temaActual);
            
            // 3. Actualizamos el menú (para pintar el botón de verde)
            cargarMenu(); 
            
            // 4. Mensaje de éxito
            mensajePuntos = `¡Ganaste ${puntosGanados} puntos! (Puntaje Total: ${puntajeTotal})`;

        } else {
            // 5. PERDIÓ (1 o 0): NO sumamos puntos y NO lo marcamos como completo
            mensajePuntos = `Respondiste ${correctas} de ${preguntas.length}. ¡Necesitas al menos ${correctasParaGanar} para ganar! 
                            Vuelve a intentarlo. (Puntaje Total: ${puntajeTotal})`;
        }
    }
    
    // --- PASO C (Mostrar resultados finales) ---
    
    quizPuntaje.textContent = `Resultado: ${correctas} de ${preguntas.length} bien. ${mensajePuntos}`;
    
    // Coloreamos el resultado
    if (puntaje >= (correctasParaGanar / preguntas.length * 100)) {
        quizPuntaje.className = 'puntaje-bien';
    } else {
        quizPuntaje.className = 'puntaje-mal';
    }
    
    // Ocultamos el botón de calificar y mostramos los resultados
    btnCalificarQuiz.classList.add('oculta');
    quizResultados.classList.remove('oculta');
});

// --- 11. Lógica del Diploma ---

// Evento para volver del Diploma al Menú
btnVolverMenuDiploma.addEventListener('click', () => {
    pantallaDiploma.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
});
// --- 12. Lógica de Pantalla de Equipo ---

// Evento para volver de Equipo al Menú
btnVolverMenuEquipo.addEventListener('click', () => {
    pantallaEquipo.classList.add('oculta');
    pantallaMenu.classList.remove('oculta');
});

// Función para llenar los datos del diploma
function mostrarDiploma() {
    // Obtenemos el nombre que guardamos al inicio
    const nombre = inputNombre.value;
    diplomaNombre.textContent = nombre || "Estudiante Dedicado"; // Por si acaso

    // Obtenemos la fecha actual
    const fecha = new Date();
    diplomaFecha.textContent = `Otorgado el: ${fecha.toLocaleDateString()}`;
}
