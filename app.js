document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = document.getElementById("inputSearch");
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
        document.getElementById("city").innerHTML = data.name || "Karachi";
        document.getElementById("temperature").innerHTML = Math.round(
          data.main.temp
        );
        document.getElementById("humidity").innerHTML = data.main.humidity;
        document.getElementById("wind").innerHTML = data.wind.speed;
        document.getElementById("feel").innerHTML = data.main.feels_like;
        document.getElementById("visibility").innerHTML =
          data.visibility / 1000 + " km";
        console.log("object ==>", data);
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
        data.visibility / 1000 + " km";
    })
    .catch((err) => console.log(err));
});
