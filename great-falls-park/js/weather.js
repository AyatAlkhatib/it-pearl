document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  let slides = document.getElementsByClassName("slide");

  if (slides.length === 0) {
    console.error("No slides found on the page.");
    return;
  }

  function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }

    slides[slideIndex].style.display = "block";
  }

  showSlides();
  setInterval(showSlides, 5000);

  document.getElementById("displayweather").addEventListener("click", getWeatherForecast);
});

async function getWeatherForecast() {
  "use strict";
  
  let locationInput = document.getElementById("location").value;
  console.log("Location input: ", locationInput);

  if (!locationInput) {
    alert("Please enter a location");
    return;
  }

  let geocodeURL = `https://geocoding-api.open-meteo.com/v1/search?name=${locationInput}&count=10&format=json`;

  let geocodeResponse = await fetch(geocodeURL);

  console.log("Geocode response: ", geocodeResponse);
  if (geocodeResponse.status >= 200 && geocodeResponse.status <= 299) {
    let geocodeData = await geocodeResponse.json();
    console.log("Geocode data: ", geocodeData);
    if (!geocodeData.results || geocodeData.results.length === 0) {
      alert("No location found.");
      return;
    }
    let locationData = geocodeData.results[0];
    console.log("Location data: ", locationData); 

    let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&hourly=temperature_2m&temperature_unit=fahrenheit`;
    let weatherResponse = await fetch(weatherURL);
    if (weatherResponse.status >= 200 && weatherResponse.status <= 299) {
      let weatherData = await weatherResponse.json();
      let weatherHourly = weatherData.hourly;

      document.getElementById(
        "weatherloc"
      ).innerHTML = `<h3>${locationData.name}, ${locationData.admin1}, ${locationData.country}</h3>
       <p><strong>Latitude =</strong> ${locationData.latitude} - <strong>Longitude =</strong> ${locationData.longitude}</p>`;

      let forecastTable =
        "<table>" + "<caption><strong>Temperature</strong></caption>" + "<tr><th>Date</th><th>Temp</th></tr>";
      let labels = [];
      let temperatures = [];

      for (let i = 0; i < weatherHourly.time.length; i++) {
        let unixTime = Date.parse(weatherHourly.time[i]);
        let formattedTime = new Date(unixTime).toLocaleString();
        forecastTable += `<tr><td>${formattedTime}</td><td>${weatherHourly.temperature_2m[i]}</td></tr>`;
        labels.push(formattedTime);
        temperatures.push(weatherHourly.temperature_2m[i]);
      }
      forecastTable += "</table>";
      document.getElementById("forecastlocation").innerHTML = forecastTable;

      let canvasElement = document.getElementById("weather");
      if (canvasElement) {
        if (window.myChart) {
          window.myChart.destroy();
        }

        let ctx = canvasElement.getContext("2d");
        window.myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Temperature (°F)",
                data: temperatures,
                borderColor: "#b5d9a0",
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { title: { display: true, text: "" } },
              y: { title: { display: true, text: "" } }
            }
          }
        });
      }
    } else {
      alert("Failed to fetch weather data.");
    }
  } else {
    alert("Failed to fetch location data.");
  }
}

function clearForm() {
  "use strict";
  document.getElementById("location").value = "";
  document.getElementById("weatherloc").innerHTML = "";
  document.getElementById("forecastlocation").innerHTML = "";

  if (window.myChart) {
    window.myChart.destroy();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("location").value = "Virginia"; 
  getWeatherForecast(); 
});
