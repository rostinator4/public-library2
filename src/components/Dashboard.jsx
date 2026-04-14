import { useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Updated colors to look good with your dark glass theme
const COLORS = ['#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#9b59b6']; 

const Dashboard = ({ works, loading }) => {
  const chartData = useMemo(() => {
    // Return empty arrays if works is undefined or empty
    if (!works || !works.length) return { yearData: [], authorData: [] };

    // 1. Group by Year
    const years = works.filter(w => w.year !== "N/A").reduce((acc, b) => {
      acc[b.year] = (acc[b.year] || 0) + 1;
      return acc;
    }, {});

    const yearData = Object.keys(years)
      .map(y => ({ year: y, count: years[y] }))
      .sort((a, b) => a.year - b.year)
      .slice(-10);

    // 2. Group by Author
    const authors = works.reduce((acc, b) => {
      acc[b.author] = (acc[b.author] || 0) + 1;
      return acc;
    }, {});

    const authorData = Object.keys(authors)
      .map(n => ({ name: n, value: authors[n] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return { yearData, authorData };
  }, [works]);

  if (loading) return <div className="status-message">Analyzing collection...</div>;
  if (!works || works.length === 0) return <div className="status-message">Search for books to generate insights.</div>;

  return (
    <div className="dashboard-view">
      <h2 style={{ marginBottom: '20px' }}>Library Insights</h2>
      
      <div className="charts-wrapper">
        {/* Graph 1: Bar Chart */}
        <div className="chart-container glass-panel">
          <h3>Publication Years</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData.yearData}>
              <XAxis dataKey="year" stroke="#ccc" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff' }} 
                cursor={{fill: 'rgba(255,255,255,0.1)'}}
              />
              <Bar dataKey="count" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Graph 2: Pie Chart */}
        <div className="chart-container glass-panel">
          <h3>Top Authors in Results</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData.authorData} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                {chartData.authorData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="rgba(0,0,0,0.2)" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff' }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;