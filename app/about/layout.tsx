import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import { MAX_SIZE } from "@/constants/max_width_wrapper";
import { NAV_POSITION } from "@/constants/nav";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MaxWidthWrapper size={MAX_SIZE.XL3}>
        <Nav position={NAV_POSITION.STATIC} />

        {children}
      </MaxWidthWrapper>
    </div>
  );
}
