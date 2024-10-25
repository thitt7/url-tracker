import CreateUrlForm from './components/home/createUrl'

export default function Home() {
    // const API_URL = process.env.NEXT_PUBLIC_API_URL;
    console.log('API URL', `${process.env.NEXT_PUBLIC_API_URL}/api/urls`)

    return (
        <main className="">
            <CreateUrlForm />
        </main>
    )
}
