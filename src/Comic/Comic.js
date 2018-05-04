import React, { Component } from 'react';
import './Comic.css';

class Comic extends Component {


 constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    //alert("inuti consructor");
    this.state = {
      status: 'INITIAL',
    };
  }

  componentWillUnmount() {
     this.props.model.removeObserver(this)
  }

  update() {
    this.setState({
      something: 'yes',
    })
  }


  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.addObserver(this);
    console.log("id" + this.props.id)
    this.props.model.getComic(this.props.id).then(comicResults => {   //this.state.search
      this.setState({
        status: 'LOADED',
        comic: comicResults.data.results[0],
      })


    }).catch(() => {
      this.setState({
        status: 'ERROR',
      })
    })
  }


  render() {
    console.log(this.state.status);
    let comicInfo = null;

    switch (this.state.status) {
      case 'INITIAL':
        comicInfo = <em>Loading...</em>
        break;
      case 'LOADED':
      	comicInfo = 
      	<div>
      		<h2>{this.state.comic.title}</h2>
      		<img src={this.state.comic.thumbnail.path + "/portrait_fantastic." + this.state.comic.thumbnail.extension} alt=""/>

      	</div>
      	break;
      default:
      	comicInfo = <s>Please check your network.</s>
        break;
   	};

   	return (
   		<div className="jumbotron">
		{comicInfo}
		</div>
   		)
    };
  }


export default Comic;