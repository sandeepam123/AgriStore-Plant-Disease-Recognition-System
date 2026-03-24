import { useState } from 'react';
import Header from './Header';
import './Dashboard.css';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    stock: '',
    category: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ✅ IMPORTANT: Send token for admin verification
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || 'Failed to add product');
        return;
      }

      setMessage('Product added successfully ✅');
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        stock: '',
        category: '',
        image: '',
      });
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard-container">
        <main className="dashboard-main">
          <h2>Add Product</h2>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <form className="dashboard-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="quantity"
              placeholder="Quantity (eg: 500 ml, 1 kg)"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="seeds">Seeds</option>
              <option value="fertilizers">Fertilizers</option>
              <option value="implements">Implements</option>
              <option value="cropcare">Crop Care</option>
            </select>

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />

            <button type="submit">Create Product</button>
          </form>
        </main>
      </div>
    </>
  );
};

export default Dashboard;