export default function Carousel(props: { images?: string[] }) {
  return (
    <>
      <div
        className="carousel flex flex-row snap-x overflow-y-auto bg-primary-content"
        data-flickity='{"imagesLoaded": true, "autoPlay": 4000, "fullscreen": true}'
      >
        {props.images?.map((image, index) => (
          <img
            className="block !rounded-none snap-start snap-normal max-w-[95%] !me-2 lg:max-h-[80vh]"
            src={image}
            alt={`Image ${index}`}
            key={index}
          />
        ))}
      </div>
      <style>
        {`.carousel.flickity-enabled {
            display: block;
          }

          .carousel.flickity-enabled img {
            max-width: 100%;
          }
        `}
      </style>
    </>
  );
}
