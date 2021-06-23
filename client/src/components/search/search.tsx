import React, { Component, SyntheticEvent } from "react";
import "./search.scss";
import brand from "../../assets/Logo_ML.png";
import searchIcon from "../../assets/ic_Search@2x.png.png.png";
import { useHistory, withRouter } from "react-router-dom";

type SearchProps = {
    match: any,
    location: any,
    history: any
};
/**
 * Search component in the header
 * @class Search
 * @extends {Component<SearchProps>}
 */
class Search extends Component<SearchProps> {
    constructor(props: SearchProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    /**
     * Hanlder that listen the search submit by click or enter an go to (/items?q=:query)
     * @param {SyntheticEvent} event
     * @memberof Search
     */
    handleSubmit(event: SyntheticEvent): void {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const query = data.get("search");
        this.props.history.push(`/items?q=${query}`);
    }

    goHome() {
        this.props.history.push('/');
    }

    render() {
        return (
            <>
                <nav className="meli-nav p-2">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-1 p-2 brand-container" onClick={this.goHome}>
                                <img src={brand} alt="brand icon" />
                            </div>
                            <div className="p-2 col-md-9">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="search-input">
                                        <input
                                            id="search"
                                            name="search"
                                            type="text"
                                            className="form-control"
                                            placeholder="Nunca dejes de buscar"
                                            aria-label="Busqueda de productos"
                                        />
                                        <button type="submit" className="search-button">
                                            <img src={searchIcon} alt="Icono de busqueda" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default withRouter(Search)