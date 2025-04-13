import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import { MAX_SIZE } from "@/constants/max_width_wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MaxWidthWrapper size={MAX_SIZE.XL3}>
        <Nav />
        {children}
      </MaxWidthWrapper>
    </div>
  );
}
