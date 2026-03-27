// version 1.1.0

let username = "";
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

const palabras = [
    "Abundante", "Brillante", "Castillo", "Cerebro", "Ciencia", "Compañía", "Complejo", "Corazón", 
    "Cuchillo", "Cuidado", "Cultura", "Decisión", "Desierto", "Destino", "Diámetro", "Discurso", 
    "Edificio", "Esfuerzo", "Estrecho", "Extraño", "Fábrica", "Familia", "Fortuna", "Galaxia", 
    "Gigante", "Guitarra", "Historia", "Horario", "Humilde", "Ilusión", "Impacto", "Infinito", 
    "Intento", "Invierno", "Justicia", "Lectura", "Libertad", "Maestro", "Montaña", "Objetivo", 
    "Orquesta", "Pantalla", "Pariente", "Pastilla", "Peligro", "Perfume", "Permiso", "Pintura", 
    "Planeta", "Plástico", "Poblado", "Poderoso", "Práctica", "Primero", "Proceso", "Promesa", 
    "Próximo", "Realidad", "Recuerdo", "Regreso", "Riqueza", "Salvaje", "Secreto", "Silencio", 
    "Símbolo", "Sistema", "Sonrisa", "Suspiro", "Tablero", "Talento", "Teclado", "Técnico", 
    "Tesoro", "Trabajo", "Tráfico", "Tristeza", "Universo", "Valiente", "Ventana", "Victoria", 
    "Voluntad", "Abrazadera", "Ajedrez", "Alimento", "Asombroso", "Aventura", "Bicicleta", "Cascada", 
    "Desarrollo", "Elegante", "Escritura", "Estrella", "Explorar", "Fragmento", "Gimnasio", "Identidad", 
    "Izquierda", "Juventud", "Laberinto", "Mariposa"
];

let palabraSecreta = "";
let intentos = 3; 
let palabraMostrada = [];
let victorias = 0;
let derrotas = 0;
let letrasUsadas = []; // NUEVO: Array para rastrear las letras intentadas

startGame();

async function startGame(){
    if (!username) {
        username = await getUserInput("¿Coloca tu nombre, jugador?");
    }

    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
    palabraMostrada = Array(palabraSecreta.length).fill("_");
    intentos = 3; 
    letrasUsadas = []; // NUEVO: Reiniciar la lista al empezar partida nueva

    console.log(`\nHola ${username}, ¡bienvenido al juego del Ahorcado!`);
    console.log(`Marcador -> Ganadas: ${victorias} | Perdidas: ${derrotas}`);
    console.log(`La palabra tiene ${palabraSecreta.length} letras. ¡Buena Suerte!`);

    await bucleJuego();
}

async function bucleJuego() {
    const MI_CEDULA = "33416851"; 

    while (intentos > 0 && palabraMostrada.includes("_")) {
        console.log("\n" + "=".repeat(20)); // Separador visual
        console.log(`Palabra: ${palabraMostrada.join(" ")}`);
        console.log(`Vidas: ${"❤️ ".repeat(intentos)}`);
        // NUEVO: Mostrar las letras que ya se usaron
        console.log(`Letras intentadas: ${letrasUsadas.length > 0 ? letrasUsadas.join(", ") : "Ninguna aún"}`);

        const entrada = await getUserInput("Coloca una letra (o cédula para salir):");

        if (entrada === MI_CEDULA) {
            console.log("\n[!] Saliendo del juego pon la cedula del programador...");
            return rl.close(); 
        }

        const letra = entrada.toLowerCase().trim();

        // NUEVO: Validación para no repetir letras y asegurar que sea una sola letra
        if (letra.length !== 1) {
            console.log("⚠️ Por favor, ingresa solo una letra.");
            continue;
        }

        if (letrasUsadas.includes(letra)) {
            console.log(`⚠️ Ya usaste la letra '${letra}'. ¡Prueba con otra!`);
            continue;
        }

        // NUEVO: Agregar la letra al historial
        letrasUsadas.push(letra);

        if (palabraSecreta.includes(letra)) {
            console.log(`¡Bien! La letra '${letra}' es correcta.`);
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    palabraMostrada[i] = letra;
                }
            }
        } else {
            intentos--;
            console.log(`¡Error! La letra '${letra}' no está.`);
        }
    }

    if (intentos === 0) {
        derrotas++; 
        console.log("\n💀 OH NO. No tienes más vidas.");
        console.log(`La palabra correcta era: ${palabraSecreta.toUpperCase()}`);
    } else if (!palabraMostrada.includes("_")) {
        victorias++;
        console.log("\n🏆 ¡VAMOOOOS! Has adivinado la palabra.");
    }

    console.log(`\nMARCADOR ACTUAL -> Victorias: ${victorias} | Derrotas: ${derrotas}`);

    const jugarOtraVez = (await getUserInput("\n¿Deseas jugar otra vez? (s/n)")).toLowerCase();
    
    if (jugarOtraVez === 's') {
        await startGame();
    } else {
        console.log(`\n Gracias por jugar el  ${username}. Marcador final: ${victorias} - ${derrotas}`);
        rl.close();
    }
}