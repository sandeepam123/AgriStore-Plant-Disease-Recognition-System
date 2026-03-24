import { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { CartContext } from '../context/CartContext';
import './Implements.css';

const Implements = () => {
  const [implementsData, setImplementsData] = useState([]);
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    fetch('http://localhost:5000/api/implements')
      .then(res => res.json())
      .then(data => setImplementsData(data));
  }, []);

  return (
    <div className="home-page">
      <Header />
      <section className="home-card-section">
        <h2>Tools & Implements</h2>

        <div className="home-card-row">
          {implementsData.map((item) => (
            <div className="home-card" key={item._id}>
              <img src={item.image} alt={item.name} className="seed-image"/>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>₹{item.price}</span>

              <button className="btn" onClick={() => addToCart(item)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Implements;
