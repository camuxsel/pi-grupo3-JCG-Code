let qs = location.search;
let qsObj = new URLSearchParams(qs);
let idSerie = qsObj.get("idSerie"); /* <= el id de la serie a buscar */

let APIkey = "b7755d0a973ff1c1d329431ff2d89d36";
let tituloPagina_sv = document.querySelector("#tituloPagina_s");
let urldetalleSerie_v = `https://api.themoviedb.org/3/tv/${idSerie}?api_key=${APIkey}&language=es-MX`;
console.log(urldetalleSerie_v);

let generos_s = "";

fetch(urldetalleSerie_v)
.then(function (res) {
    return res.json();
})
.then(function (data) {
    console.log(data);
    for (let i = 0; i < data.genres.length; i++) {
        let genero_serie = data.genres[i]
        generos_s += `<li class="generoB"><a href="./genero.html?idGenero=${genero_serie.id}&name=${genero_serie.name}" class="generoB link">${genero_serie.name}</a></li>`
        console.log(generos_s);
    }
    sectionSerie.innerHTML =    `<img class="imgPelicula" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="Poster de ${data.name}">
                                <div class="descripcion">
                                <ul class="ulPeli">
                                    <li>
                                        <h1 class="h1-serie">${data.name}</h1>
                                        <ul class="ulgeneroB">
                                            ${generos_s}
                                        </ul>
                                        <h2 class="h2-peliSerie"> <img class="imgEstrella" src="./imgs/estrella.png" alt="Estrella"> ${data.vote_average}/ 10 </h2>
                                        <h2 class="h2-peliSerie" id="serieFavoritos">Agregar esta serie a favoritos</h2>
                                        <h3 class="h3-peliSerie">Fecha de estreno: ${data.first_air_date}</h3>   
                                        <h3 class="h3-peliSerie sinopsis">${data.overview}</h3>            
                                    </li>
                                    <li>
                                        <h2 class="h2-peliSerie" id="textoRecomendaciones"> Ver recomendaciones </h2>
                                        <section  id="verRecomendaciones">

                                        </section>
                                    </li> 
                                </ul>
                                </div>`
    

    tituloPagina_sv.innerText = data.name;

    //Esto es para las recomendaciones:

    let textoRecomendaciones = document.querySelector('#textoRecomendaciones');
    let verRecomendaciones = document.querySelector('#verRecomendaciones');

    textoRecomendaciones.addEventListener('click', function( ) {
        if (verRecomendaciones.style.display == 'none'){
            verRecomendaciones.style.display = 'block';
            let urlRecomendacionesSeries = `https://api.themoviedb.org/3/tv/${idSerie}/recommendations?api_key=${APIkey}`;
            console.log(urlRecomendacionesSeries);
        
            fetch(urlRecomendacionesSeries)
            .then(function(res){
                return res.json();
            })
            .then(function(data){
                console.log(data.results);
                let recomendacionesSeries = data.results;

                if (recomendacionesSeries.length == 0){
                    verRecomendaciones.innerHTML = '<h2>No hay recomendaciones disponibles aún :(</h2>'
                }else{
                    let seriesRecomendadas = '';
                    for (let i = 0; i < 3; i++) {
                        seriesRecomendadas += `<a href="./serie.html?idSerie=${recomendacionesSeries[i].id}"> <img class="imgPelicula" src="https://image.tmdb.org/t/p/w500/${recomendacionesSeries[i].poster_path}" alt="Poster de serie"> </a>`
                    }
                verRecomendaciones.innerHTML = seriesRecomendadas;
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        }else{
            verRecomendaciones.style.display = 'none';
        };
    });

    let serieFavoritos = document.querySelector('#serieFavoritos');

    //Esto es porque al principio no existe series favoritas en el localStorage.
    if(localStorage.getItem('seriesFavoritas')){
        // Esto es para que al refrescar la pagina se mantenga el texto correcto en favoritos.
        let favoritasS = localStorage.getItem('seriesFavoritas');
        let arrayFavoritasS = JSON.parse(favoritasS);
        for (let i = 0; i < arrayFavoritasS.length; i++) {
            if(idSerie == arrayFavoritasS[i]){
                serieFavoritos.innerText = 'Quitar de favoritos';
            }        
    };} else{
        let arrayVacio = [];
        let arrayVacioString = JSON.stringify(arrayVacio);
        localStorage.setItem('seriesFavoritas',arrayVacioString);
    };

    // Esto es para que al refrescar la pagina se mantenga el texto correcto en favoritos.
    let favoritasS = localStorage.getItem('seriesFavoritas');
    let arrayFavoritasS = JSON.parse(favoritasS);
    for (let i = 0; i < arrayFavoritasS.length; i++) {
        if(idSerie == arrayFavoritasS[i]){
            serieFavoritos.innerText = 'Quitar de favoritos';
        }        
    };

    console.log(serieFavoritos);
    console.log(idSerie);

    // Con esto hacemos que al hacer click en serieFavoritos se modifique el localStorage según corresponda
    serieFavoritos.addEventListener('click',function(){
        if(serieFavoritos.innerText == 'Agregar esta serie a favoritos'){
            serieFavoritos.innerText = 'Quitar de favoritos';

            if (localStorage.getItem('seriesFavoritas')){
                let seriesFavoritas = localStorage.getItem('seriesFavoritas');
                let arraySeriesFavoritas = JSON.parse(seriesFavoritas);
                arraySeriesFavoritas.push(idSerie);
                let seriesFavoritasString = JSON.stringify(arraySeriesFavoritas);
                localStorage.setItem('seriesFavoritas',seriesFavoritasString);
                console.log(localStorage);
            } else{
                let seriesFavoritas = [idSerie];
                let seriesFavoritasString = JSON.stringify(seriesFavoritas);
                localStorage.setItem('seriesFavoritas',seriesFavoritasString);
                console.log(localStorage);
            };
        } else {
            serieFavoritos.innerText = 'Agregar esta serie a favoritos';
            let seriesFavoritas = localStorage.getItem('seriesFavoritas');
            let arraySeriesFavoritas = JSON.parse(seriesFavoritas);
            let nuevasSeriesFavoritas = [];

            // Guardamos las pelis que todavia son favoritas en un nuevo array. La que acabamos de eliminar de favoritos no se guardará.
            for (let i = 0; i < arraySeriesFavoritas.length; i++) {
                if (arraySeriesFavoritas[i] == idSerie){
                    // No pasa nada
                }else {
                    nuevasSeriesFavoritas.push(arraySeriesFavoritas[i])
                };
            };

            let nuevasSeriesFavoritasString = JSON.stringify(nuevasSeriesFavoritas);
            localStorage.setItem('seriesFavoritas',nuevasSeriesFavoritasString);
        };
    });   

})
.catch(function (error) {
    console.log(error);
});

console.log(localStorage);