import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
  const { county } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "CWA-DFA7F050-4529-4E3D-9AEB-4980B5C6C69F";

  useEffect(() => {
    async function getWeather() {
      const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${API_KEY}&locationName=${county}`;

      const res = await fetch(url);
      const data = await res.json();

      const location = data.records.location[0];
      const w = location.weatherElement;

      const result = {
        county: location.locationName,
        description: w[0].time[0].parameter.parameterName, // Wx
        rain: w[1].time[0].parameter.parameterName,        // PoP
        minT: w[2].time[0].parameter.parameterName,        // MinT
        comfort: w[3].time[0].parameter.parameterName,     // CI
        maxT: w[4].time[0].parameter.parameterName         // MaxT
      };

      setWeather(result);
      setLoading(false);
    }

    getWeather();
  }, [county]);

  if (loading) return <h2>資料載入中...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{weather.county} 天氣預報</h1>

      <p>🌤 天氣現象：{weather.description}</p>
      <p>🌡 氣溫：{weather.minT}°C ~ {weather.maxT}°C</p>
      <p>💧 降雨機率：{weather.rain}%</p>
      <p>🙂 舒適度：{weather.comfort}</p>
    </div>
  );
}
