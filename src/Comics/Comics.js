import React, { Component } from 'react';
import './Comics.css';
import Navbar from '../Navbar/Navbar';

class Comics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      title: Comics,
    }
    this.loadData = this.loadData.bind(this);

  }


  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  loadData(){
    this.props.model.getComics().then(Data => {
      const result = Data.data.results.filter((c) => {
        if( c.thumbnail.path !="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") return true
      });
      this.setState({
        status: 'LOADED',
        results: result,
      });
      console.log(this.state.status)

    }).catch(() => {
      this.setState({
        status: 'ERROR'
      });

    });
  }
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.addObserver(this)
    this.loadData();

  }


  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.loadData();
  }

  render() {
    let comics = null;
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    //if(comic.thumbnail.path !="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"){

    switch (this.state.status) {
      case 'INITIAL':
        comics = <em>Loading...</em>
        break;
      case 'LOADED':
          comics = this.state.results.map((comic) =>
                <div className="col-md-3 col-sm-4" key={comic.id}>
                    <div className="thumbnail">
                      <img src={comic.thumbnail.path + "/portrait_fantastic." + comic.thumbnail.extension} alt=""/>
                      <div className="caption">
                        <h4>{comic.title}</h4>
                      </div>
                    </div>
                </div>
              );

          break;
      default:
        comics = <b>Failed to load data, please try again. Verify that you have network connection, please. </b>
        break;
        
    }
    return (
      <div className="Comics">
        <Navbar/>
        <h3>Comics</h3>
        <button onClick={this.handleClick}>Hämta data</button>
        <div className="container">
          <div className="row row-eq-height">
            {comics}
          </div>
        </div>
      </div>
    
    );
  }
}


export default Comics;
