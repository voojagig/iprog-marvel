import React, { Component } from 'react';
import './ShowCharacters.css';
import Navbar from '../Navbar/Navbar';
import Characters from '../Characters/Characters';


class ShowCharacters extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      title: ShowCharacters,
      Characters: '',
      type: '/characters'
    }
    this.loadData = this.loadData.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    this.setState({
      status:'LOADING'
    });

    this.loadData(e.letter);
  }

  loadData(startsWithLetter){
    this.props.model.getCharacters(startsWithLetter).then(Data => {
      const result = Data.data.results.filter((c) => {
        if( c.thumbnail.path !=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") return true
      });
      this.setState({
        status: 'LOADED',
        results: result,
      });

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

  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  render() {
    let letterButtons = null;
    let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    letterButtons = letters.map((letter) =>
      
      <li className="page-item" key={letter}><a className="page-link" onClick={()=>this.handleClick({letter})}>{letter}</a></li>

      )

    return (
      <div className="Characters">

        <Navbar location = {this.state.type}/>
        <div className="container">
          {/*Adding buttons for each letter, to browse characters*/}
          <nav aria-label="Alphabetical navigation">
            <ul className="pagination justify-content-end">
              {letterButtons}
            </ul>
          </nav>
            <div className="row row-eq-height">
             <Characters characters = {this.state.results} status = {this.state.status} />
            </div>
        </div>

      </div>
    
    );
  }
}


export default ShowCharacters;
