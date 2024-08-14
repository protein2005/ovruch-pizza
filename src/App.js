import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
