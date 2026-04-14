import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#9b59b6'];

const ExploreView = ({ works = [], loading, query, setQuery, filter, setFilter }) => {
  
  const chartData = useMemo(() => {
    if (!works || !works.length) return { yearData: [], authorData: [] };

    const years = works.filter(w => w.year !== "N/A").reduce((acc, b) => {
      acc[b.year] = (acc[b.year] || 0) + 1; return acc;
    }, {});
    const yearData = Object.keys(years).map(y => ({ year: y, count: years[y] }))
      .sort((a, b) => a.year - b.year).slice(-10);

    const authors = works.reduce((acc, b) => {
      acc[b.author] = (acc[b.author] || 0) + 1; return acc;
    }, {});
    const authorData = Object.keys(authors).map(n => ({ name: n, value: authors[n] }))
      .sort((a, b) => b.value - a.value).slice(0, 5);

    return { yearData, authorData };
  }, [works]);

  return (
    <div className="explore-view">
      
      {/* --- 2. SEARCH CONTROLS --- */}
      <div className="search-container">
        <div className="input-group">
          <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
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

      {!loading && works?.length > 0 && (
        <div className="charts-wrapper">
          <div className="chart-container glass-panel">
            <h3>Publication Years</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData.yearData}>
                <XAxis dataKey="year" stroke="#ccc" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" fill="#3498db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container glass-panel">
            <h3>Top Authors in Results</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={chartData.authorData} innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={5}>
                  {chartData.authorData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <h2 style={{ marginBottom: '15px' }}>Search Results</h2>
      <div className="results-grid">
        {loading ? (
          <div className="status-message">Searching the archives...</div>
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

export default ExploreView;