import Nav from "@/components/nav";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
