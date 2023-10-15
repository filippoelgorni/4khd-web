import { Link } from "react-router-dom";
import { useAllPrismicDocumentsByType } from "@prismicio/react";
import { Carousel } from "./Carousel";

import "./style.scss";
import { useState } from "react";
import { sortBy } from "lodash";

export type Project = {
  authors: string
  imagesUrls: string[]
  description: string
  titleImageUrl: string
  title: string
  year:  number
}

function formatProjectData(project: any): Project {
  return {
    authors: project.authors.flatMap((d:any)=>d.text),
    imagesUrls: project.images.map((image: any) => image.image.url),
    description: project.description.flatMap((d:any)=>d.text),
    titleImageUrl: project.title_image.url,
    title: project.project_name.flatMap((d:any)=>d.text),
    year:  project.year
  }
}

function Home() {
  const [projectsRaw] = useAllPrismicDocumentsByType("project");
  const projects = sortBy(projectsRaw?.map((p) => formatProjectData(p.data)), 'year').reverse();

  const [selectedProject, setSelectedProject] = useState<null | Project>(null)

  return (
    <div className="home">
      <Link to="/cyclobrowsing" className="flying-igor">
        <div className="where-are-you">Ma dove sei frate?</div>
        <img src="./assets/igor.png" alt='igor' className="flying-igor-image"/>
      </Link>
      <div className="project-titles">
        {projects?.map((p) => (
          <img src={p.titleImageUrl} className="project-title" alt={p.title} onClick={()=>setSelectedProject(p)} key={p.title} />
        ))}
      </div>
      <div className="home-titles">
      {selectedProject && (
        <Carousel
        project={selectedProject}
        onClick={()=>setSelectedProject(null)}
        />
        )}
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
