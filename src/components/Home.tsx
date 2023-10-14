import { Link } from "react-router-dom";
import {useAllPrismicDocumentsByType} from '@prismicio/react'

import "./style.scss";



function Home() {

  const [projectsRaw] = useAllPrismicDocumentsByType('project')
  const projects = projectsRaw?.map(p=>p.data)


  return (
    <div className="home">
      <Link to="/cyclobrowsing">cyclobrowsing</Link>
      <div className="project-titles">
      {projects?.map(p=><img src={p.title_svg.url} className="project-title" alt=''/>)}
      </div>
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
