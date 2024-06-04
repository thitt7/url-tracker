import CreateUrlForm from "./components/home/createUrl";

export default function Home() {
  const IS_DOCKER = process.env.DOCKER_ENV === 'true';

  return (
    <main className="">
      <CreateUrlForm />
    </main>
  );
}
