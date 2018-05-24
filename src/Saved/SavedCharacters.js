import React, { Component } from 'react';
import './Saved.css';



class SavedCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let heroes = null;
    console.log(this.props.status)
    console.log(this.props.result)

    switch(this.props.status){
      case 'INITIAL': 
          heroes = <p>Loading...</p>
      break;
      case 'LOADED': 

         console.log("i loaded: ", this.props.result)

         console.log();
          
         heroes = this.props.result.map((character) =>
                <div className="col-md-2 col-sm-3 col-xs-4 box" key={character.id}>


                      <div className="thumbnail">
                        <img src={character.thumbnail.path + "/portrait_fantastic." + character.thumbnail.extension} alt=""/>
                        <div className="caption">
                          <h4 className="name">{character.name}</h4>
                        </div>
                      </div>

                </div>
               );
      break;
      default:
        heroes = <p>You have not saved any characters yet!</p>
    }
    return (
	    <div className="Characters" key="characters">
          <h1>Your Favourite Heroes</h1>
          <div className="container-fluid">
          	{heroes}
          </div>
       	</div>
	);
  }
}

export default SavedCharacter;