import React, { Component } from 'react';
import './Comics.css';
import { modelInstance } from '../data/Model'

class Comics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      title: Comics,
    }
  }


  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this)

  }


  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      update: 'yess',
    });
  }

  render() {
    let comicsList = null;
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    //if(comic.thumbnail.path !="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"){

    switch (this.props.status) {
      case 'INITIAL':
        comicsList = <em>Choose a letter to see comics</em>
        break;
      case 'LOADING':
        comicsList = <em>Loading...</em>
        break;
      case 'LOADED':
        console.log(this.props.comics);
          comicsList = this.props.comics.map((comic) =>
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
        comicsList = <b>Failed to load data, please try again. Verify that you have network connection, please. </b>
        break;
        
    }
    return (
      <div className="Comics">
        <div className="container">
          <div className="row row-eq-height">
            {comicsList}
          </div>
        </div>
      </div>
    
    );
  }
}


export default Comics;
