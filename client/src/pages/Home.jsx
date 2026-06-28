import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import FeaturedDoctors from "../components/FeaturedDoctors";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <FeaturedDoctors />
      <Footer />
    </>
  );
}

export default Home;