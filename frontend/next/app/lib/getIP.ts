const getIP = async (): Promise<string> => {
    const response = await fetch('https://api.ipify.org?format=json');
    const IP = await response.json();

    console.log('fetched IP: ', IP)

    return IP;

}

export default getIP;