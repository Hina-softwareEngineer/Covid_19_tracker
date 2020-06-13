import React, { Component } from 'react';
import './App.css';
import LoaderHome from './components/Loader/loader.component';
import { connect } from 'react-redux';
import { fetchDataAsync } from './redux/actions/actions';
import { Switch, Route, Redirect } from 'react-router-dom';
import Country from "./pages/countryData/country.component";
import Home from './pages/Home/home.component';
import Logo from './Images/corona.png';
import Error from './components/ErrorPage/error.component';
import Chatbot from './components/Chatbot/chatbot.component';
import Footer from './components/Footer/footer.component';
import GithubCorner from 'react-github-corner';

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

    console.log = () => {

    }

    return (

      <div className="App">

        {
          this.props.errorMessage ?
            <Error /> :
            <div>
              <div className="Mainheader">

                <img className="logo" src={Logo} alt="Covid-19 Logo" />
                <h1 className="corona">CORONAVIRUS (COVID-19)</h1>
              </div>
              <Switch>
                <Route path='/country/:countryId' component={Country} />} />
              <Route exact path='/' component={Home} />
                <Route path="*" render={() => <Redirect to="/" />} />
              </Switch>

              <Chatbot eventHandler={this.clickEventHandler} />
            </div>
        }
        <Footer />
        <GithubCorner href="https://github.com/Hina-softwareEngineer/Covid_19_tracker" />
      </div>

    );
  }

}

const mapStateToProps = state => ({
  isFetching: state.country.isFetching,
  errorMessage: state.country.errorMessage,
})

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchDataAsync()),
});




export default connect(mapStateToProps, mapDispatchToProps)(App);
