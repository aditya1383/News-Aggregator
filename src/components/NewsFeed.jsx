import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

function NewsFeed() {
  const {lang, category} = useParams();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const res = await fetch(`/api/gnews/top-headlines?category=${category}&lang=${lang}&apikey=${API_KEY};`);
      const data = await res.json();

      setArticles(data.articles || []);
      setLoading(false);
    }

    fetchNews();
  },[lang, category]);

  if(loading) return <div className='text-center py-10'>Loading ... </div>
  return (
    <div className='py-6'>
      <h2 className="text-2xl mb-6 pb-3 border-b border-gray-200 capitalize">{category} News</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="border border-gray-200 rounded-md flex flex-col bg-white shadow-sm p-4">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover mb-4" />
            <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{article.description}</p>

            <div className="mt-auto border-t pt-3 flex justify-between">
              {/* passinf whole article object to next page articleView */}
              {/*with new technique */}
              <Link to={`/${lang}/${category}/article/${encodeURIComponent(article.title)}`}
              state={{articleData: article}}

              >Read Full Article</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )


}

export default NewsFeed
