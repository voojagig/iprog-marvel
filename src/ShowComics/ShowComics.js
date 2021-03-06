import React, { Component } from 'react';
import './ShowComics.css';
//import Navbar from '../Navbar/Navbar';
import Comics from '../Comics/Comics';


class ShowComics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      title: ShowComics,
      comics: '',
      type: '/comics'
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

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  loadData(startsWithLetter){
    this.props.model.getComics(startsWithLetter).then(Data => {
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
    //this.loadData('A');

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
      <div className="Comics">

        {/*<Navbar location = {this.state.type}/>*/}
        <div className="container">
          {/*Adding buttons for each letter, to browse comics*/}
          <nav aria-label="Alphabetical navigation">
            <ul className="pagination justify-content-end">
              {letterButtons}
            </ul>
          </nav>
          <div className="row row-eq-height">
           <Comics comics = {this.state.results} status = {this.state.status} />
          </div>
        </div>
      </div>
      

    
    );
  }
}


export default ShowComics;
