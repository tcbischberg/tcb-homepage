const Directions = () => {
  return (
    <iframe
      className="map block w-full"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.3628237348003!2d10.81495408603627!3d49.9015446972844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a23cf3bb07ded1%3A0x6687034603d1c289!2sTennis-Club%20Blau-Wei%C3%9F%20Bischberg%201980%20e.%20V.!5e0!3m2!1sen!2sde!4v1701529717482!5m2!1sen!2sde"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default Directions;
