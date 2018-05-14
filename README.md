Interaction Programing - Project assignment - HTML-Javascript-react
=================================================

This files is our start of our projekt: Marvel heroes. the purpose of the site is to look up and read about comics and characters from Marvel we have also plan to have a quiz about Marvels characters. How the quiz will be is not completely decided yet but an example of one type of question is you get a name of a character(ex. superhero-name) or their "private person" name and there are multiple pictures of different characters. you then get to pick the picture that shows the stated name.  

The website will also have the opportunity to register for an account where you can save your game highscores and save your cHaracters example your favorite superheroes.

_______
Set up
_______
Download the used font: Benton Sans Extra Comp Black here: 
http://fontsgeek.com/fonts/BentonSans-ExtraComp-Black-Regular/download

What's in the project
-----

Every js (javascript) file have an attached css file that lies in the same folder as the js-file.

* [public/index.html]contains ex bootstraps so that it works for all the other pages. The index.css will be used for styles that we want all the html-files to have. 
* [index.js] only pass us on to app.
* [src/App.js] this file sets the right Route path for the diffrent files. It is like the overwatch of all the other js files. It also contains the header. 
* [src/data/Model.js]- contains the model code. The file contains the model(the data fetched from API and the one we are creating in it). It also contains methods to get/change/set the data we need. right now it only contains the API call to Marvels api but it doesn´t work at the moment. We are planning to add the log in function here and the users username/passwords will probably be  hashed and "unhashed" here. 
* [src/Welcome/Welcome.js] Welcome.js is the starting place for the site. There is now only a short text about the website but is planned to have some pictures and a more intuitive description to help the user get started. 
* [src/Navbar/Navbar.js] contains the code for the menu in the top of the website. For now only the tree buttons on the left work. but all the other buttons are going to work when the project is done. This file is recurrent in many of the other files so it is "called on" when/where it is needed. 
* [src/Comics/Comics.js]contains only a button for testing the API-calls that is done in the model. Unfortunately it doesn´t work at the moment. Later this file will display all the Comics that are fetched from the API, the display will be with a picture and title of each comic. You should be able to click on a comics picture to se more information about it. 
* [src/Characters/Characters.js] is simular to Comics.js but this will display the characters instead. You can click on a character to learn more about it. 
------
Not created yet:
* [src/Quiz/Quiz.js] here will the quiz be done. 
* [src/Character/Character.js] you come here when you click one characters picture in Characters.js. So it is showing more information about that character. 
* [src/Comic/Comic.js] you come here when you click one comic picture in Comics.js. So it shows more information about that comit. 