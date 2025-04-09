import { useEffect } from "react";
import L from "leaflet";

export default function Mapa() {
  useEffect(() => {
    const map = L.map("map").setView([-23.304421, -51.151373], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    fetch("/public/dados.json")
      .then((res) => res.json())
      .then((pontos) => {
        pontos.forEach((ponto: any) => {
          if (ponto.latitude && ponto.longitude) {
            L.marker([ponto.latitude, ponto.longitude])
              .addTo(map)
              .bindPopup(`<strong>${ponto.tipo_item}</strong><br>${ponto.endereco}<br>${ponto.metragem_m2} m²`);
          }
        });
      });
  }, []);

  return (
    <div>
      <h1>Mapa das Áreas de Roçagem</h1>
      <div id="map" style={{ height: "80vh", width: "100%" }}></div>
    </div>
  );
}
