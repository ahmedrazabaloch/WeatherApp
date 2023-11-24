document.querySelector(".search__icon").addEventListener("click", () => {
  let inputValue = document.querySelector(".input");
  let cityName = document.getElementById("cityName");
  cityName.innerHTML = inputValue.value;
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  const keyAPI = "230d49f0d859fc7a6b1ae5ce71bc7c1f";

  let weatherData = new Promise((resolve, reject) => {
    fetch(apiURL + `&q=${cityName.textContent}&appid=${keyAPI}`)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });

  weatherData
    .then((data) => {
      document.getElementById("temperature").innerHTML =
        Math.round(data.main.temp) + " °C";
      document.getElementById("humidity").innerHTML = data.main.humidity;
      document.getElementById("wind").innerHTML = data.wind.speed;
      document.getElementById("feel").innerHTML = data.main.feels_like;
      document.getElementById("visibility").innerHTML =
        data.visibility / 1000 + " km";
      document.getElementById("temp").innerHTML = Math.round(data.main.temp);
      console.log("object ==>", data);
    })
    .catch((err) => console.log(err));
  inputValue.value = "";
});

let navi = navigator.geolocation.getCurrentPosition((location) => {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let navAPI = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  const keyAPI = "&appid=230d49f0d859fc7a6b1ae5ce71bc7c1f";

  fetch(navAPI + `&lat=${latitude}&lon=${longitude}` + keyAPI)
    .then((res) => res.json())
    .then((data) => {
      let { main, wind, visibility } = data;
      document.getElementById("temperature").innerHTML =
        Math.round(main.temp) + " °C";
      document.getElementById("humidity").innerHTML = main.humidity;
      document.getElementById("wind").innerHTML = wind.speed;
      document.getElementById("feel").innerHTML = main.feels_like;
      document.getElementById("visibility").innerHTML =
        visibility / 1000 + " km";
      document.getElementById("temp").innerHTML = Math.round(main.temp);
    })
    .catch((err) => console.log(err));
});
