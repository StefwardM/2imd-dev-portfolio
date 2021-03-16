class App{
    constructor(){
        this.getLocation();
        this.getGenreForWeather();
        this.lat;
        this.lng;
    }
    getLocation(){
        navigator.geolocation.getCurrentPosition(this.gotLocation.bind(this), this.errorLocation.bind(this));
    }

    gotLocation(result){
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    getWeather(){
        let url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lng}&appid=0a925e098c03f24e81080451fedc7ae6&units=metric`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            document.querySelector("#weather").innerHTML = data.current.temp + data.current.weather[0].description;
        }).catch(err => {
            console.log(err);
        })
    }

    getGenreForWeather(){
        let url = `https://cors-anywhere.herokuapp.com/https://ll.thespacedevs.com/2.0.0/launch/`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    errorLocation(err){
        console.log(err);
    }
}

let app = new App();