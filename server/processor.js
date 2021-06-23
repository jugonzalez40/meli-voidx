
const author = {
    name: 'Juan sebastián',
    lastname: 'González Rivera'
}
/**
 * Class that allows to transform the data from mercadolibre api to the api response
 * @class Processor
 */
class Processor {
    /**
     * Function that transform the response from the meliApi (Products list)
     * @param {JSON} meliResponse
     * @returns object
     */
    transformListRequest(meliResponse) {
        const categories = this.getCategories(meliResponse);
        const items = this.getItems(meliResponse);
        return {
            author,
            categories,
            items
        };
    }

    /**
     * Function that transform the response from the meliApi (single Product)
     * @param {JSON} meliResponse
     * @param {String} description
     * @returns object
     */
    transformDetailRequest(meliResponse, description) {
        const item = this.mapItem(meliResponse, description||'');
        return {
            author,
            item
        };
    }

    /**
     * Function that allows to get the categories list according to the response
     * @param {JSON} meliResponse
     * @returns Array<String>
     */
    getCategories(meliResponse){
        const categoryFilter = meliResponse.filters.find(filter => filter.id = 'category');
        if(!categoryFilter || !categoryFilter.values.length) {
            return [];
        }
        return categoryFilter.values[0].path_from_root.map(({name}) => name);
    }

    /**
     * Function that allows to get the required data from meliResponse
     * @param {JSON} meliResponse 
     * @returns Array
     */
    getItems(meliResponse) {
        const max = meliResponse.results < 4 ? meliResponse.results : 4;
        return meliResponse.results.slice(0, max).map(item => this.mapItem(item));
    }

    /**
     * Function that allows to map the meliResponse to the required data
     * @param {*} {id, title, condition, currency_id, price, thumbnail, sold_quantity, ...item}
     * @param {*} description
     * @returns
     * @memberof Processor
     */
    mapItem({id, title, condition, currency_id, price, thumbnail, 
        sold_quantity, seller_address, shipping}, description) {
        let mappedItem = ({
            id, title, condition, picture: thumbnail,
            free_shipping: shipping.free_shipping,
            location: seller_address.state.name,
            price: {
                currency: currency_id,
                amount: +(`${price}`.split('.')[0]),
                decimals: +(`${price}`.split('.')[1] || 0)
            }
        });

        return description ?
            {...mappedItem, ...{description, sold_quantity}} : mappedItem;
    }
}


module.exports = new Processor();