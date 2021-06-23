import "./Main.scss";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Search from "../../components/search/search";
import ProductsList from "../list/list";
import Home from '../home/home';
import ProductDetail from '../detail/detail';
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

type MainState = {
  categories: Array<string>
}
export default class Main extends Component<{}, MainState> {
  constructor(props: any) {
    super(props);
    this.fetchHanlder = this.fetchHanlder.bind(this);
  }

  state: MainState = {
    categories: []
  }

  /**
   * Set the categories state once the list view has the fetch response
   * @param {Array<string>} categories
   * @memberof Main
   */
  fetchHanlder(categories: Array<string>) {
    this.setState({ categories })
  }

  render() {
    return (
      <Router>
        <header>
          <Search></Search>
        </header>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <Breadcrumb categories={this.state.categories} />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                {/* exact prop for difference between list and detail view */}
                <Route exact path="/items">
                  <ProductsList onFetch={this.fetchHanlder} />
                </Route>

                <Route path="/items/:id">
                  <ProductDetail />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
