const pollutionScale = [
    {
      scale: [0, 50],
      quality: "Good",
      src: "happy",
      background: "linear-gradient(to right, #45B649, #DCE35B)",
    },
    {
      scale: [51, 100],
      quality: "Moderate",
      src: "thinking",
      background: "linear-gradient(to right, #F3F9A7, #CAC531)",
    },
    {
      scale: [101, 150],
      quality: "Unhealthy",
      src: "unhealthy",
      background: "linear-gradient(to right, #F16529, #E44D26)",
    },
    {
      scale: [151, 200],
      quality: "Bad",
      src: "bad",
      background: "linear-gradient(to right, #ef473a, #cb2d3e)",
    },
    {
      scale: [201, 300],
      quality: "Very bad",
      src: "mask",
      background: "linear-gradient(to right, #8E54E9, #4776E6)",
    },
    {
      scale: [301, 500],
      quality: "Terrible",
      src: "terrible",
      background: "linear-gradient(to right, #7a2828, #a73737)",
    },
  ];
  
const loader = document.querySelector(".loader");
const emojiLogo = document.querySelector(".emoji-logo");
const userInformation = document.querySelector(".user-information");

async function getPollutionData () {
    
    try {
        const response = await fetch("http://api.airvisual.com/v2/nearest_city?key=ef8ef224-3649-4fd7-bbb3-7d26bcf28561")
        .catch (error => {
            throw new Error (error);
        })
        if (!response.ok) {
            throw new Error (`Error ${response.status}, ${response.statusText}`)
        } else { 
            resJson = await response.json()
            airQuality = resJson.data.current.pollution.aqius;
            
            const dataObj = {
                city: resJson.data.city,
                airQuality,
                ...pollutionScale.find(obj => airQuality >= obj.scale[0] && airQuality <= obj.scale[1])
            };
            populateApp(dataObj);
        }
    }
    catch (error) {
        loader.classList.remove('active');
        emojiLogo.src = "./ressources/browser.svg";
        userInformation.textContent = error.message;
    }
}
    getPollutionData();

const cityValue = document.querySelector('.city-name');
const airQualityValue = document.querySelector('.polution-value');
const infoValue = document.querySelector('.polution-info');
const backgroundLayer = document.querySelector('.background-layer');

function populateApp (data) {
    console.log(data);
    userInformation.textContent = `Here is ${resJson.data.city} situation.`;
    cityValue.textContent = data.city;
    airQualityValue.textContent = data.airQuality
    infoValue.textContent = data.quality;
    emojiLogo.src = `ressources/${data.src}.svg`;
    backgroundLayer.style.backgroundImage = data.background;
    loader.classList.remove('active');
    pointerPlacement(data.airQuality);
}

const pointer = document.querySelector('.location-pointer');

function pointerPlacement (aqi) {
    const scaleWidth = pointer.parentElement.scrollWidth;
    pointer.style.transform =  `translateX(${(aqi / 500) * scaleWidth}px) rotate(180deg)`;
}