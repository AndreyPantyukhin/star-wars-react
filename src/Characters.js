import React, { useState, useEffect } from "react";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Формируем URL с пагинацией и поиском
    let url = `https://swapi.dev/api/people/?page=${page}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error: " + res.status);
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results);
        // Рассчитываем общее количество страниц (по 10 персонажей на странице)
        setTotalPages(Math.ceil(data.count / 10));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page, search]);

  // Обработчик для поиска
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // сбрасываем на первую страницу при новом поиске
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Star Wars Characters</h1>

      <input
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={handleSearchChange}
        style={{ padding: 8, width: "100%", maxWidth: 400, marginBottom: 20 }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {!loading && !error && characters.length === 0 && (
          <li>No characters found.</li>
        )}
        {characters.map((char, idx) => (
          <li key={idx}>
            <strong>{char.name}</strong> — Birth Year: {char.birth_year} — Gender: {char.gender}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: 10 }}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          style={{ marginLeft: 10 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Characters;