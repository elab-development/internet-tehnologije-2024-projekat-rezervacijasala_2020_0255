import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Venues from './pages/Venues';
import Reservations from './pages/Reservations';

function App() {
  const user = Boolean(useSelector((state) => state.user));

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/venues"
          element={user ? <Venues /> : <Navigate to="/" />}
        />
        <Route
          path="/reservations"
          element={user ? <Reservations /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
