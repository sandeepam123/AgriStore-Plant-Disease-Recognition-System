import { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { CartContext } from '../context/CartContext';
import './Seeds.css';

const Seeds = () => {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/seeds');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setSeeds(data);
      } catch (err) {
        setError('Failed to load seeds.');
      } finally {
        setLoading(false);
      }
    };
    fetchSeeds();
  }, []);

  if (loading) return <p>Loading seeds...</p>;

  return (
    <div className="home-page">
      <Header />
      <section className="home-card-section">
        <h2 className="section-title">Seeds Products</h2>

        <div className="home-card-row">
          {seeds.map((seed) => (
            <div className="home-card" key={seed._id}>
              <img src={seed.image} alt={seed.name} className="seed-image" />
              <h3>{seed.name}</h3>
              <p>{seed.description}</p>
              <div className="seed-details">
                <span>₹{seed.price}</span>
                <span>{seed.stock} in stock</span>
              </div>

              <button className="btn" onClick={() => addToCart(seed)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Seeds;
