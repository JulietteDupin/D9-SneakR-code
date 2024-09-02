import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"
export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}
