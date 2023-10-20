import { Link } from "react-router-dom";
import { useAllPrismicDocumentsByType } from "@prismicio/react";
import { Carousel } from "./Carousel";

import "./style.scss";
import { useState } from "react";
import { sortBy } from "lodash";

export type Project = {
  authors: string;
  imagesUrls: string[];
  description: string;
  titleImageUrl: string;
  title: string;
  year: number;
};

function formatProjectData(project: any): Project {
  return {
    authors: project.authors.flatMap((d: any) => d.text),
    imagesUrls: project.images.map((image: any) => image.image.url),
    description: project.description.flatMap((d: any) => d.text),
    titleImageUrl: project.title_image.url,
    title: project.project_name.flatMap((d: any) => d.text),
    year: project.year,
  };
}

function Home() {
  const [projectsRaw] = useAllPrismicDocumentsByType("project");
  const projects = sortBy(
    projectsRaw?.map((p) => formatProjectData(p.data)),
    "year"
  ).reverse();

  const [selectedProject, setSelectedProject] = useState<null | Project>(null);

  return (
    <div className="home">
      <div className="container">
        <Link to="/cyclobrowsing" className="flying-igor">
          <div className="where-are-you">Ma dove sei frate?</div>
          <img
            src="./assets/igor.png"
            alt="igor"
            className="flying-igor-image"
          />
        </Link>
        <div className="project-titles">
          {projects?.map((p) => (
            <img
              src={p.titleImageUrl}
              className="project-title"
              alt={p.title}
              onClick={() => setSelectedProject(p)}
              key={p.title}
            />
          ))}
        </div>
        {selectedProject && (
          <div
            className="carousel-background"
            onClick={() => setSelectedProject(null)}
          />
        )}
        {selectedProject && (
          <Carousel
            project={selectedProject}
            onClick={() => setSelectedProject(null)}
          />
        )}

        <div className="home-titles" />
      </div>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-text-container">
            <div className="footer-text">
              <p>
                4KHD is a newly discovered resolution that will never be
                released. We exist in movement, while traveling, packing all we
                need in small bags under the saddle. Since 2019 we articulate
                projects around the topics of cycling, navigation and everything
                in between. We like to define ourself as the high resolution of
                low performances, because we better handle images instead of
                bikes.
                <br />
              </p>
              <p>
                We are based in between Milano and Rotterdam.
                <br />
              </p>
              <p>
                Reach us out for projects or collaborations<br></br>
                <a href="4khdcc@gmail.com">[MAIL]</a> 4khdcc@gmail.com
                <br></br>
                <a href="/www.instagram.com/4khd__/">[INSTAGRAM]</a> @4khd__
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
