mymap = L.map('mapid').setView([41.369365, 2.116563], 15);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieGF2aWVyamFyYW1pbGxvIiwiYSI6ImNranU1bjd3ZDJsYWkyeHRmY2QwdngzZjcifQ.NAtnZk9X6MhYtG71cqi_tg', {
    attribution: 'JaraDev&copy;',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoieGF2aWVyamFyYW1pbGxvIiwiYSI6ImNranU1bjd3ZDJsYWkyeHRmY2QwdngzZjcifQ.NAtnZk9X6MhYtG71cqi_tg'
}).addTo(mymap);

popup = L.popup();

function onMapClick(e) {
    buscarByCiudad(e);
}

mymap.on('click', onMapClick);

function buscarByCiudad(e) {
    // Obtener la instancia del objeto XMLHttpRequest
    var peticion_http = new XMLHttpRequest();

    // Preparar la funcion de respuesta
    peticion_http.onreadystatechange = muestraContenido;

    // Realizar peticion HTTP
    var urlAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&lang=es&units=metric&appid=efbfa58df7b72368bb105b3807d44ab3';
    console.log(urlAPI);
    peticion_http.open('POST', urlAPI, true);
    peticion_http.send();

    function muestraContenido() {
        if (peticion_http.readyState == 4) {
            if (peticion_http.status == 200) {
                let result = JSON.parse(peticion_http.responseText);
                popup.setLatLng(e.latlng).setContent('Lugar: ' + result.name +
                        '<br>Tiempo: ' + result.weather[0].description +
                        "<img style='width:35px; height:auto' src='http://openweathermap.org/img/w/" +
                        result.weather[0].icon + ".png'>" + '<br>Temperatura: ' + result.main.temp + 'Cº')
                    .openOn(mymap);
            }
        }
    }
}