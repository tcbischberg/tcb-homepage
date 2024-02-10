export default function Carousel(props: { images?: string[] }) {
  return (
    <div className="carousel" data-flickity='{"autoPlay": 4000}'>
      {props.images?.map((image, index) => (
        <div className="carousel-cell" key={index}>
          <img src={image} alt={`Image ${index}`} />
        </div>
      ))}
    </div>
  );
}
