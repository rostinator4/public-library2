import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Failed to fetch book details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="status-message">Retrieving metadata...</div>;
  if (!details) return <div className="status-message">Book not found.</div>;

  return (
    <div className="details-view">
      <button onClick={() => navigate(-1)} className="back-btn">← Back to Results</button>
      
      <div className="details-card glass-panel">
        <h1>{details.title}</h1>
        <div className="details-content">
          {details.covers && (
            <img 
              src={`https://covers.openlibrary.org/b/id/${details.covers[0]}-L.jpg`} 
              alt={details.title} 
              className="book-cover"
            />
          )}
          <div className="details-text">
            <h3>Description</h3>
            <p>{typeof details.description === 'string' 
                ? details.description 
                : details.description?.value || "No description provided by the archives."}
            </p>
            <h3>Metadata</h3>
            <ul>
              <li><strong>Latest Revision:</strong> {details.revision}</li>
              <li><strong>Created:</strong> {new Date(details.created?.value).toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;