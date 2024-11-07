"use client";
import { useState } from "react";

export default function Home() {
  // state management
  const [pictureContent, setPictureContents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch data function
  async function fetchPictures() {
    setLoading(true);
    setError(null);
    try {
      const API_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5";
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch pictures");
      const data = await response.json();
      setPictureContents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // clear action
  function clearPictures() {
    setPictureContents(null);
  }

  // header component with fetch and clear buttons
  const Header = () => {
    return (
      <header className="text-center my-6">
        <h1 className="text-3xl font-bold text-white mb-4">MDIA-3126 Midterm API Fetching</h1>
        <p className="text-m font-regular text-white mb-4">Click on the button below to fetch data from NASA! This will fetch stellar photos and information to be displayed in the following content below. 🌌</p>
        <div className="flex justify-center space-x-4">
          <button
            disabled={loading}
            className={`px-6 py-2 font-semibold rounded-lg shadow-md transition 
                        ${
                          loading
                            ? "bg-pink-300 cursor-not-allowed text-gray-700"
                            : "bg-pink-500 text-white hover:bg-pink-600"
                        }`}
            onClick={fetchPictures}
          >
            Fetch The Stars 💫
          </button>
          <button
            className={`px-6 py-2 font-semibold rounded-lg shadow-md transition 
                        ${
                          loading || !pictureContent
                            ? "bg-pink-300 cursor-not-allowed text-gray-700"
                            : "bg-pink-500 text-white hover:bg-pink-600"
                        }`}
            onClick={clearPictures}
            disabled={loading || !pictureContent}
          >
            Clear Stars
          </button>
        </div>
      </header>
    );
  };

    // component to display fetched data
    const PictureDisplay = () => {
      if (loading) return <section className="text-center text-pink-300 text-xl">Loading...</section>;
      if (error) return <section className="text-center text-pink-500 text-xl">Error: {error}</section>;
      if (!pictureContent) return <section className="text-center text-gray-500 text-xl">No content to be displayed for now!</section>;
  
      return (
        <section className="grid gap-6 mt-6">
          {pictureContent.map((picture, i) => (
            <article key={i} className="bg-gray-800 rounded-lg shadow-lg p-4">
              <img
                src={picture.url}
                alt={picture.title}
                className="w-full h-auto object-contain rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold text-pink-400 mb-2">{picture.title}</h2>
              <p className="text-gray-300">{picture.explanation}</p>
            </article>
          ))}
        </section>
      );
    };
  
    return (
      <div className="min-h-screen bg-black p-8">
        <Header />
        <PictureDisplay />
      </div>
    );
  }