console.log("Teste - Single Page");

let showVideo;
const btnSusto = document.querySelector("#btnSusto");
const videoHotel = document.querySelector("#videoHotel");

showVideo = false;

btnSusto.addEventListener("click", () => {
  if (showVideo == false) {
    showVideo = true;
    videoHotel.style.display = "block";
  } else {
    showVideo = false;
    videoHotel.style.display = "none";
  }
});
