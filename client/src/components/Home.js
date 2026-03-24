// Home.js
import Header from './Header';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="container">
        <h1>Explore Our Categories</h1>
        <p>Discover the best tools,seeds,and solutions for modern,sustainable farming</p>
        <div className="cartegories">
          <Link to="/seeds" className="home-nav-link">
          <div className="categories-card1">
            <h1>Seeds</h1>
          </div>
          </Link>
          <Link to="/fertilizers" className="home-nav-link">
          <div className="categories-card2"> 
            <h1>Fertilizers</h1>
          </div>
          </Link>
          <Link to="/implements" className="home-nav-link">
          <div className="categories-card3">
            <h1>Tools</h1>
          </div>
          </Link>
          <Link to="/cropcare" className="home-nav-link">
          <div className="categories-card4">
            <h1>Crop Care</h1>
          </div>
          </Link>
          <Link to="/leaf" className="home-nav-link">
          <div className="categories-card5">
            <h1>Leaf Disease Recognition</h1>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
