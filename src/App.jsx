import About from './components/About';
import ExploreView from './components/ExploreView';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';
import './App.css';

function App() {
  const [query, setQuery] = useState('Crime and Punishment');
  const [filter, setFilter] = useState('q');
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://openlibrary.org/search.json?${filter}=${query}&limit=20`);
        const data = await res.json();


        if (data && data.docs) {
          setWorks(data.docs.map(b => ({
            title: b.title,
            author: b.author_name?.[0] || "Unknown",
            year: b.first_publish_year || "N/A",
            id: b.key.replace("/works/", ""),
          })));
        } else {

          setWorks([]);
        }

      } catch (err) {
        console.error("Fetch Error:", err);
        setWorks([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => { if (query) fetchBooks(); }, 500);
    return () => clearTimeout(debounce);
  }, [query, filter]);

  return (
    <div className="app-container">


      <aside className="glass-panel dashboard-sidebar">
        <h1>Library📚</h1>

        {/* Wrap the buttons in this div! */}
        <div className="nav-links">
          <Link to="/" className="nav-btn">Explore 🔍</Link>
          <Link to="/about" className="nav-btn">About 🤷‍♀️</Link>
        </div>
      </aside>

      <main className="glass-panel main-content">
        <Routes>
          <Route path="/" element={
            <ExploreView
              works={works}
              loading={loading}
              query={query}
              setQuery={setQuery}
              filter={filter}
              setFilter={setFilter}
            />
          } />

          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

    </div>);
}

export default App;