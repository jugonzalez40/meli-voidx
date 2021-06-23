import React, { Component } from 'react';
import './list.scss';
import ProductItem from '../../components/productItem/productItem';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

type ListState = {
    products: Array<any>,
    categories: Array<any>,
    query: string
}

type ListProps = {
    match: any,
    location: any,
    history: any,
    onFetch: Function,
}

/**
 * View component that render the search result in list
 * @class ProductsList
 * @extends {Component<ListProps, ListState>}
 */
class ProductsList extends Component<ListProps, ListState> {

    constructor(props: ListProps) {
        super(props)
        this.handleQueryParam = this.handleQueryParam.bind(this);
    }

    state: ListState = {
        products: [],
        categories: [],
        query: ''
    };

    /**
     * Function that returns the search result from the api
     * @param {string} query
     * @returns {Promise<any>}
     * @memberof ProductsList
     */
    async getProducts(query: string): Promise<any> {
        try {
            const result = await fetch(`http://localhost:8084/api/items?q=${query.replace(/ /g, '%20')}`);
            return result.json();
        } catch (error) {
            console.error(`${error}`);
            return null;
        }
    }

    /**
     * In the first render get the query search (/items?q=:query), 
     */
    componentDidMount() {
        this.handleQueryParam();
    }

    /**
     * When there is a search inside list view the prop this.prop.location.search change
     */
    componentWillReceiveProps() {
        this.handleQueryParam();
    }

    /**
     * Function that get the query(q) from the url and set the products state.
     * To avoid the infinite looping between prop onFetch and location.search 
     *  set the state of the query
     * @returns
     */
    async handleQueryParam(): Promise<void> {
        const query = new URLSearchParams(window.location.search).get('q') || '';
        if (this.state.query === query) return;
        const response = await this.getProducts(query as string);
        if (!response || !response.items || !response.categories) {
            alert('BROKEN SERVER OR MALFORMED RESPONSE 🤷‍♂💆‍♂️')
            return;
        }
        this.setState({
            products: response.items,
            categories: response.categories,
            query
        })
        this.props.onFetch(response.categories);
    }

    render() {
        return (<>
            {!!this.state.categories.length && <Helmet>
                <title>{`Mercadolibre - ${this.state.categories[this.state.categories.length - 1]}`}</title>
                <meta name="description" content={this.state.categories.join(', ')} />
            </Helmet>}

            <div className="list-container" >
                {(this.state.products).map((product, index) =>
                    (<ProductItem key={index} product={product} />))}
            </div>

        </>)
    };
}

export default withRouter(ProductsList);