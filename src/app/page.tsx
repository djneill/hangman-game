'use client'
import { useRouter } from 'next/navigation';
import Logo from "./components/Logo";
import HomeCard from "./components/HomeCard";
import PlayButton from "./components/PlayButton";
import HowToPlay from "./components/HowToPlay";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handlePlayClick = () => {
    localStorage.removeItem('hangmanGameState');
    router.push('/category')
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="relative w-full max-w-[592px] flex flex-col items-center">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Logo />
        </div>
        <HomeCard>
          <div className="flex flex-col justify-center items-center h-full py-12">
            <PlayButton onClick={handlePlayClick} />
            <div className="flex w-full justify-center absolute bottom-8">
              <Link href={'/howToPlay'}>
                <HowToPlay />
              </Link>
            </div>
          </div>
        </HomeCard>
      </div>
    </div>
  )
}