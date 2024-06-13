const getIP = async (): Promise<string> => {
    const response = await fetch('https://api.ipify.org?format=json');
    const {ip} = await response.json();

    console.log('fetched IP: ', ip)

    return ip;
}

export default getIP;