'use client'

import ThreeSlideshows from "@/components/threeSlideShow";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-2 flex-1 max-h-[calc(100vh-250px)] overflow-hidden">
      <ThreeSlideshows />
    </div>
  );
}
