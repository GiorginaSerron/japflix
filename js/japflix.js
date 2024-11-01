document.addEventListener('DOMContentLoaded', function () {
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la solicitud');
            }
            return res.json();
        })
        .then(data => {
            const peliculas = data;
            console.log(peliculas);

            document.getElementById('btnBuscar').addEventListener('click', function () {
                let busquedaUsuario = document.getElementById('inputBuscar').value.toLowerCase();
                buscarPelicula(busquedaUsuario, peliculas);
            });
        })
        .catch(error => console.error('Error', error));
});

let listadoPeliculas = document.getElementById('lista');

function buscarPelicula(busqueda, array) {
    listadoPeliculas.innerHTML = '';
    let nuevoListadoPeliculas = array.filter(element =>
        element.title.toLowerCase().includes(busqueda) ||
        element.genres.join(', ').toLowerCase().includes(busqueda)) || 
        element.tagline.toLowerCase().includes(busqueda) ||
        element.overview.toLowerCase().includes(busqueda)
    ;

    if (nuevoListadoPeliculas.length > 0) {
        nuevoListadoPeliculas.forEach(pelicula => {
            let li = document.createElement('li');
            li.textContent = pelicula.title; 
            listadoPeliculas.appendChild(li);
        });
    } else {
        listadoPeliculas.innerHTML = '<li>No se encontraron resultados.</li>';
    }
}