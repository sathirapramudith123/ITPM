import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job</h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl">
        Connect with top employers or hire the best talent. Your career journey starts here.
      </p>
      <div className="flex space-x-4">
        <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
        <Link to="/register" className="btn btn-secondary">Get Started</Link>
      </div>
    </motion.div>
  );
};

export default Home;