  render() {
    let dishesList = null;
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.props.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>
        break;
      case 'LOADED':
        dishesList = this.props.dishes.map((dish) =>

          <Link to={"/showdish/" + dish.id} key={dish.id}>

            <div className="col-md-3 col-sm-4">
              <div className="thumbnail">
                <img src={`https://spoonacular.com/recipeImages/${dish.image}`} alt=""/> 
                <div className="caption">
                  <h3>{dish.title}</h3>
                </div>
              </div>
            </div>
          </Link>
          
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
        <h3>Dishes</h3>
        <ul>
          {dishesList}
        </ul>
      </div>
    );
  }