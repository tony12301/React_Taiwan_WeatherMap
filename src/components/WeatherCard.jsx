export default function WeatherCard({ taiwanCity, data }) {
  return (
    <div className="weather-card">
      <h2>{taiwanCity}</h2>
      <p>氣溫：{data.main.temp}°C</p>
      <p>體感：{data.main.feels_like}°C</p>
      <p>天氣：{data.weather[0].description}</p>
      <button>查看詳細</button>
    </div>
  );
}
