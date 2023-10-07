import Players from "./components/Players";
import Spinner from "./components/Spinner";

export default function Home() {
  return (
    <main className="bg-gray-900 flex min-h-screen xl:flex-row flex-col-reverse  min-w-screen items-center justify-between p-10 gap-5">
      <Players />
      <Spinner />
    </main>
  );
}
