const getUrl = async (id: string) => {
    try {
      /* set API url for local dev vs in docker container */
      let URL: string;
      if (process.env.DOCKER_ENV) {URL = `http://${process.env.BACKEND}:${process.env.DOTNET_PORT}/api/urls/${id}`}
      else {URL = `http://localhost:${process.env.DOTNET_PORT}/api/urls/${id}`}
      
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error(`Failed to fetch URL: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching URL:', error);
      return null;
    }
  }

export default getUrl;