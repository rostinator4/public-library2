import { Link } from 'react-router-dom';

const SearchPage = ({ works = [], loading, query, setQuery, filter, setFilter }) => {
  return (
    <div className="search-page">
      <div className="search-container">
        <div className="input-group">
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
            className="search-input"
            placeholder="Search the archives..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <h2 style={{ marginBottom: '15px' }}>Search Results</h2>

      <div className="results-grid">
        {loading ? (
          <div className="status-message">Searching...</div>
        ) : works?.length > 0 ? (
          works.map((book) => (
            <Link to={`/details/${book.id}`} key={book.id} className="result-row-link">
              <div className="result-row">
                <div className="row-title">{book.title}</div>
                <div className="row-author">{book.author}</div>
                <div className="row-year">{book.year}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="status-message">No books found. Try a different query.</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;