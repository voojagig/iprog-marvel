const Model = function() {

	var CryptoJS = require("crypto-js");
	let observers = [];

	this.getComics = function(startsWithLetter) {
		//comics?titleStartsWith=A&orderBy=title&apiKey...
		var PRIV_KEY = '1a60651bb50c75bb1aa84ede4cdfd872bf409040';
		var PUBLIC_KEY = '988fc225729038dfd5246cb095fcc5ec';

		// you need a new ts every request                                                                                    
		var ts = new Date().getTime();
		var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
		  
		// the api deals a lot in ids rather than just the strings you want to use
		var titleStartsWith = 'titleStartsWith=' + startsWithLetter + '&orderBy=title&';                                                                           

		var url = 'https://gateway.marvel.com:443/v1/public/comics?';
		var finalurl = url + titleStartsWith + 'limit=20&' + 'ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;

		// example url: http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150 
		return fetch(finalurl)
		.then(processResponse)
		.catch(handleError)
	}

	this.getComic = function(comicId) {
		console.log("hejsan inne i getComic");
		//comics?titleStartsWith=A&orderBy=title&apiKey...
		var PRIV_KEY = '1a60651bb50c75bb1aa84ede4cdfd872bf409040';
		var PUBLIC_KEY = '988fc225729038dfd5246cb095fcc5ec';

		// you need a new ts every request                                                                                    
		var ts = new Date().getTime();
		var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();                                                                          

		var url = 'https://gateway.marvel.com:443/v1/public/comics/';
		var finalurl = url + comicId + '?' + 'ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;

		return fetch(finalurl)
		.then(processResponse)
		.catch(handleError)
	}


	this.getCharacters = function(startsWithLetter) {
		//comics?titleStartsWith=A&orderBy=title&apiKey...
		var PRIV_KEY = '1a60651bb50c75bb1aa84ede4cdfd872bf409040';
		var PUBLIC_KEY = '988fc225729038dfd5246cb095fcc5ec';

		// you need a new ts every request                                                                                    
		var ts = new Date().getTime();
		var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();                                                                   
		
		var nameStartsWith = 'nameStartsWith=' + startsWithLetter + '&orderBy=name&';                                                                           

		//we have trouble of getting the data from the API.
		var url = 'https://gateway.marvel.com:443/v1/public/characters?';
		var finalurl = url + nameStartsWith + 'limit=20&' + 'ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;

		return fetch(finalurl)
		.then(processResponse)
		.catch(handleError)
	}

	this.getCharacter = function(Id) {

		var PRIV_KEY = '1a60651bb50c75bb1aa84ede4cdfd872bf409040';
		var PUBLIC_KEY = '988fc225729038dfd5246cb095fcc5ec';

		// you need a new ts every request                                                                                    
		var ts = new Date().getTime();
		var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();                                                                         

		var url = 'https://gateway.marvel.com:443/v1/public/characters/';
		var finalurl = url + Id + '?' + 'ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;

		return fetch(finalurl)
		.then(processResponse)
		.catch(handleError)
	}

	this.getQuizCharacters = function() {
		//comics?titleStartsWith=A&orderBy=title&apiKey...
		var PRIV_KEY = '1a60651bb50c75bb1aa84ede4cdfd872bf409040';
		var PUBLIC_KEY = '988fc225729038dfd5246cb095fcc5ec';

		// you need a new ts every request                                                                                    
		var ts = new Date().getTime();
		var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();                                                                   
		

		//we have trouble of getting the data from the API.
		var url = 'https://gateway.marvel.com:443/v1/public/characters?';
		var finalurl = url   + 'limit=11&' + 'ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;

		return fetch(finalurl)
		.then(processResponse)
		.catch(handleError)
	}

	const processResponse = function(response) {
		if (response.ok) {
	      return response.json()
	    }
	    throw response;
	}

	const handleError = function (error) {
	    if (error.json) {
	      error.json().then(error => {
	        console.error('getsomething() API Error:', error.message || error)
	      })
	    } else {
	      console.error('getsomething() API Error:', error.message || error)
	    }
	    throw error;
  	}
	this.addObserver = function (observer) {
    	observers.push(observer);
  	};
  	this.removeObserver = function (observer) {
	  	observers = observers.filter(o => o !== observer);
	};
	const notifyObservers = function () {
		observers.forEach(o => o.update());
	};
  }


export const modelInstance = new Model();
