import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('Crime and Punishment');
  const [filter, setFilter] = useState('q'); // New state for filtering type
  const [sort, setSort] = useState('title');
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) fetchBooks();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query, sort, filter]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?${filter}=${query}&sort=${sort}`,
        { headers: { 'User-Agent': 'public-library (dadajanovrostislav@gmail.com)' } }
      );
      const data = await response.json();
      const bookObjects = data.docs.map(book => ({
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        year: book.first_publish_year || "N/A",
        id: book.key,
      }));
      setWorks(bookObjects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div id="root">
      <aside className="glass-panel dashboard-sidebar">
        <h1>Library📚</h1>
        <button className="nav-btn">Dashboard</button>
        <button className="nav-btn">Search 🔍</button>
        <button className="nav-btn">About 🤷‍♀️</button>
      </aside>

      <main className="glass-panel search-results-area">
        <div className="search-container">
          <div className="input-group">
            {/* FILTER DROPDOWN */}
            <select
              className="filter-dropdown"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="q">All</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>

            <input
              type="text"
              placeholder={`Search by ${filter === 'q' ? 'keyword' : filter}...`}
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <select
              className="sort-dropdown"
              value={sort}
              onChange={(e) => setSort(e.target.value)}>
              <option value="title">A-Z</option>
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </div>
        </div>

        <h2>Search Results</h2>

        <div className="results-grid">
          {loading ? (
            <div className="status-message">Searching the archives...</div>
          ) : works.length > 0 ? (
            works.map((book) => (
              <div key={book.id} className="result-row">
                <div className="row-title">{book.title}</div>
                <div className="row-author">{book.author}</div>
                <div className="row-year">{book.year}</div>
              </div>
            ))
          ) : (
            <div className="status-message">No results found.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;