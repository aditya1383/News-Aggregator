import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsFeed from './components/NewsFeed';
import ArticleView from './components/ArticleView';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <div>
        <Routes>
          <Route  path='/' element={<Navigate to="en/general" replace />}/>

          {/* Dynamic Route */}
          <Route path='/:lang/:category' element={<NewsFeed />}/>

          {/* ROute for a single article */}
          <Route  path='/:lang/:category/article/:title' element={<ArticleView />}/>

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;