async function main() {
  // Obtiene el "ContractFactory" para nuestro contrato LibroStorage
  const LibroStorage = await hre.ethers.getContractFactory("LibroStorage");

  // Inicia el despliegue del contrato
  console.log("🚀 Desplegando LibroStorage en la blockchain...");
  const libroStorage = await LibroStorage.deploy();

  // Espera a que el contrato sea desplegado exitosamente
  await libroStorage.waitForDeployment();

  // Imprime la dirección del contrato desplegado
  console.log(`✅ Contrato desplegado en la dirección: ${libroStorage.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});