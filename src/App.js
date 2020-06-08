import React, { Component } from 'react';
import './App.css';
import LoaderHome from './components/Loader/loader.component';
import { connect } from 'react-redux';
import { fetchDataAsync } from '../src/components/redux/actions/actions';
import { Switch, Route, Redirect } from 'react-router-dom';
import Country from "./components/countryData/country.component";
import Home from './pages/home.component';


class App extends Component {

  constructor() {
    super();

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }


  shouldComponentRender() {
    const { isFetching } = this.props;
    if (isFetching === false) {
      return false;
    }
    return true;
  }

  render() {

    if (!this.shouldComponentRender()) {
      return <LoaderHome />;
    }

    return (

      <div className="App">
        <Switch>
          <Route path='/country/:countryId' component={Country} />} />
              <Route exact path='/' component={Home} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </div>

    );
  }

}

const mapStateToProps = state => ({
  isFetching: state.country.isFetching
})

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchDataAsync()),
});




export default connect(mapStateToProps, mapDispatchToProps)(App);
