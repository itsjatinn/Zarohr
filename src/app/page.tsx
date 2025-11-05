import Hero from "../component/Hero";
import FeatureGrid from "../component/FeatureGrid";


export default function Page() {
  return (
    <>
      <Hero />
      <section className="max-w-9xl mx-auto">
        <FeatureGrid />
        
      </section>
    </>
  );
}
