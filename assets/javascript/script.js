const contentEls = document.querySelectorAll(".country, .des, .temp");
const innerEls = document.querySelectorAll(".two .inner"); 
const iconEls = document.querySelectorAll(".weather-icon-img");
const errorEls = document.querySelectorAll(".err-msg");
const mobileInput = document.querySelector(".city-input");
const desktopInput = document.querySelector("#text");


const checkweather = async (city, updateInput = true) => {

    const apiid = "34731d2d71637839aea5673d4de1071d";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiid}`;

    try {
        const res = await axios.get(apiurl);
        const data = res.data;

        contentEls.forEach(el => el.style.display = "block");
        innerEls.forEach(el => el.style.display = "flex");
        iconEls.forEach(icon => icon.style.display = "block");
        errorEls.forEach(err => err.style.display = "none"); 

        document.querySelectorAll(".country").forEach(el => el.innerText = data.name);
        document.querySelectorAll(".temp").forEach(el => el.innerText = Math.round(data.main.temp) + "°C");
        document.querySelectorAll(".des").forEach(el => el.innerText = data.weather[0].description);
        document.querySelectorAll(".humidity-val").forEach(el => el.innerText = data.main.humidity + "%");
        document.querySelectorAll(".wind-val").forEach(el => el.innerText = data.wind.speed + " km/hr");

        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        iconEls.forEach(icon => {
            icon.src = iconUrl;
            icon.style.display = "block";
        });
        if (updateInput) {
    if (mobileInput) mobileInput.value = data.name;
    if (desktopInput) desktopInput.value = data.name;
}



   } catch {

    contentEls.forEach(el => el.style.display = "none");
    innerEls.forEach(el => el.style.display = "none");
    iconEls.forEach(icon => icon.style.display = "none");

    const wrongCity =
        mobileInput?.value.trim() ||
        desktopInput?.value.trim();

  
    errorEls.forEach(err => {
        err.style.display = "block";
        err.style.color = "red";
        err.style.fontWeight = "600";
        err.innerText = ` city name is invalid`;
    });

    if (mobileInput) mobileInput.value = wrongCity;
    if (desktopInput) desktopInput.value = wrongCity;
}
}


window.onload = () => checkweather("Hyderabad", false);



document.querySelectorAll(".inp button").forEach(btn => {
    btn.addEventListener("click", () => {
        let city = "";

        if (window.innerWidth < 768) {
            city = document.querySelector(".city-input").value.trim();
        } else {
            city = document.querySelector("#text").value.trim();
        }

        if (city !== "") {
            checkweather(city, true);
        }
    });
});


