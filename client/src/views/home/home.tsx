import React, { Component } from 'react';
import './home.scss';
import {Helmet} from 'react-helmet';

/**
 * Home cmponent view (/)
 * @export
 * @class Home
 * @extends {Component<{}>}
 */
export default class Home extends Component<{}> {
    render() {
        return (<>
            <Helmet>
                <title>{ `Mercadolibre `}</title>
                <meta name="description" content="Test description SEO" />
            </Helmet>
            <div className="home-container" >
                <h3>Prueba Mercadolibre</h3>
                <p>Juan Sebastián González Rivera</p>
            </div>

        </>)
    };
}