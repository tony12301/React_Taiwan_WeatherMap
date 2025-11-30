import TaiwanMap from "../components/TaiwanMap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div>
      <h1>台灣天氣互動地圖</h1>

      <TaiwanMap onSelect={(name) => {
        console.log("你點了：", name);
        nav(`/detail/${name}`);
      }} />
    </div>
  );
}
