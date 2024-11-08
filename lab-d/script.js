"use strict"

const key = '7ded80d91f2b280ec979100cc8bbba94';
const button_get_weather = document.getElementById('button_get_weather');
const address_bar = document.getElementById("address_bar");
const weather_field_1 = document.getElementById("weather_field_1");
const weather_field_2 = document.getElementById("weather_field_2");

button_get_weather.addEventListener("click", (event)=>{
    let req1 = new XMLHttpRequest();
    let req1_address = "https://api.openweathermap.org/geo/1.0/direct?q=" + address_bar.value +",pl,&limit=1&appid=" + key;
    req1.open("GET", req1_address, true);

    req1.addEventListener("load", function(event) {
        let response = JSON.parse(req1.responseText);
        let lat =  response[0].lat;
        let lon = response[0].lon;

        let req2 = new XMLHttpRequest();
        let req2_address = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid="
                + key + "&units=metric";
        req2.open("GET",  req2_address, true);

        req2.addEventListener("load", function(event) {
            console.log(req2.responseText);
            weather_field_2.innerHTML = "";
            let weather_element = document.createElement("div");
            weather_element.id = "weather_element";
            let response2 = JSON.parse(req2.responseText);
            let temp = response2.main.temp;
            let feels_like = response2.main.feels_like
            let weather_icon =  "https://openweathermap.org/img/wn/" + response2.weather[0].icon + "@2x.png"
            let html = "<h2>Teraz</h2><img src='" + weather_icon + "'> <h3>Temperatura: " + temp
                + "°C</h3><p>Temperatura odczuwalna: " +  feels_like + "</p>";
            weather_element.innerHTML = html;
            weather_field_1.appendChild(weather_element);
        });

        req2.send();

        let promise_address = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid="
            + key + "&units=metric";
        let promise = fetch(promise_address);
        promise.then((response)=>{
            return response.json();
        }).then((data)=> {
            console.log(JSON.stringify(data,null,'\t'));
            weather_field_2.innerHTML = "<br>";
            for(let element of data.list){
                let weather_element = document.createElement("div");
                weather_element.id = "weather_element";
                let temp = element.main.temp;
                let feels_like = element.main.temp;
                let dt_txt = element.dt_txt;
                let weather_desc = element.weather[0].description;
                let weather_icon =  "https://openweathermap.org/img/wn/" + element.weather[0].icon + "@2x.png"
                let html = "<h2>" + dt_txt + "</h2><img src='" + weather_icon + "'><p>" + weather_desc + "<h3>Temperatura: "
                    + temp + "°C</h3><p>Temperatura odczuwalna: " + feels_like + "</p>";
                weather_element.innerHTML += html;
                weather_field_2.appendChild(weather_element);
            }
        });
    });

    req1.send(null);
})