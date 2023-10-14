import { Link } from "react-router-dom";
import "./style.css";

function Home() {
  return (
    <div className="home">
      <Link to="/cyclobrowsing">cyclobrowsing</Link>
    </div>
  );
}

export default Home;
