import CreateUrlForm from "./components/home/createUrl";

export default function Home() {
  const IS_DOCKER = process.env.DOCKER_ENV === 'true';
  console.log('DOCKER ENV INPAGE: ', process.env.DOCKER_ENV)

  return (
    <main className="">
      <CreateUrlForm docker={IS_DOCKER}/>
    </main>
  );
}
