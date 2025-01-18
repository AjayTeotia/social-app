import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Button>Click me</Button>

      <ThemeToggle />
    </>
  );
}