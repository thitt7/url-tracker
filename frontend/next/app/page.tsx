import CreateUrlForm from './components/home/createUrl'

export default function Home() {
    // const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log('API URL', `${process.env.NEXT_PUBLIC_API_URL}/api/urls`);
    console.log('DB_HOST', `${process.env.DB_HOST}`);

    return (
        <main className="">
            <CreateUrlForm />
        </main>
    )
}
