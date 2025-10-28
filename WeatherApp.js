const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "57e5396b8ec261f117e83a1b75aaaf12";

//The arrow function is set to async to allow using await within it.
weatherForm.addEventListener("submit", async event => { //It listens to all the form submissions with action set to "submit".
    event.preventDefault(); //So that the page doesn't refresh as forms have a default behavior or doing that.

    const city = cityInput.value;
    
    if(city){
        try{
            const weatherData = await getWeatherData(city); //getWeatherData is a async function hence called with await.
            diplayWeatherInfo(weatherData);                 //This is so that our program waits until the weather data has been
        }                                                   //fetched before moving forward.
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city!");
    }
});

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; //Builds the URL from which the api is used with.
    const response = await fetch(apiURL); //Await is used because fetch() is a async function and returns a promise.
    if(!response.ok){
        throw new Error("Could not fetch weather data!");
    }
    return await response.json(); //.json() also returns a promise.
}

function diplayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data; 
    //Array destructuring is used to get data from the json file of the response.
    card.textContent = ""; //To clear out anything before printing the data in the card.
    card.style.display = "flex"; //To set the diplay attribute to "flex" so that data is displayed as a flex box.

    //Creating the diffrernt elements that will be displayed in the diplay.
    const cityDisplay = document.createElement("h1"); 
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const wealtherEmoji = document.createElement("p");

    //setting the text values to the respective values of these fields.
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}℃`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    wealtherEmoji.textContent = getWeatherEmoji(id);
    
    //Adding the repective style atributes in the classList of these items to add intended styling.
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDiplay");
    descDisplay.classList.add("descDisplay");
    wealtherEmoji.classList.add("weatherEmoji");

    //Appending each of these item in the card div.
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(wealtherEmoji);

    
}

//This function returns the appropriate emoji to the weather id.
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⚡";
        case (weatherId >= 300 && weatherId < 400):
            return "☔";
        case (weatherId >= 500 && weatherId < 600):
            return "☔";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌁";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId<810):
            return "☁";
        default:
            return "❓";
        
    }
}

//This function diplays any errors in the card.
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}