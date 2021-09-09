// Vamos a comunicarnos con la App primero
// Fuentes que se pueden usar en InDesign
var fuentes = app.fonts; // app es el eslabón más alto en la API
var tope = 10; // Valor de tope para búsqueda de fuentes

// Los loops serán la orden del día en esta clase de scripts
// es bueno adecuarse a ellos desde el inicio,
// en este ejemplo se hace un loop por todas las fuentes que reconoce InDesign
for (var f=0; f<fuentes.length; f++) {
    // Es bueno tener una condicional para que el script acabe pronto
    // especialmente si se tienen muchas fuentes instaladas.
    if (f<tope) {
        $.writeln(fuentes[f].name);
    } else {
        break; // Esta palabra reservada forza la salida del loop cuando se cumple la condicional
    }
}
// Juguemos con las propiedades de app, mandemos a la consola las que nos suenen interesantes
$.writeln(app.serialNumber); // Número de serie de la aplicación
$.writeln(app.name); // Nombre de la aplicación
$.writeln(app.filePath); // Ruta de la aplicación

// Ahora vamos a comunicarnos con nuestro documento
var documentos = app.documents; // Todos los documentos abiertos

// Loop que visita cada documento abierto
for (var d=0; d<documentos.length; d++){
    var documento = documentos[d]; // Documento actual
    var paginas = documento.pages; // Todas las páginas del documento
    var elementosPaginaUno = paginas.item(0).allPageItems; // Elementos de página, paginas.item(0) es lo mismo que paginas[0]
    // Loop por todos los elementos de la página
    for (var el=0; el < elementosPaginaUno.length; el++) {
        // Elemento en curso
        var elemento = elementosPaginaUno[el];
        if (elemento == '[object TextFrame]') {
            // Si el elemento es una caja de texto, haremos un loop por sus caracteres
            var cars = elemento.characters;
            for (var car=0; car<cars.length; car++) {
                // Si la combinación de caracteres es AV se hará una modificación en el kerning
                if (cars[car].contents === 'A' && cars[car+1].contents === 'V') {
                    cars[car].kerningValue = 300;
                }
            }
        }
    }
}