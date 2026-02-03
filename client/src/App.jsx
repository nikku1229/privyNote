import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Diary from "./pages/Diary";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import BackBox from "./components/BackBox";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <BackBox></BackBox>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/diary" element={<Diary />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
