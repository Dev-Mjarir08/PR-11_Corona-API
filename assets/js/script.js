let stateInput = document.getElementById("stateInput");
let searchBtn = document.getElementById("searchBtn");

let loader = document.getElementById("loader");
let result = document.getElementById("result");

let cases = document.getElementById("cases");
let recovered = document.getElementById("recovered");
let deaths = document.getElementById("deaths");
let active = document.getElementById("active");

const fetchCovid = async () => {
    let state = stateInput.value.trim();

    loader.classList.remove("hide");
    result.classList.add("hide");

    if (state === "") {
        alert("Please enter a state name!");
        loader.classList.add("hide");
        return;
    }

    try {
        let res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
        let data = await res.json();

        let stateData = data.data.regional.find(
            s => s.loc.toLowerCase() === state.toLowerCase()
        );

        if (!stateData) {
            alert("State not found!");
            loader.classList.add("hide");
            return;
        }

        cases.innerHTML = stateData.totalConfirmed;
        recovered.innerHTML = stateData.discharged;
        deaths.innerHTML = stateData.deaths;

        active.innerHTML =
            stateData.totalConfirmed - stateData.discharged - stateData.deaths;

        result.classList.remove("hide");

    } catch (err) {
        alert("Something went wrong!");
    } finally {
        loader.classList.add("hide");
    }
};

searchBtn.addEventListener("click", fetchCovid);
stateInput.addEventListener("keypress", e => {
    if (e.key === "Enter")
     fetchCovid();
});
