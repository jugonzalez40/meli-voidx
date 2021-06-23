import React, { Component } from 'react';
import './detail.scss';
import { withRouter } from 'react-router-dom';
import FormattedCurrency, { CurrencyParts } from 'react-formatted-currency';
import {Helmet} from 'react-helmet';
type DetailState = {
    product: any
};

type DetailProps = {
    match: any,
    location: any,
    history: any
};

/**
 * View component that render the product detail (/items/:id)
 * @class ProductDetail
 * @extends {Component<DetailProps, DetailState>}
 */
class ProductDetail extends Component<DetailProps, DetailState> {
    state: DetailState = {
        product: null
    };

    /**
     * Function that returns the product by the id
     * @param {string} id
     * @returns {Promise<any>}
     */
    async getProduct(id: string): Promise<any> {
        try {
            const result = await fetch(`http://localhost:8084/api/items/${id}`);
            return result.json();
        } catch (error) {
            console.error(`${error}`);
            return null;
        }
    }

    /**
     * Once the component has been rendered, get the id param and request the product data 
     * @returns
     * @memberof ProductDetail
     */
    async componentDidMount() {
        const id = this.props.match.params.id;
        const response = await this.getProduct(id);
        if (!response || !response.item || !Object.keys(response.item).length) {
            alert('BROKEN PRODUCT ID 🤷‍♂💆‍♂️')
            return;
        }
        this.setState({ product: response.item });
    }

    render() {
        return (<>
            {this.state.product && 
                <div>
                    <Helmet>
                        {/* simple SEO of product detail, title and description */}
                        <title>{this.state.product.title}</title>
                        <meta name="description" content={this.state.product.description}/>
                    </Helmet>
                    <div className="detail-container">
                        {/* Image & Price */}
                        <div className="row">
                            <div className="col-lg-8 image-container">
                                <img src={this.state.product.picture} alt="Imagen producto" />
                            </div>
                            <div className="col-lg-4 title-container">
                                <div className="row row-cols-1">
                                    <div className="col-md-10">
                                        <p className="status">
                                            <span>{this.state.product.condition === 'new' ? 'Nuevo' : 'Usado'}</span>
                                            <span>{`${this.state.product?.sold_quantity} vendidos`}</span>
                                        </p>
                                    </div>
                                    <div className="col-md-10">  <p className="title">
                                        {this.state.product.title}
                                    </p></div>
                                    <div className="col-md-10">
                                        <p className="price">
                                            <FormattedCurrency
                                                amount={+`${this.state.product.price?.amount}.${this.state.product.price?.decimals}`}
                                                currency={this.state.product.price ? this.state.product.price.currency : 'USD'}
                                                locale="es-co"
                                                parts={[CurrencyParts.SYMBOL, CurrencyParts.NUMBER]}
                                                render={({ symbol, number }) => (<>{symbol}{number}</>)}
                                            />
                                        </p></div>
                                    <div className="col-md-10">
                                        <button className="shop-button">
                                            Comprar
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Description */}
                        <div className="row">
                            <div className="col-lg-8 description-container">
                                <span className="description-title">Descripción del producto</span>
                                <p className="description-text">
                                    {this.state.product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>)
    };
}

export default withRouter(ProductDetail);