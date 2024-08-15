import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
