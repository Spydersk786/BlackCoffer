import React, { useEffect, useState } from 'react';

const Top = ({ field }) => {
  const [articles, setArticles] = useState([]);

  // Fetch top five articles from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/top-five?field=${field}`);
        const data = await response.json();
        console.log(data); // Check the structure of the response
        if (Array.isArray(data)) {
          setArticles(data); // Only set articles if data is an array
        } else {
          console.error('Expected an array but received:', data);
          setArticles([]); // Set to an empty array to prevent errors
        }
      } catch (error) {
        console.error('Error fetching the data:', error);
        setArticles([]); // Handle error by setting articles to an empty array
      }
    };

    fetchData();
  }, [field]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-8">Top 5 Articles by {field.charAt(0).toUpperCase() + field.slice(1)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900">{article.title}</h2>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Intensity:</span> {article.intensity}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Relevance:</span> {article.relevance}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Likelihood:</span> {article.likelihood}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Published Year:</span> {article.start_year}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No articles found</p>
        )}
      </div>
    </div>
  );
};

export default Top;
