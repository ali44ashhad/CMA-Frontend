import Hero from "../components/home/Hero"; 
import HowItWorks from "../components/home/HowItWorks"; 
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA"; 
import Testimonials from "../components/home/Testimonials";
import AboutCompany from "../components/home/AboutCompany";
import Team from "../components/home/Team";

export default function Home() {
  return (
    <div> 
      <Hero />
      <AboutCompany/>
      <HowItWorks /> 
      <Team/>
      <Testimonials/>
      <FAQ />
      <CTA /> 
    </div>
  );
}
