import Carousel from "@/components/carousel";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import { MAX_SIZE } from "@/constants/max_width_wrapper";
import { NAV_POSITION } from "@/constants/nav";

export default function About() {
  return (
    <MaxWidthWrapper size={MAX_SIZE.XL3}>
      <Nav position={NAV_POSITION.STATIC} />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
      </div>
      <Carousel
        className="h-[500px]"
        images={["./wallpaper01.jpg", "./wallpaper02.jpg", "./wallpaper03.png"]}
      />
    </MaxWidthWrapper>
  );
}
