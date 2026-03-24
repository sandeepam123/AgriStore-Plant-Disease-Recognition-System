import { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { CartContext } from '../context/CartContext';
import './Fertilizers.css';

const Fertilizers = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    fetch('http://localhost:5000/api/fertilizers')
      .then(res => res.json())
      .then(data => setFertilizers(data));
  }, []);

  return (
    <div className="home-page">
      <Header />
      <section className="home-card-section">
        <h2>Fertilizers</h2>

        <div className="home-card-row">
          {fertilizers.map((fertilizer) => (
            <div className="home-card" key={fertilizer._id}>
              <img src={fertilizer.image} alt={fertilizer.name} className="seed-image"/>
              <h3>{fertilizer.name}</h3>
              <p>{fertilizer.description}</p>
              <span>₹{fertilizer.price}</span>

              <button className="btn" onClick={() => addToCart(fertilizer)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Fertilizers;
