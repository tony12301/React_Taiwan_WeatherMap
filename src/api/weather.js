const API_KEY = "你的APIKEY";

export async function fetchWeather(cityEn) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityEn}&appid=${API_KEY}&units=metric`
  );
  return res.json();
}
