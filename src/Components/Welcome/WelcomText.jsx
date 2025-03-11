import React, { useState, useEffect } from "react";

const WelcomeComponent = ({ username }) => {
  // State to hold a random inspirational quote
  const [quote, setQuote] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const quotes = [
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do.",
    "Opportunities don't happen, you create them.",
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleButtonClick = () => {
    setShowMessage(!showMessage);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-100">
      <div className="w-96 p-6 bg-white rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome Back, {username}!
        </h2>
        <p className="text-lg text-gray-700 mb-4">{quote}</p>
        {showMessage && (
          <p className="text-xl font-semibold text-green-600 mt-4">
            You are capable of amazing things! Keep pushing forward!
          </p>
        )}
        <button
          onClick={handleButtonClick}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Get Inspired!
        </button>
      </div>
    </div>
  );
};

export default WelcomeComponent;
