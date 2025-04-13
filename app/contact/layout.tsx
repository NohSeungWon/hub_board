import Nav from "@/components/nav";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav
      // hamburgerDisplay={HamburgerDisplay.ALWAYS}
      // position={NavPosition.FIXED}
      />
      {children}
    </div>
  );
}
