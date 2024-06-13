const getIP = async (): Promise<string> => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();

    console.log('fetched IP: ', data.ip)

    return data.ip;
}

export default getIP;