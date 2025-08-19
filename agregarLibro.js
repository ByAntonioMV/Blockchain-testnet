require("dotenv").config();
const { ethers } = require("ethers");

// --- CONFIGURACIÓN ---
const GANACHE_URL = "http://127.0.0.1:7545";
const CONTRACT_ADDRESS = "0x9556A256c71B7cb4Cd9227e6F5453AC10047E271"; // Tu dirección de contrato
const contractABI = require("./artifacts/contracts/LibroStorage.sol/LibroStorage.json").abi;

// --- CONEXIÓN ---
const provider = new ethers.JsonRpcProvider(GANACHE_URL);
const signer = new ethers.Wallet(process.env.GANACHE_PRIVATE_KEY, provider);
const libroStorageContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

async function main() {
    // 1. Lee los argumentos pasados desde la terminal
    // process.argv contiene los argumentos: [node, nombre_archivo, arg1, arg2, arg3]
    // Por eso usamos .slice(2) para obtener solo los que nos interesan.
    const args = process.argv.slice(2);

    // 2. Verifica si el usuario proporcionó los 3 datos necesarios
    if (args.length !== 3) {
        console.log("❌ Error: Debes proporcionar título, categoría y descripción.");
        console.log("Uso: node tu_archivo.js \"<Título>\" \"<Categoría>\" \"<Descripción>\"");
        return; // Detiene la ejecución si faltan datos
    }

    const [titulo, categoria, descripcion] = args;

    console.log(`✍️ Agregando el libro "${titulo}" a la blockchain...`);

    try {
        // 3. Llama al contrato con los datos proporcionados por el usuario
        const tx = await libroStorageContract.agregarLibro(titulo, categoria, descripcion);
        await tx.wait(); // Espera a que la transacción sea confirmada

        console.log("✅ ¡Libro agregado exitosamente!");
        console.log("Hash de la transacción:", tx.hash);

    } catch (error) {
        console.error("❌ Error al agregar el libro:", error);
    }
}

main().catch(console.error);