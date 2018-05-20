import React, { Component } from 'react';
import './Welcome.css';
//import Navbar from '../Navbar/Navbar';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: 'MarvelQuiz',
        type: '/',
        img: '',
        showImg: false,


    };
  }
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.addObserver(this)

    let img = [];
    this.props.model.getCharacter('1017305').then(SpiderMan => {
      img.push({image: SpiderMan.data.results[0]});
      this.props.model.getCharacter('1009351').then(Hulk => {
        img.push({image: Hulk.data.results[0]});
        this.props.model.getCharacter('1017302').then(Thor => {
          img.push({image: Thor.data.results[0]});
          this.props.model.getCharacter('1017104').then(IronMan => {
            img.push({image: IronMan.data.results[0]});

            this.setState({ 
                img: img,
                showImg: true,
            });
          });
        });
      });
    });
     

  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  
  render() {
    let imgList = null;

     switch (this.state.showImg) {
      case false:
        break;

      default: 
          imgList = this.state.img.map((data) =>
            <div className="col-xs-3" key={data.image.id}>
              <img src={data.image.thumbnail.path + "/portrait_fantastic." + data.image.thumbnail.extension} className="image" alt=""/>
            </div>
          );
        }
    return (
      <div className="Welcome">
        {/*<Navbar location = {this.state.type}/>*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <div className="row">
                {imgList}
              </div>
            </div>
    
            <div className="col-sm-6 col-xs-12">
              <p>
              MARVEL Welcome to our Marvel Quiz, to the right you can log in or create an account to save your progress in the game. 
              <br/>In the menu above you can start a quiz or browse between Marvels comics and characters to find fun info about them. Enjoy! 
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;