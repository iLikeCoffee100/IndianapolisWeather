// SELECTING MAIN CONTAINERS
const weatherComponent = document.querySelector(".weather-comp");
const tabsContainer = document.querySelector(".weather-tabs-cont");

// DECLARING FETCH WEATHER DATA FUNCTION
const fetchWeatherData = async () => {
  const weatherResponse = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=39.632927&longitude=-86.16553&hourly=temperature_2m"
  );
  const weatherData = await weatherResponse.json();

  // PRESET INFORMATION
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const cityNameText = "Greenwood, IN";
  const hourlyWeather = weatherData?.hourly?.temperature_2m;
  const weekendForcast = [
    hourlyWeather[12],
    hourlyWeather[36],
    hourlyWeather[60],
    hourlyWeather[84],
    hourlyWeather[108],
  ];

  // CREATING AND APPENDING TAB ELEMENTS TO CONTAINER
  weekDays.map((weekDayName, dayIndex) => {
    const midDayWeather = weekendForcast[dayIndex];

    const flexedSection = document.createElement("section");
    const weatherTabDay = document.createElement("div");
    const weatherTab = document.createElement("div");

    // EACH WEATHER TABS' DETAILS
    const weatherTabDetails = document.createElement("section");
    const cityNameElem = document.createElement("div");
    const weatherIndicator = document.createElement("div");
    const weatherCelsius = document.createElement("div");

    weatherComponent.classList.remove("weather-comp");
    weatherComponent.classList.add("weather-comp-fade");
    weatherTabDay.classList.add("weather-tab-day");
    weatherTabDay.innerText = weekDayName;
    weatherTab.classList.add("weather-tab");
    cityNameElem.classList.add("weather-city-name");
    cityNameElem.innerText = cityNameText;
    weatherTabDetails.classList.add("weather-tab-details");
    if (midDayWeather > 2) {
      weatherIndicator.classList.add("weather-ind-yellow");
    } else {
      weatherIndicator.classList.add("weather-ind-blue");
    }
    weatherCelsius.innerText = `${midDayWeather}°`;
    weatherCelsius.classList.add("weather-celsius");

    weatherTabDetails.appendChild(cityNameElem);
    weatherTabDetails.appendChild(weatherIndicator);
    weatherTabDetails.appendChild(weatherCelsius);
    weatherTab.appendChild(weatherTabDetails);
    flexedSection.appendChild(weatherTabDay);
    flexedSection.appendChild(weatherTab);
    tabsContainer.appendChild(flexedSection);
  });
};
fetchWeatherData();
