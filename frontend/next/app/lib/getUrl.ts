const getUrl = async (id: string) => {
    try {
        /* set API url for local dev, docker container, k8s */
        let URL: string
        if (!process.env.KUBERNETES_SERVICE_HOST) {
            console.log('not in k8s')
            URL = `http://${process.env.BACKEND}:${process.env.DOTNET_PORT}/api/urls/${id}`
        } else if (process.env.KUBERNETES_SERVICE_HOST !== undefined) {
            console.log('in k8s')
            URL = `http://dotnet-clusterip:${process.env.DOTNET_PORT}/api/urls/${id}`
        } else {
            console.log('in docker')
            URL = `https://api.${process.env.NEXT_PUBLIC_DOMAIN}/api/urls/${id}`
        }

        const res = await fetch(URL)
        if (!res.ok) {
            throw new Error(`Failed to fetch URL: ${res.status}`)
        }
        return await res.json()
    } catch (error) {
        console.error('Error fetching URL:', error)
        return null
    }
}

export default getUrl
