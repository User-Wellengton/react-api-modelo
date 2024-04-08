import Fade from "./Carousel/Fade";

const Home = () => {
  const carouselContainerStyle = {
    width: "600px",
    margin: "20px auto",
  };

  return (
    <div>
      <div style={carouselContainerStyle}>
        <Fade />
      </div>
      <h1>Primeira página</h1>
    </div>
  );
};
export default Home;
