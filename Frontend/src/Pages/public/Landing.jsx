import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Services from "../../components/Services";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";

function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Landing;
