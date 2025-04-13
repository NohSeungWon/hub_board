import Carousel from "@/components/carousel";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import SidePopupButton from "@/components/side-popup-button";
import { DISPLAY_MODE } from "@/constants/crousel";
import { HAMBURGER_DISPLAY, NAV_POSITION } from "@/constants/nav";

export default async function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <Nav
          // hamburgerDisplay={HamburgerDisplay.ALWAYS}
          position={NAV_POSITION.FIXED}
        />
        <Carousel
          displayMode={DISPLAY_MODE.Dots}
          fullHeight={true}
          images={[
            "./wallpaper01.jpg",
            "./wallpaper02.jpg",
            "./wallpaper03.png",
          ]}
        />
        <SidePopupButton />
      </MaxWidthWrapper>
    </>
  );
}
