let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";

let qs = location.search;
let qsObj = new URLSearchParams(qs);
let busqueda = qsObj.get("Busqueda"); /* <= la clave de la qs */

console.log(busqueda);
let urlBusquedaPelis = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${busqueda}`;
let urlBusquedaSeries = `https://api.themoviedb.org/3/search/tv?api_key=${APIkey}&query=${busqueda}`;

console.log(urlBusquedaPelis);
console.log(urlBusquedaSeries);

let titulo = document.querySelector('#tituloBusqueda');
let noResults = document.querySelector('#noResults');

let listaBusquedaPelis = document.querySelector('#resultadoBusquedaPelis');
let listaBusquedaSeries = document.querySelector('#resultadoBusquedaSeries');

let tituloPelis = document.querySelector('#tituloBusquedaPelis');
let tituloSeries = document.querySelector('#tituloBusquedaSeries');


/* Estructura:
if(no hay resultados){
    noResults.style.display : 'block';
} else{
    ocurre la magia
}
*/


/* Para buscar pelis */

fetch(urlBusquedaPelis)
.then(function(res){
    return res.json();
})
.then(function(data){
    console.log(data.results);
    let pelicula = data.results;

    if(pelicula.length == 0){
        noResults.style.display = 'block';
        titulo.style.display = 'none';
        tituloPelis.style.display = 'none';

    } else{
        titulo.innerText = `Resultados de búsqueda: ${busqueda}`;

        let contenidoPelis = '';
        for (let i = 0; i < 6; i++) {
            contenidoPelis +=`<li><a href="./pelicula.html?idPelicula=${pelicula[i].id}">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${pelicula[i].poster_path}" alt="Poster pelicula">
                                <h3>${pelicula[i].title}</h3> 
                                <p>Fecha de estreno: ${pelicula[i].release_date}</p>
                            </article>
                        </a></li>`
    };

    listaBusquedaPelis.innerHTML += contenidoPelis;
    }
})
.catch(function(error){
    console.log(error);
});

/* Para buscar series */

fetch(urlBusquedaSeries)
.then(function(res){
    return res.json();
})
.then(function(data){
    console.log(data.results);
    let serie = data.results;

    if(serie.length == 0){
        noResults.style.display = 'block';
        titulo.style.display = 'none';
        tituloSeries.style.display = 'none';

    } else{
        titulo.innerText = `Resultados de búsqueda: ${busqueda}`;

        let contenidoSeries = '';
        for (let i = 0; i < 6; i++) {
            contenidoSeries +=`<a href="./serie.html?idSerie=${serie[i].id}">
                            <article class="art-home">
                                <img src="https://image.tmdb.org/t/p/w500/${serie[i].poster_path}" alt="Poster Serie">
                                <h3>${serie[i].name}</h3> 
                                <p>Fecha de estreno: ${serie[i].first_air_date}</p>
                            </article>
                        </a>`
    };
    listaBusquedaSeries.innerHTML += contenidoSeries;
    };
})
.catch(function(error){
    console.log(error);
});