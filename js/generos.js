let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let urlGenerosPeliculas =`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}`
let urlGenerosSeries =`https://api.themoviedb.org/3/genre/tv/list?api_key=${APIkey}`
let generos_peliculas = document.querySelector("#generos_peliculas");
let generos_series = document.querySelector("#generos_series");

fetch(urlGenerosPeliculas)
.then(function (res) {
    return res.json()
})

.then(function (data) {
    let generos= data.genres;
    console.log(generos);
    let contenido_generos_peliculas = "";

    for (let i = 0; i < generos.length; i++) {
        let genero = generos[i];                 
        contenido_generos_peliculas += `<li class="lista-generos"> <a href="./genero.html?idGenero=${genero.id}&name=${genero.name}">${genero.name}</a> </li>`  
    };
    console.log(contenido_generos_peliculas);
    generos_peliculas.innerHTML = contenido_generos_peliculas;
})

.catch(function (error) {
    console.log(error);
});


fetch(urlGenerosSeries)
.then(function (res) {
    return res.json()
})

.then(function (data) {
    let generos= data["genres"];
    console.log(generos);
    let contenido_generos_series = "";

    for (let i = 0; i < generos.length; i++) {
        let genero = generos[i];
        contenido_generos_series += `<li class="lista-generos"> <a href="./genero.html?idGenero= ${genero.id}&name=${genero.name}">${genero.name}</a> </li>`  
    };
    console.log(contenido_generos_series);
    generos_series.innerHTML = contenido_generos_series;
})

.catch(function (error) {
    console.log(error);
});