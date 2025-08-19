// verLibros.js
require("dotenv").config();
const { ethers } = require("ethers");

// --- CONFIGURACIÓN ---
const GANACHE_URL = "http://127.0.0.1:7545";
const CONTRACT_ADDRESS = "0x9556A256c71B7cb4Cd9227e6F5453AC10047E271"; // ⚠️ ¡Verifica que esta sea tu dirección! de tu contrato
const contractABI = require("./artifacts/contracts/LibroStorage.sol/LibroStorage.json").abi;

// Nos conectamos a la blockchain
const provider = new ethers.JsonRpcProvider(GANACHE_URL);
// Creamos una instancia del contrato para poder interactuar con él
const libroStorageContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

async function main() {
    console.log("🔎 Buscando libros en la blockchain...");

    try {
        // Obtenemos el número total de libros llamando a la función del contrato
        const total = await libroStorageContract.totalLibros();

        if (total == 0) {
            console.log("🤷 No hay libros registrados en el contrato.");
            return;
        }

        console.log(`📚 Encontrados ${total} libro(s). Mostrando detalles:\n`);

        // Usamos un bucle para pedir la información de cada libro, uno por uno
        for (let i = 0; i < total; i++) {
            const libro = await libroStorageContract.libros(i);
            console.log(`----------------------------------------`);
            console.log(`  Libro #${i + 1}`);
            console.log(`    Título: ${libro.titulo}`);
            console.log(`    Categoría: ${libro.categoria}`);
            console.log(`    Descripción: ${libro.descripcion}`);
            console.log(`----------------------------------------\n`);
        }

    } catch (error) {
        console.error("❌ Error al intentar leer los libros:", error);
    }
}

main();