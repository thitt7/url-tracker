import { UpdateUrlDto } from "@Types/DTO";

async function updateUrl(updateUrl: UpdateUrlDto, id: string) {
    // console.log('inside updateurl fn...', JSON.stringify(updateUrl))
    // console.log(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/urls/${id}`)

    let res;

    try {
        res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/urls/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateUrl)
        });
        const response = await res.json()
        return res;
    } catch (error) {
        console.log(error)
    }

    return res;

  }

export default updateUrl;