import { useContext } from 'react';
import Header from './Header';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="home-page">
      <Header />
      <section className="home-card-section">
        <h2 className="section-title">My Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="home-card-row">
            {cartItems.map(item => (
              <div className="home-card" key={item._id}>
                <img src={item.image} alt={item.name} className="seed-image" />
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>

                <button
                  className="btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
                <button className="btn" style={{
    height: 'auto',
    width: 'auto', 
    padding: '3px',
    margin: '10px',
    backgroundColor: 'cornflowerblue',
    color: 'white',
    borderWidth: '0px'
  }}>Pay Now</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
