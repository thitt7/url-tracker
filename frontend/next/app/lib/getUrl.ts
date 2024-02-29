const getUrl = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8001/api/urls/${id}`);
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