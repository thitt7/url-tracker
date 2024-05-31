import { IpData } from "../types/DTO";

const getIpData = async (ip: string): Promise<IpData | null> => {

  const newResponse = await fetch('https://api.ipify.org?format=json');
  const alternateIP = await newResponse.json();
  
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=continent,country,region,city,isp,org,mobile,proxy`)

  const data = await response.json();
  
  console.log('IP ADDRESS: ', ip)
  console.log('ALTERNATE IP: ', alternateIP)
  console.log('IP DATA: ', data)

  if (!Object.entries(data).length) {
    return null;
  }

  const IpData: IpData = {
    continent: data.continent,
    country: data.country,
    region: data.region,
    city: data.city,
    isp: data.isp,
    // Coordinates?: string;
    org: data.org
  }
  return IpData;
}

export default getIpData;