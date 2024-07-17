import CreateUrlForm from './components/home/createUrl'

export default function Home() {
    // const IS_DOCKER = process.env.DOCKER_ENV === 'true';
    // const API_URL = process.env.NEXT_PUBLIC_API_URL;

    return (
        <main className="">
            <CreateUrlForm />
        </main>
    )
}
