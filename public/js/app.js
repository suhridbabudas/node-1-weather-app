const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const heading = document.querySelector("#heading");
const error_para = document.querySelector("#error-para");
const label_1 = document.querySelector("#label-1");
const label_2 = document.querySelector("#label-2");
const label_3 = document.querySelector("#label-3");
const label_4 = document.querySelector("#label-4");
const label_5 = document.querySelector("#label-5");
const label_6 = document.querySelector("#label-6");
const label_7 = document.querySelector("#label-7");
const label_v_1 = document.querySelector("#label-v-1");
const label_v_2 = document.querySelector("#label-v-2");
const label_v_3 = document.querySelector("#label-v-3");
const label_v_4 = document.querySelector("#label-v-4");
const label_v_5 = document.querySelector("#label-v-5");
const label_v_6 = document.querySelector("#label-v-6");
const label_v_7 = document.querySelector("#label-v-7");
const loading = document.querySelector("#loading");

function clearValue(isError) {
  if (isError) {
    label_1.textContent = "";
    label_v_1.textContent = "";
    label_2.textContent = "";
    label_v_2.textContent = "";
    label_3.textContent = "";
    label_v_3.textContent = "";
    label_4.textContent = "";
    label_v_4.textContent = "";
    label_5.textContent = "";
    label_v_5.textContent = "";
    label_6.textContent = "";
    label_v_6.textContent = "";
    label_7.textContent = "";
    label_v_7.textContent = "";
  } else {
    error_para.textContent = "";
  }
}

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loading.textContent = "Loading ...";
  let searchTerm = searchText.value ? searchText.value : "";
  let url = `/weather?address=${searchTerm}`;
  fetch(url)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          loading.textContent = "";
          weatherForm.reset();
          clearValue(true);
          heading.textContent = "Error!";
          document.getElementById("heading").style.color = "#ea4335";
          error_para.textContent = data.error;
        } else {
          loading.textContent = "";
          weatherForm.reset();
          clearValue(false);
          heading.textContent = "Detail Weather Report";
          document.getElementById("heading").style.color = "#013030";
          label_1.textContent = "Temperature:";
          label_v_1.textContent = data.data.temperature + " Degree C";
          label_2.textContent = "Feelslike Temperature:";
          label_v_2.textContent = data.data.feelslikeTemperature + " Degree C";
          label_3.textContent = "Forecast:";
          label_v_3.textContent = data.data.forecast;
          label_4.textContent = "Place:";
          label_v_4.textContent = data.data.place;
          label_5.textContent = "Region:";
          label_v_5.textContent = data.data.region;
          label_6.textContent = "Country:";
          label_v_6.textContent = data.data.conuntry;
          label_7.textContent = "Humidity:";
          label_v_7.textContent = data.data.humidity + '%';
        }
      });
    })
    .catch((e) => {
      console.log("Error: ", e);
    });
});
