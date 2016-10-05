var _ = require('underscore');
var $ = require('jquery');
var Handlebars = require('handlebars');

var charactersUrl = 'http://gateway.marvel.com/v1/public/characters';
var apiKey = 'ts=1&hash=21bd2e1b96821f4b508e0dd04ba254bd&apikey=809f574f31a7e23a17adc1f6a3631a58';

// Do an ajax request with jquery
$.ajax(charactersUrl + '?' + apiKey).then(start);

/*
Start the program
*/
function start(ajaxResult){
  console.log('AJAX request is now done');
  var characters = ajaxResult.data.results;
  displayCharacters(characters);
}

/*
Display some awesome comic characters
*/
function displayCharacters(characterList){
  console.log('displayCharacters');

  var source = $('#character-template').html();
  var characterTemplate = Handlebars.compile(source);

  _.each(characterList, function(character){
    var $characterHtml = $(characterTemplate(character));

    $characterHtml.find('.js-character-button').on('click', function(event){
      event.preventDefault();
      fetchComics(character);
    });

    $('.characters').append($characterHtml);
  });
}

/*
Another server request
*/
function fetchComics(character){
  var comicUrl = character.comics.collectionURI + '?' + apiKey;
  $.ajax(comicUrl).then(displayComics);
}

function displayComics(comicsList){
  console.log(comicsList);
  var $modal = $('.js-modal');
  var source = $('#comic-template').html();
  var template = Handlebars.compile(source);

  var context = {
    comics: comicsList.data.results,
    count: comicsList.data.count
  };

  $modal.find('.js-modal-content').html(template(context));

  $modal.addClass('is-active');
}

/*
Function Expression & Callback Review

*/
// var speed = 1;
//
// function accelerate(soundEffect){
//   speed += 1;
//   if(speed >= 1){
//     console.log(soundEffect);
//   }
// }
//
// function stop(){
//   speed = 0;
//   console.log(speed);
// }
//
// function car(callback){
//   callback('Vvvvrooooom');
// }
//
// var wheel = function(){
//   console.log("I'm round");
// };
//
//
// car(accelerate);
// car(function(){
//   speed = 0;
//   console.log(speed);
// });
