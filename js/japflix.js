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

            document.getElementById('btnBuscar').addEventListener('click', function () {
                let busquedaUsuario = document.getElementById('inputBuscar').value.toLowerCase();
                buscarPelicula(busquedaUsuario, peliculas);
            });
        })
        .catch(error => console.error('Error', error));
});

function buscarPelicula(busqueda, array) {
    const listadoPeliculas = document.getElementById('lista');
    listadoPeliculas.innerHTML = '';

    let nuevoListadoPeliculas = array.filter(element =>
        element.title.toLowerCase().includes(busqueda) ||
        element.genres.join(', ').toLowerCase().includes(busqueda) ||
        element.tagline.toLowerCase().includes(busqueda) ||
        element.overview.toLowerCase().includes(busqueda)
    );

    if (nuevoListadoPeliculas.length > 0) {
        nuevoListadoPeliculas.forEach(element => {
            let li = document.createElement('li');
            li.className = 'list-group-item card mb-3';
            li.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text"><em>${element.tagline}</em></p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>${crearEstrellas(element.vote_average)}</div>
                    </div>
                </div>
            `;
            listadoPeliculas.appendChild(li);
            escuchaClick(li, element);

        });
    } else {
        listadoPeliculas.innerHTML = '<div class="alert alert-warning">No se encontraron resultados.</div>';
    }
}

function crearEstrellas(voteAverage) {
    let estrellas = '';
    const cantidadEstrellas = Math.round(voteAverage / 2);
    for (let i = 1; i <= 5; i++) {
        estrellas += (i <= cantidadEstrellas) ? '⭐' : '☆';
    }
    return estrellas;
}

function escuchaClick(elemento, pelicula) {
    elemento.addEventListener('click', () => {
        console.log('Clic en la película:', pelicula.title);
        mostrarDetalles(pelicula);
    });
}

function mostrarDetalles(pelicula) {
    document.getElementById('detallesModalLabel').innerText = pelicula.title;
    document.getElementById('modalBody').innerHTML = `
        <p><strong>Resumen:</strong> ${pelicula.overview}</p>
        <p><strong>Géneros:</strong> ${pelicula.genres.join(', ')}</p>
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Detalles adicionales 
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" href="#"><strong>Año de lanzamiento:</strong> ${pelicula.release_date.split('-')[0]}</a></li>
        <li><a class="dropdown-item" href="#"><strong>Duracion:</strong> ${pelicula.runtime} minutos</a></li>
        <li><a class="dropdown-item" href="#"><strong>Presupuesto:</strong> ${pelicula.budget}</a></li>
        <li><a class="dropdown-item" href="#"><strong>Ganancias:</strong> ${pelicula.revenue}</a></li>
        </div>
        </div>
    `;
    $('#detallesModal').modal('show'); // Abre el modal
}
