const axios = require('axios').default;
const processor = require('./processor');

class MeliApi {
    async getProductsList(query) {
        try {
            const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query.replace(/ /g, '%20')}`;
            const result = await axios.get(url);
            return processor.transformListRequest(result.data);
        } catch (error) {
            console.log(`${error}`);
        }
    }

    async getProductDetail(id){
        try {
            const urls = [
                `https://api.mercadolibre.com/items/${id}`,
                `https://api.mercadolibre.com/items/${id}/description`
            ];
            const result = await axios.all(urls.map(url => axios.get(url)));
            return processor.transformDetailRequest(result[0].data, result[1].data.plain_text)
        } catch (error) {
            console.log(`${error}`);
        }
        
    }
}

module.exports = new MeliApi();