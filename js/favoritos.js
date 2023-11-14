let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";

console.log(localStorage);

let ulPelisFavoritas = document.querySelector('#pelisFavoritas');
let ulSeriesFavoritas = document.querySelector('#seriesFavoritas');
let sinPelisFavoritos = document.querySelector('#sinPelisFavoritos');
let sinSeriesFavoritos = document.querySelector('#sinSeriesFavoritos');

// Hacemos las pelis primero:

let pelisFavoritas = localStorage.getItem('pelisFavoritas');
let pelisFavoritasArray = JSON.parse(pelisFavoritas);
console.log(pelisFavoritasArray);

let contenidoPelis = '';
if (pelisFavoritasArray.length == 0) {
    sinPelisFavoritos.style.display = 'flex'; 
}else{
    sinPelisFavoritos.style.display = 'flex'; 
};

for (let i = 0; i < pelisFavoritasArray.length; i++) {
    let movie = pelisFavoritasArray[i]
    let urlPelis = `https://api.themoviedb.org/3/movie/${movie}?api_key=${APIkey}&language=es-MX`;

    fetch(urlPelis)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
        contenidoPelis +=`<li class="lista-genero">
                            <a href="./pelicula.html?idPelicula=${data.id}"">
                            <article class="art-genero">
                                <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Poster de ${data.title}" class="img-genero">
                                <h3>${data.title}</h3>
                            </article>
                            </a>
                        </li>`
        ulPelisFavoritas.innerHTML = contenidoPelis;
    })
    .catch(function (error) {
        console.log(error);
    });
};

// Hacemos las series


let seriesFavoritas = localStorage.getItem('seriesFavoritas');
let seriesFavoritasArray = JSON.parse(seriesFavoritas);
console.log(seriesFavoritasArray);

let contenidoSeries = '';
if (seriesFavoritasArray.length == 0) {
    sinSeriesFavoritos.style.display = 'flex'; 
}else{
    sinSeriesFavoritos.style.display = 'none'; 
};

for (let i = 0; i < seriesFavoritasArray.length; i++) {
    let serie = seriesFavoritasArray[i]
    let urlPelis = `https://api.themoviedb.org/3/tv/${serie}?api_key=${APIkey}&language=es-MX`;

    fetch(urlPelis)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
        contenidoSeries +=`<li class="lista-genero">
                            <a href="./serie.html?idSerie=${data.id}"">
                            <article class="art-genero">
                                <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Poster de ${data.name}" class="img-genero">
                                <h3>${data.name}</h3>
                            </article>
                            </a>
                        </li>`
        ulSeriesFavoritas.innerHTML = contenidoSeries;
    })
    .catch(function (error) {
        console.log(error);
    });
};
