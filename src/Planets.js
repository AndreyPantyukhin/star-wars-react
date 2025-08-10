import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        setPlanets(data.results);
        setTotalPages(Math.ceil(data.count / 10));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Star Wars Planets</h1>

      {loading && <p>Loading planets...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {!loading && !error && planets.length === 0 && <li>No planets found.</li>}
        {planets.map((planet, idx) => (
          <li key={idx}>
                <Link to={`/planets/${planet.name.toLowerCase()}`}>
                <strong>{planet.name}</strong>
                </Link>{" "}
                — Climate: {planet.climate} — Population: {planet.population}
            </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} style={{ marginRight: 10 }}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} style={{ marginLeft: 10 }}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Planets;
