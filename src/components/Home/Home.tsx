import BemVindo from "./BemVindo/bemVindo";
import Fade from "./Carousel/Fade";

const Home = () => {
  const carouselContainerStyle = {
    width: "600px",
    margin: "20px auto",
  };

  return (
    <div>
      <div style={carouselContainerStyle}>{/* <Fade /> */}</div>
      <BemVindo />
    </div>
  );
};
export default Home;
