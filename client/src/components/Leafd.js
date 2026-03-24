import { useState } from 'react';
import Header from './Header';

const Leaf = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError('Please upload a plant leaf image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Prediction failed');
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Flask server not reachable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="dashboard-container">
        <main className="dashboard-main">
          <h2> Plant Disease Detection</h2>

          {error && <p className="error">{error}</p>}
          {loading && <p> Analyzing image...</p>}

          <form className="dashboard-form" onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            <button type="submit" disabled={loading}>
              Predict Disease
            </button>
          </form>

          {/* Prediction Result */}
          {result && (
            <div className="prediction-result">
              <h3>Disease: {result.name}</h3>

              <p>
                <strong>Cause:</strong> {result.cause}
              </p>

              <p>
                <strong>Cure:</strong> {result.cure}
              </p>

              {result.image && (
                <img
                  src={`http://127.0.0.1:5000${result.image}`}
                  alt="Uploaded Leaf"
                  style={{ maxWidth: '300px', marginTop: '10px' }}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Leaf;
