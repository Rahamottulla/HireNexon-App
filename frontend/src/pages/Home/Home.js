// src/pages/Home/Home.js
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"; 
import "./Home.css";

function Home() {
  return (
    <>
      <Helmet>
      <title>Home | HireNexon</title>
      </Helmet>
    <div className="hero-section">
      <div className="hero-image">
        <img src="/images/hirenexon-hero.png" alt="HireNexon Hero" />
      </div>

      <div className="hero-text">
        <h1>A New Way to Find Opportunities</h1>
        <p>
          HireNexon helps job seekers and employers connect seamlessly, empowering candidates to find the right opportunities faster and land their dream jobs. 
          Sign in to access job listings, dashboards, and much more.
        </p>
        <Link to="/signup" className="createaccount-btn">Create Account</Link>
      </div>
    </div>
    </>
  );
}

export default Home;


