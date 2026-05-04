const getUrl = async (id: string) => {
    // DOMAIN should be a bare hostname (e.g. staging.url-tracker.com). Strip optional scheme/trailing slash.
    const normalizedDomain = (process.env.DOMAIN ?? '')
        .replace(/^https?:\/\//i, '')
        .replace(/\/$/, '')
    const publicApiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')

    // In Docker Compose: call the API by service name on the internal network.
    // Otherwise (e.g. `next dev` on host): use NEXT_PUBLIC_API_URL, then DOMAIN.
    let url: string | null = null
    if (process.env.DOCKER_ENV === 'true' && process.env.BACKEND && process.env.DOTNET_PORT) {
        url = `http://${process.env.BACKEND}:${process.env.DOTNET_PORT}/api/urls/${id}`
    } else if (publicApiBase) {
        url = `${publicApiBase}/api/urls/${id}`
    } else if (normalizedDomain) {
        url = `https://${normalizedDomain}/api/urls/${id}`
    }

    if (!url) {
        console.error('Error fetching URL: missing API base configuration')
        return null
    }

    try {
        const res = await fetch(url, { cache: 'no-store' })
        if (res.status === 404 || res.status === 204) {
            return null
        }
        if (!res.ok) {
            throw new Error(`Failed to fetch URL: ${res.status}`)
        }

        const data = await res.json()
        return data ?? null
    } catch (error) {
        console.error('Error fetching URL:', error)
        return null
    }
}

export default getUrl
