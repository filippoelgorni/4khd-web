import "./style.scss";

export function Carousel({
  titleImageUrl,
  title,
  images,
  description,
  credits,
  year,
}: {
    titleImageUrl: string,
    title: string,
    images: string[];
    description: string;
    credits: string;
    year: number;
}) {
  return <div className="carousel">
    <div className="carousel-content">
    {images.map(image=> <img src={image} className="carousel-image" alt="" />)}
    <div className='carousel-description'>{description}</div>
    <div  className="carousel-footer">
    <div >{title}</div>
    <div >{credits}</div>
    <div >{year}</div>
    </div>
    </div>
  </div>
}
