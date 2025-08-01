// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract LibroStorage {

    // Define la estructura de un Libro
    struct Libro {
        string titulo;
        string categoria;
        string descripcion;
    }

    // Un arreglo público para almacenar todos los libros
    Libro[] public libros;

    // Función para agregar un nuevo libro a la blockchain
    // Es 'public' para que pueda ser llamada desde fuera del contrato
    function agregarLibro(string memory _titulo, string memory _categoria, string memory _descripcion) public {
        // Crea un nuevo libro en memoria y lo añade al arreglo 'libros'
        libros.push(Libro(_titulo, _categoria, _descripcion));
    }

    // Función para obtener el número total de libros almacenados
    // Es 'view' porque solo lee datos, no los modifica (no gasta gas)
    function totalLibros() public view returns (uint) {
        return libros.length;
    }
}