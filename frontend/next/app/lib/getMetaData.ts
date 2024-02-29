import * as cheerio from 'cheerio';

const getMetaData = async (url: string) => {
    try {
        console.log('URL STRING: ', url)
        const response = await fetch('https://sachse.city');
        const html = await response.text();
    
        const $ = cheerio.load(html)
    
        const head = $('head').html();
    
        return head;
      } 
      catch (error) {
        console.error('error fetching metadata:', error);
        return null;
      }
}

export default getMetaData;