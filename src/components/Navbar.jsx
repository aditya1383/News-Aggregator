import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // break url it into pieces
    const pathParts = location.pathname.split('/').filter(Boolean);
    const currentLang = pathParts[0] || 'en';
    const currentCategory = pathParts[1] || 'general';

    const categories = ['General', 'World', 'Business', 'Technology', 'Entertainment', 'Sports', 'Science', 'Health'];

    const handleLangChange = (e) => {
        const newLang = e.target.value;
        navigate(`/${newLang}/${currentCategory}`);
    }
 
  return (
    // <div>
        <nav  className="bg-[#1e2125] text-gray-400 py-3 px-6 flex justify-between items-center text-sm shadow-md">
            <div className="flex items-center flex-wrap gap-4">
                <Link to="/" className="text-white text-lg font-medium mr-2">StreamLine Nexus</Link>

            {categories.map((cat) => (
                <Link key={cat} to={`/${currentLang}/${cat.toLowerCase()}`}
                className={currentCategory === cat.toLowerCase() ? 'text-white font-medium' : 'hover:text-white'}
                >{cat}</Link>
            ))}
            </div>
            {/* // lANGUAGE DROPDOwn */}
        <select value={currentLang} onChange={handleLangChange} className="bg-transparent text-white border-none outline-none cursor-pointer">
             <option value="en" className="text-black">English</option>
        <option value="hi" className="text-black">Hindi</option>
        <option value="mr" className="text-black">Marathi</option>
        <option value="gu" className="text-black">Gujarati</option>
        </select>
        </nav>
         
    // </div>

  )
}

export default Navbar