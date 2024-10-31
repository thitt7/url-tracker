import { IpData } from "../types/DTO";

const getIpData = async (ip: string): Promise<IpData | null> => {
  
  let response;
  try {
    response = await fetch(`http://ip-api.com/json/${ip}?fields=continent,country,region,city,isp,org,mobile,proxy`);
    
    if (!response.ok) {
      console.error('Failed to fetch IP data:', response.statusText);
      return null;
    }
  } 
  catch (error) {
    console.error('Fetch error:', error);
    return null;
  }

  const data = await response.json();
  
  console.log('IP DATA: ', data);

  if (!data || !Object.entries(data).length) {
    return null;
  }

  const IpData: IpData = {
    continent: data.continent,
    country: data.country,
    region: data.region,
    city: data.city,
    isp: data.isp,
    org: data.org
  }
  return IpData;
}

export default getIpData;
