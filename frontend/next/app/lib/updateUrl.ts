import { UpdateUrlDto } from "@Types/DTO";

async function updateUrl(updateUrl: UpdateUrlDto, id: string, docker: boolean) {
    let URL: string;
    // if (docker) {URL = `http://${process.env.BACKEND}:${process.env.DOTNET_PORT}/api/urls/${id}`}
    // else {URL = `http://localhost:${process.env.DOTNET_PORT}/api/urls/${id}`}
    URL = `http://localhost:8001/api/urls/${id}`

    let res;

    try {
        res = await fetch(URL, {
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