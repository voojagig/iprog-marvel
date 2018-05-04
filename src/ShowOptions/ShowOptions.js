import React, { Component } from 'react';
import './ShowOptions.css';
import Navbar from '../Navbar/Navbar';
import Comics from '../Comics/Comics';


class ShowOptions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      title: ShowOptions,
      comics: '',
    }
    this.loadData = this.loadData.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    this.setState({
      status:'LOADING'
    });

    //let value = e.target.id;
    console.log(e);
    this.loadData(e.letter);
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  loadData(startsWithLetter){
    this.props.model.getComics(startsWithLetter).then(Data => {
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
    //this.loadData('A');

  }


  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    //this.loadData();
  }

  render() {
    let letterButtons = null;
    let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    letterButtons = letters.map((letter) =>
      //<button className="btn btn-lg" id={letter} onClick={this.handleClick}>{letter}</button>
      <li class="page-item"><a class="page-link" href="#" onClick={()=>this.handleClick({letter})}>{letter}</a></li>

      )

    return (
      <div className="Comics">
        <Navbar/>
        <h3>Comics</h3>

        <nav aria-label="...">
          <ul class="pagination pagination-lg">
            {letterButtons}

           {/* <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#" onClick={()=>this.handleClick('A')}>A</a></li>*/}
          </ul>
        </nav>


        
        <div className="container">
          <div className="row row-eq-height">
           <Comics comics = {this.state.results} status = {this.state.status} />
          </div>
        </div>
      </div>
    
    );
  }
}


export default ShowOptions;
