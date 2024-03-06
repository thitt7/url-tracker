import { IpData } from "../types/DTO";

const getIpData = async (ip: string): Promise<IpData | null> => {
  const response = await fetch(`http://ip-api.com/json/${ip}?fields=continent,country,region,city,isp,org,mobile,proxy`)

  const data = await response.json();
  
  console.log('IP DATA: ', data)

  // console.log()
  if (!Object.entries(data).length) {
    console.log('ALLOOO')
    return null
  }

  const IpData: IpData = {
    Continent: data.continent,
    Country: data.country,
    Region: data.region,
    City: data.city,
    ISP: data.isp,
    // Coordinates?: string;
    Org: data.org
  }
  return IpData;
}

export default getIpData;