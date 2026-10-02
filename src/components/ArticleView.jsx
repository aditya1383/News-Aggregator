import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

function ArticleView() {
  const location = useLocation();
  const navigate = useNavigate();

  const {lang, category, title} = useParams();

  const [article, setArticle] = useState(location.state?.articleData || null);
  const [loading, setLoading] = useState(!location.state?.articleData);
  const [error, setError] = useState(false);

  useEffect(() => {
    if(article) return;

    const fetchMissingArticle = async() => {
      try {
        const res = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&apikey=${API_KEY}`);
        const data = await res.json();

        const decodedTitle = decodeURIComponent(title);

        // search in the fecth data for the article
        const foundArticle = data.articles?.find(a => a.title === decodedTitle);

        if(foundArticle) {
          setArticle(foundArticle);
        }else {
          setError(true);
        }
      } catch (error) {
        console.log("error fetching data", error);
        setError(true);
      }finally {
        setLoading(false);
      }
    }
  }, [article, lang, category, title]);

  if(loading) {
    return <div  className="py-20 text-center text-lg text-gray-600">Loading...</div>
  }

  if(error || !article) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl text-gray-600 mb-4">Article not found. It may be too old or the link is broken</p>
        <button onClick={() => navigate(-1)} className='text-[#3b82f6] hover:underline'>Go Back</button>
      </div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="text-[#3b82f6] mb-6 hover:underline flex items-center text-sm"
      >
        &larr; Back
      </button>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>
      
      <div className="flex items-center text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
        <span className="bg-[#5c6975] text-white px-2 py-0.5 rounded-sm mr-3 font-medium">
          {article.source.name}
        </span>
        <span>{new Date(article.publishedAt).toLocaleString()}</span>
      </div>
      
      {article.image && (
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full rounded-md mb-8 shadow-sm object-cover max-h-[450px]" 
        />
      )}
      
      <div className="prose max-w-none text-gray-800 text-base leading-relaxed mb-10">
        <p>{article.content}</p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-md border border-gray-200 flex justify-between items-center">
        <span className="text-gray-600 font-medium">Read the full story</span>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-[#3b82f6] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          View at {article.source.name}
        </a>
      </div>
    </div>
  )
}

export default ArticleView;