import Hero from "../components/home/Hero"; 
import HowItWorks from "../components/home/HowItWorks"; 
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";  
import AboutCompany from "../components/home/AboutCompany";
import Team from "../components/home/Team";

export default function Home() {
  return (
    <div> 
      <Hero />
      <HowItWorks /> 
      <AboutCompany/>
      <Team/> 
      <FAQ />
      <CTA /> 
    </div>
  );
}
