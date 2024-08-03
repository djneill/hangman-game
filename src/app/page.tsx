import Logo from "./components/Logo";
import HomeCard from "./components/HomeCard";
import PlayButton from "./components/PlayButton";
import HowToPlay from "./components/HowToPlay";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 py-8 relative">
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-8 sm:pt-12 md:pt-16">
        <Logo />
      </div>
      <div className="mt-24 sm:mt-32 md:mt-36">
        <HomeCard>
          <div className="flex flex-col justify-between items-center h-full py-12">
            <PlayButton />
            <div className="mt-auto">
              <HowToPlay />
            </div>
          </div>
        </HomeCard>
      </div>
    </div>
  );
}