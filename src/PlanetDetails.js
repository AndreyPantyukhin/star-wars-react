import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlanetSphere from "./PlanetSphere";

function PlanetDetails() {
  const { name } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция поиска планеты по имени (рекурсивно по страницам)
  const fetchPlanetByName = async (url = "https://swapi.dev/api/planets/") => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch planets");
      const data = await res.json();

      // Ищем планету по имени (игнорируем регистр)
      const found = data.results.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      if (found) return found;

      // Если не нашли, и есть следующая страница — рекурсивно ищем дальше
      if (data.next) return fetchPlanetByName(data.next);

      // Если не нашли и дальше искать некуда — возвращаем null
      return null;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPlanet(null);

    fetchPlanetByName()
      .then((foundPlanet) => {
        if (foundPlanet) {
          setPlanet(foundPlanet);
        } else {
          setError("Planet not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p>Loading planet details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Для текстур можно завести объект с картинками по названию:
  const textures = {
    earth: "https://threejsfundamentals.org/threejs/resources/images/earth-day.jpg",
    tatooine: "/assets/planets/desert.jpg", // пример
    // Добавляй по мере необходимости
  };

  const textureUrl = textures[name.toLowerCase()] || textures["earth"];

  return (
    <div style={{ padding: 20 }}>
      <h1>{planet.name}</h1>
      <p><strong>Climate:</strong> {planet.climate}</p>
      <p><strong>Population:</strong> {planet.population}</p>
      <p><strong>Terrain:</strong> {planet.terrain}</p>

      <PlanetSphere textureUrl={textureUrl} />
    </div>
  );
}

export default PlanetDetails;
