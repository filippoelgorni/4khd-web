import { Link } from "react-router-dom";
import { useAllPrismicDocumentsByType } from "@prismicio/react";
import { Carousel } from "./Carousel";

import "./style.scss";

function Home() {
  const [projectsRaw] = useAllPrismicDocumentsByType("project");
  const projects = projectsRaw?.map((p) => p.data);

  const selectedProject = projects?.[1];
  console.log("✌️selectedProject --->", selectedProject);

  return (
    <div className="home">
      <Link to="/cyclobrowsing" className="flying-igor">
      <div className="where-are-you">Ma dove sei frate?</div>
      <img src="./assets/igor.png" alt='igor' className="flying-igor-image"/>
      </Link>
      <div className="project-titles">
        {projects?.map((p) => (
          <img src={p.title_svg.url} className="project-title" alt="" />
        ))}
      </div>
      {selectedProject && (
        <Carousel
          credits={selectedProject.authors[0].text}
          images={selectedProject.images.map((image: any) => image.image.url)}
          description={selectedProject.description.flatMap((d:any)=>d.text)}
          titleImageUrl={selectedProject.title_svg.url}
          title={selectedProject.project_name[0].text}
          year={selectedProject.year}
        />
      )}
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
