import Players from "./components/Players";
import Spinner from "./components/Spinner";

export default function Home() {
  return (
    <main className="bg-gray-900 flex min-h-screen flex-row items-center justify-between gap">
      <Players />
      <Spinner />
    </main>
  );
}
