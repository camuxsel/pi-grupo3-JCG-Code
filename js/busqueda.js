let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";

let qs = location.search;
let qsObj = new URLSearchParams(qs);
let busqueda = qsObj.get("Busqueda"); /* <= la clave de la qs */

console.log(busqueda);
let urlBusqueda = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${busqueda}`;

console.log(urlBusqueda);

let titulo = document.querySelector('#tituloBusqueda');

let noResults = document.querySelector('#noResults');

/*
if(no hay resultados){
    noResults.style.display : 'block';
} else{
    ocurre la magia
}
*/

fetch(urlBusqueda)
.then(function(res){
    return res.json();
})
.then(function(data){
    console.log(data.results);
    let pelicula = data.results;

    if(pelicula.length == 0){
        noResults.style.display = 'block';
        titulo.style.display = 'none';
    } else{
        titulo.innerText = `Resultados de búsqueda: ${busqueda}`;
        let listaBusqueda = document.querySelector('#resultadoBusqueda');

        let contenido = '';
        for (let i = 0; i < 6; i++) {
        contenido +=`<a href="pelicula.html">
                        <article class="art-home">
                            <img src="https://image.tmdb.org/t/p/w500/${pelicula[i].poster_path}" alt="Poster pelicula">
                            <h3>${pelicula[i].title}</h3> 
                            <p>Fecha de estreno: ${pelicula[i].release_date}</p>
                        </article>
                    </a>`
    };

    listaBusqueda.innerHTML += contenido;
    }
})
.catch(function(error){
    console.log(error);
});
