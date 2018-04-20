const Model = function() {

	this.getAllComics = function () {
    //alert("getAllDishes - searchTerm: "); // + data);
 
    const searchurl = 'type=' + searchType + "&query=" + inputData;
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?' + searchurl;
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)

  }


// you will also have to setup the referring domains on your marvel developer portal
var PRIV_KEY = "1a60651bb50c75bb1aa84ede4cdfd872bf409040";
var PUBLIC_KEY = "988fc225729038dfd5246cb095fcc5ec";

function getMarvelResponse() {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  // the api deals a lot in ids rather than just the strings you want to use
  var characterId = '1009718'; // wolverine                                                                             


  var url = 'http://gateway.marvel.com:80/v1/public/comics';

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    characters: characterId
    })
    .done(function(data) {
      // sort of a long dump you will need to sort through
      console.log(data);
    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err);
    });
};

var svar = getMarvelResponse();
alert(svar);





}


export const modelInstance = new Model();
