import Nav from "@/components/nav";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MaxWidthWrapper>
        <Nav
        // hamburgerDisplay={HamburgerDisplay.ALWAYS}
        // position={NavPosition.FIXED}
        />
        {children}
      </MaxWidthWrapper>
    </div>
  );
}
