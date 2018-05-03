import React, { Component } from 'react';
import './Comics.css';
import Navbar from '../Navbar/Navbar';

class Comics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      title: Comics,
      results: [],
    }
    this.loadData = this.loadData.bind(this);

  }


  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  loadData(){
         console.log("inne i loadData1");

    this.props.model.getComics().then(Data => {
     console.log("inne i loadData");

      this.setState({
        status: 'LOADED',
        results: Data.data.results,
      });

    }).catch(() => {
      this.setState({
        status: 'ERROR'
      });

    });
  }
  componentDidMount = () => {
     console.log("inne i componentDidmount");
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.addObserver(this)
    this.loadData();

    console.log(this.state.status);


  }


  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    console.log("inne i update");
    this.loadData();
  }

  render() {
        console.log(this.state.status);

          let comics = null;
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        comics = <em>Loading...</em>
        break;
      case 'LOADED':
          console.log(this.state.status);
comics =
        <div className="row">
            <div className="col-sm-8 col-xs-12 page-header">
              <h2 id="headlineDish">{this.state.results[1].title}</h2>
            </div>
            <div className="col-sm-8 col-xs-12">
              <img src={this.state.results[1].thumbnail.path + "." + this.state.results[1].thumbnail.extension} alt=""/>
            </div>
          </div>
          break;
        }
    return (
      <div className="Comics">
        <Navbar/>
        <h3>Comics</h3>
        <button onClick={this.handleClick}>Hämta data</button>
        <div>{comics}</div>
      </div>
    );
  }
}


export default Comics;
