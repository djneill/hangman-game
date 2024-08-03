import Logo from "./components/Logo";
import HomeCard from "./components/HomeCard";
import PlayButton from "./components/PlayButton";
import HowToPlay from "./components/HowToPlay";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute top-20 sm:top-8 z-10 transform">
        <Logo />
      </div>
      <HomeCard>
        <div className="flex flex-col justify-center items-center">
          <PlayButton />
          <div className="flex w-full justify-center absolute bottom-8">
            <HowToPlay />
          </div>
        </div>
      </HomeCard>
    </div>
  );
}
