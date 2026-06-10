const getUrl = async (id: string) => {
    const { NODE_ENV, BACKEND, DOTNET_PORT, NEXT_PUBLIC_API_URL } = process.env

    let url: string | null = null

    if (NODE_ENV === 'development') {
        console.log('USING DEVELOPMENT (internal Docker URL)')
        url = `http://${BACKEND}:${DOTNET_PORT}/api/urls/${id}`
    } else {
        console.log('USING STAGING/PRODUCTION (public URL)')
        url = `${NEXT_PUBLIC_API_URL}/api/urls/${id}`
    }

    if (!url) {
        console.error('Error fetching URL: missing API base configuration')
        return null
    }

    try {
        const res = await fetch(url, { cache: 'no-store' })

        console.log('RESPONSE STATUS:', res.status)

        if (res.status === 404 || res.status === 204) {
            return null
        }

        if (!res.ok) {
            throw new Error(`Failed to fetch URL: ${res.status}`)
        }

        const data = await res.json()
        console.log('RESPONSE DATA:', data)

        return data ?? null
    } catch (error) {
        console.error('Error fetching URL:', error)
        return null
    }
}

export default getUrl