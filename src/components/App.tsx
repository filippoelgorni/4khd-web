import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cyclobrowsing from "./cyclobrowsing/Cyclobrowsing";

import "./style.scss";

function App() {
  return <div>
    <Routes>  
      <Route path="/" element={<Home />} />
      <Route path="cyclobrowsing" element={<Cyclobrowsing />} />
    </Routes>
  </div>
}

export default App;
