import { UpdateUrlDto } from '@Types/DTO'

async function updateUrl(updateUrl: UpdateUrlDto, id: string, docker: boolean) {
    let URL: string = `${process.env.NEXT_PUBLIC_API_URL}/api/urls/${id}`;

    let res

    try {
        res = await fetch(URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateUrl),
        })
        const response = await res.json()
        return res
    } catch (error) {
        console.log(error)
    }

    return res
}

export default updateUrl;