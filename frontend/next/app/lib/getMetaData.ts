import * as cheerio from 'cheerio';

const getMetaData = async (url: string) => {
  
  if (!url.startsWith('http:') && !url.startsWith('https:')) { url = 'https://' + url; }

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html)

    const meta = $('head :is(meta, title)').toArray();
    let metadataHtml = meta.map(element => $.html(element)).join('');
  
    console.log('-----HEAD------>', metadataHtml)

    const parseFavicons = (links: any[], url: string) => {

      const newLinks = links.map((el, i) => {
        // console.log('LINK HTML: ', $.html(el))
        let href = $(el).attr('href');
        if (href?.startsWith('/')) {
          href = url + href;
          $(el).attr('href', href)
        }
        return $.html(el);
      })
      return newLinks;
    }

    const links = parseFavicons($('head link[rel*="icon"]').toArray(), url).join('')
    metadataHtml += links;

    return metadataHtml;
  }
  catch (error) {
    console.error('error fetching metadata:', error);
    return null;
  }
}

export default getMetaData;