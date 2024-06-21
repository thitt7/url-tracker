import CreateUrlForm from "./components/home/createUrl";

export default function Home() {
  const IS_DOCKER = process.env.DOCKER_ENV === 'true';
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log('inside home component, printing env vars out..')
  console.log('API URL IN SERVER COMPONENT: ', process.env.NEXT_PUBLIC_API_URL)
  console.log('DOCKER ENV VAR IN SERVER COMPONENT: ', process.env.DOCKER_ENV)


  return (
    <main className="">
      <CreateUrlForm />
    </main>
  );
}
