import "./App.css";
import { useEffect } from "react";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./components/Product/ProductDetailsPage";
import Wrongsearch from "./components/Layouts/Wrongsearch";
import Register from "./components/Users/Register";
import Login from "./components/Users/Login";
import Landing from "./components/Users/Landing";
import Profile from "./components/Users/Profile";
import { loadUser } from "./redux/actions/authActions";
import store from "./redux/store";
//import ProtectedRoute from "./components/route/ProtectedRoute";

function App() {
  //useffect functions to load user from backend
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route path="/wrongsearch" element={<Wrongsearch />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/search/:keywordSearch" element={<Home />} />
        {/* protected routes from regular users */}
        <Route path="/me" element={<Profile />} exact />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
