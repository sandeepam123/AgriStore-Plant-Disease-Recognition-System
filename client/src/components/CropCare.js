import { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { CartContext } from '../context/CartContext';
import './CropCare.css';

const CropCare = () => {
  const { addToCart } = useContext(CartContext);
  const [cropcareData, setCropcareData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCropCare = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cropcare');
        const data = await response.json();
        setCropcareData(data);
      } catch {
        setError('Failed to load cropcare products');
      } finally {
        setLoading(false);
      }
    };
    fetchCropCare();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <section className="home-card-section">
        <h2 className="section-title">Crop Care Products</h2>

        <div className="home-card-row">
          {cropcareData.map(product => (
            <div className="home-card" key={product._id}>
              <img src={product.image} alt={product.name} className="seed-image" />
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>

              <div className="seed-details">
                <span className="price">₹{product.price}</span>
                <span className="stock">{product.stock} in stock</span>
              </div>

              <button
                className="btn"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CropCare;
