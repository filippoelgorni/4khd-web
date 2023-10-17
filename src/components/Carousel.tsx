import { Project } from "./Home";
import { X } from "./X";
import "./style.scss";

export function Carousel({
    project,
    onClick,
}: {
    project: Project
    onClick: () => void
}) {
  return <div className="carousel">
        <div className="carousel-x" onClick={onClick}>
            <X/>
        </div>
    <div className="carousel-content">
        <img src={project.titleImageUrl} className="carousel-title" alt={project.title} />
        {project.imagesUrls.map((url, i)=> <img src={url} className="carousel-image" alt={`carousel-${i}`} key={url}/>)}
        <div className='carousel-description'>{project.description}</div>
        <div  className="carousel-footer">
            <div >{project.title}</div>
            <div className="carousel-footer-authors">{project.authors}</div>
            <div >{project.year}</div>
        </div>
    </div>
  </div>
}
