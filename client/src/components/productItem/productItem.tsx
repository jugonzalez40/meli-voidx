import React, { Component } from 'react';
import FormattedCurrency, { CurrencyParts } from 'react-formatted-currency';
import carIcon from '../../assets/ic_shipping@2x.png.png.png'
import './productItem.scss';
import { withRouter } from 'react-router-dom';

type ProductProps = {
    product: any,
    match: any,
    location: any,
    history: any
}

class ProductItem extends Component<ProductProps> {
    constructor(props: ProductProps) {
        super(props);
        this.gotoDetail = this.gotoDetail.bind(this);
    }

    /**
     * Function that go to product detail view by the id
     * Executes by click on the title or image
     * @memberof ProductItem
     */
    gotoDetail(): void {
        this.props.history.push(`/items/${this.props.product.id}`);
    }

    render() {
        return (
            <div >
                <div className="row item-container" >
                    <div className="img-container col-md-3" onClick={this.gotoDetail}>
                        <img src={this.props.product.picture} alt="Imagen" />
                    </div>

                    <div className="col-md-9">
                        <div className="row row-cols-1">
                            <div className="col-md-11 title-container">
                                <span className="item-title">
                                    <FormattedCurrency
                                        amount={+`${this.props.product.price.amount}.${this.props.product.price.decimals}`}
                                        currency={this.props.product.price.currency}
                                        locale="es-co"
                                        parts={[CurrencyParts.SYMBOL, CurrencyParts.NUMBER]}
                                        render={({ symbol, number }) => (<>{symbol}{number}</>)}
                                    />
                                </span>
                                {(this.props.product.free_shipping) && (<img alt="Envío gratis icono" className="item-img" src={carIcon} />)}
                                <span className="item-location">{this.props.product.location}</span>
                            </div>
                            <div className="col-md-8">
                                <p className="item-text" onClick={this.gotoDetail}>{this.props.product.title}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <hr className="divider" />
            </div>)
    }
}

export default withRouter(ProductItem);