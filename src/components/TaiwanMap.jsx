import * as d3 from "d3";
import { feature } from "topojson-client";
import taiwan from "../assets/taiwanTopo.json";
import { useEffect, useRef } from "react";

export default function TaiwanMap({ onSelect }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 1000;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 清空重畫

    // 取出台灣 22 個縣市資料
    const counties = feature(taiwan, taiwan.objects.layer1);

    // Mercator 投影（台灣專用）
    const projection = d3.geoMercator()
      .center([121, 23.8])
      .scale(13000)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    svg
      .selectAll("path")
      .data(counties.features)
      .join("path")
      .attr("d", path)
      .attr("fill", "#ccc")
      .attr("stroke", "#333")
      .attr("stroke-width", 1)
      .on("mouseover", function () {
        d3.select(this).attr("fill", "#aaa");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "#ccc");
      })
      .on("click", (e, d) => {
        const name = d.properties.COUNTYNAME;
        onSelect?.(name);
      });

  }, []);

  return <svg ref={svgRef} width={800} height={1000}></svg>;
}
