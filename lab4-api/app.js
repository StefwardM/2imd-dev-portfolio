class App{
    constructor(){
        console.log(this.weather);
        this.loadNotesFromStorage()
        this.getLocation();
        this.lat;
        this.lng;
        this.weather;
        this.launches
        this.getLaunchesForWeather();
    }
    getLocation(){
        navigator.geolocation.getCurrentPosition(this.gotLocation.bind(this), this.errorLocation.bind(this));
    }

    gotLocation(result){
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    loadNotesFromStorage() {
        let lastclear = localStorage.getItem("lastclear"),
         timeNow = (new Date().getTime());
        if((timeNow - lastclear) > 1000 * 60 * 60){
            localStorage.clear();
            localStorage.setItem("lastclear", timeNow);
            console.log("er is een uur voorbij");
        }
        this.weather = localStorage.getItem("storedWeather");
        this.launches = localStorage.getItem("storedLaunches");
        this.launches = JSON.parse(this.launches) || [];
        this.weather = JSON.parse(this.weather) || [];
    }

    getWeather(){
        let url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lng}&appid=0a925e098c03f24e81080451fedc7ae6&units=metric`;
        var str = "here";
        let result = str.link("https://www.verrekijkergigant.be/telescoop");
        if(this.weather == ""){
            fetch(url).then(response => {
                return response.json();
            }).then(data => {
                if(data.current.weather[0].description != "clear sky") {
                    localStorage.setItem('storedWeather', JSON.stringify(data));
                    document.querySelector("#weather").innerHTML = "Seems like there is " + data.current.weather[0].description + " though, so you won't be able to see it :(";
                    document.querySelector("#telescope").innerHTML = "Prepare for the next time by buying a telescope " + result +"! 🚀";
                }
                else{
                    document.querySelector("#weather").innerHTML = "There's a " + data.current.weather[0].description + "! Have fun watching the launch 🚀";
                    document.querySelector("#telescope").innerHTML = "Buy a telescope " + result +" for a better view!";
                }
                console.log("is niet naar else gegaan");
            }).catch(err => {
                console.log(err);
            })
        }
        else{
            if(this.weather.current.weather[0].description != "clear sky"){
                document.querySelector("#weather").innerHTML = "Seems like there is " + this.weather.current.weather[0].description + " though, so you won't be able to see it :(";
                document.querySelector("#telescope").innerHTML = "Prepare for the next time by buying a telescope " + result +"! 🚀";
            }
            else{
                document.querySelector("#weather").innerHTML = "There's a " + this.weather.current.weather[0].description + "! Have fun watching the launch 🚀";
                document.querySelector("#telescope").innerHTML = "Buy a telescope " + result +" for a better view!";
            }
        }

    }

    getLaunchesForWeather(){
        let url = `https://cors-anywhere.herokuapp.com/https://ll.thespacedevs.com/2.2.0/event/upcoming/`;
        if(this.launches == ""){
            fetch(url).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                localStorage.setItem('storedLaunches', JSON.stringify(data));
                document.querySelector("#ad").style.backgroundImage = `url(${data.results[0].feature_image}`;
                document.querySelector("#launch").innerHTML = "The next rocket launch is at " + data.results[0].date + " " + data.results[0].description;
            }).catch(err => {
                console.log(err);
            })
        }
            else{

                    document.querySelector("#ad").style.backgroundImage = `url(${this.launches.results[0].feature_image}`;
                    document.querySelector("#launch").innerHTML ="The next rocket launch is at " + this.launches.results[0].date + " " + this.launches.results[0].description;

            }

    }

    errorLocation(err){
        console.log(err);
    }
}

let app = new App();