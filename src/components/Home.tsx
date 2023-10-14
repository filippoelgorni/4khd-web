import { Link } from "react-router-dom";
import "./style.css";

function Home() {
  return (
    <div className="home">
      <Link to="/cyclobrowsing">cyclobrowsing</Link>
      <footer className="footer">
        <div className="footer-content">
          4KHD is a group of people and an ever-changing idea. We exist in
          movement and we articulate projects around this topic. We are the high
          resolution of low performances.
        </div>
      </footer>
      <div className="bottom-shadow" />
    </div>
  );
}

export default Home;
