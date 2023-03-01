// get all data and pass only some data using slice to show in the UI
const loadCountriesData = () => {
  const URL = "https://restcountries.com/v3.1/all";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => showCountries(data.slice(0, 15)));
}

// show data to UI
const showCountries = countries => {
    const container = document.getElementById("card-container");
    container.innerHTML = "";
    countries.forEach((country) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="col">
          <div class="card text-center h-100">
            <img height="300px" src="${country.flags.png}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${country.name.common}</h5>
              <button onclick="loadDetails('${country.cca2}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#countryDetails">Details</button>
            </div>
          </div>
        </div>
        `;
        container.appendChild(div);
    })
}
// calling 
loadCountriesData()

// get all data and pass all data using slice to show in the UI when click See All button
const showAllCountryData = () => {
  const URL = "https://restcountries.com/v3.1/all";
    fetch(URL)  
    .then(res => res.json())
    .then(data => showCountries(data))
}
// get single country info using dynamic URL and unique id
const loadDetails = countryCode => {
  const URL =`https://restcountries.com/v3.1/alpha/${countryCode}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => showDetails(data))
}
// show single country info in modal using dynamic URL and unique id
const showDetails = (data) => {
  document.getElementById("modal-title").innerText = `${data[0].name.common}`;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <p>Capital: ${data[0].capital[0]}</p>
  <p>Language: ${Object.keys(data[0].languages)[0]}</p>
  <img height="150px" src="${data[0].flags.png}" alt="">
  `;
  console.log(Object.keys(data[0].languages))
}