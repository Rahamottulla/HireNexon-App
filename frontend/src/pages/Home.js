import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1 className="text-3xl font-bold mb-4">Welcome to HireSphere 🚀</h1>
        <p className="text-lg mb-6">
          Discover jobs, create postings, and manage your applications all in one place!
        </p>
        <div>
          <p>Get started:</p>
          <ul className="list-disc pl-5">
            <li><a href="/login" className="text-blue-600">Login</a></li>
            <li><a href="/register" className="text-blue-600">Register</a></li>
            <li><a href="/jobs" className="text-blue-600">View Jobs</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
