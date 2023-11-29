if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log(res, "service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
setInterval(() => {
  document.querySelector(".date").innerHTML = moment().format(
    `MMMM D, YYYY || ddd, hh:mm:ss `
  );
}, 1000);
const inputValue = document.getElementById("inputSearch");
const btnImg = document.getElementById("btnImg");

inputValue.addEventListener("input", () => {
  if (inputValue.value !== "") {
    btnImg.style.display = "block";
  } else {
    if (inputValue.value === "") {
      btnImg.style.display = "none";
    }
  }
});
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  btnImg.style.display = "none";
  const cloudImg = document.getElementById("cloudImg");
  const searchAPI = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=230d49f0d859fc7a6b1ae5ce71bc7c1f&q=${inputValue.value}`;
  if (inputValue.value.trim() === "") {
    Swal.fire({
      title: `Please enter a city name`,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  } else {
    let weatherData = new Promise((resolve, reject) => {
      fetch(searchAPI)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
    weatherData
      .then((data) => {
        document.getElementById("cityImg").classList.add("jsCityImg");
        document.getElementById("city").innerHTML = data.name || "Karachi";
        document.getElementById("temperature").innerHTML = Math.round(
          data.main.temp
        );
        document.getElementById("humidity").innerHTML = data.main.humidity;
        document.getElementById("wind").innerHTML = data.wind.speed;
        document.getElementById("feel").innerHTML = data.main.feels_like;
        document.getElementById("visibility").innerHTML =
          data.visibility / 1000 + " km";
        const weatherCondition = data.weather[0].main;
        document.getElementById("weatherCondi").innerHTML = weatherCondition;
        if (weatherCondition === "Clouds") {
          cloudImg.src = "./weatherConditionImg/cloudy-day.svg";
        } else if (weatherCondition === "Clear") {
          cloudImg.src = "./weatherConditionImg/clear-day.svg";
        } else if (
          weatherCondition === "Smoke" ||
          weatherCondition === "Haze" ||
          weatherCondition === "Dust" ||
          weatherCondition === "Fog"
        ) {
          cloudImg.src = "./weatherConditionImg/day-smoke.svg";
        } else if (weatherCondition === "Snow") {
          cloudImg.src = "./weatherConditionImg/snow.svg";
        } else if (
          weatherCondition === "Rain" ||
          weatherCondition === "Drizzle"
        ) {
          cloudImg.src = "./weatherConditionImg/day-rain.svg";
        } else if (weatherCondition === "Thunderstorm") {
          cloudImg.src = "./weatherConditionImg/thunderstorms-day-rain.svg";
        } else {
          cloudImg.src = "./weatherConditionImg/clear-day.svg";
        }
        // wikipedia summery
        const wikipediaUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${data.name}`;
        fetch(wikipediaUrl)
          .then((response) => response.json())
          .then((wikiData) => {
            console.log(wikiData);
            const wikiCityName = wikiData.extract.slice(0, 602);
            document.getElementById("summery").innerHTML =
              wikiCityName + " ......";
            document.getElementById("cityImg").src =
              wikiData.originalimage.source;
          });
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          Swal.fire({
            title: `Please enter a valid city name`,
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        }
      });
  }

  document.getElementById("inputSearch").value = "";
});

// Get Current Loction Then Show There Weather Forecast
let navi = navigator.geolocation.getCurrentPosition((location) => {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  const locationAPI = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=230d49f0d859fc7a6b1ae5ce71bc7c1f`;
  fetch(locationAPI)
    .then((res) => res.json())
    .then((data) => {
      let { main, wind, visibility, name } = data;
      document.getElementById("city").innerHTML = name || "Karachi";
      document.getElementById("temperature").innerHTML = Math.round(main.temp);
      document.getElementById("humidity").innerHTML = main.humidity;
      document.getElementById("wind").innerHTML = wind.speed;
      document.getElementById("feel").innerHTML = main.feels_like;
      document.getElementById("visibility").innerHTML =
        visibility / 1000 + " km";
      // Weather Condition Base Picture
      const weatherCondition = data.weather[0].main;
      document.getElementById("weatherCondi").innerHTML = weatherCondition;
      if (weatherCondition === "Clouds") {
        cloudImg.src = "./weatherConditionImg/cloudy-day.svg";
      } else if (weatherCondition === "Clear") {
        cloudImg.src = "./weatherConditionImg/clear-day.svg";
      } else if (
        weatherCondition === "Smoke" ||
        weatherCondition === "Haze" ||
        weatherCondition === "Dust" ||
        weatherCondition === "Fog"
      ) {
        cloudImg.src = "./weatherConditionImg/day-smoke.svg";
      } else if (weatherCondition === "Snow") {
        cloudImg.src = "./weatherConditionImg/snow.svg";
      } else if (
        weatherCondition === "Rain" ||
        weatherCondition === "Drizzle"
      ) {
        cloudImg.src = "./weatherConditionImg/day-rain.svg";
      } else if (weatherCondition === "Thunderstorm") {
        cloudImg.src = "./weatherConditionImg/thunderstorms-day-rain.svg";
      } else {
        cloudImg.src = "./weatherConditionImg/clear-day.svg";
      }
      // wikipedia summery
      const wikipediaUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${name}`;
      fetch(wikipediaUrl)
        .then((response) => response.json())
        .then((wikiData) => {
          document.getElementById("summery").innerHTML = wikiData.extract;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
