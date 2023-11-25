document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("inputSearch").value = "";
  console.log("submitted");
});
