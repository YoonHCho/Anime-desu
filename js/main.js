var random = [];
var onPage = [];
var $malId;

var $animeRandom = document.querySelector('.anime-random');
$animeRandom.addEventListener('click', loadview);

// Feature 1 START
var $randomDivEl = document.querySelector('.random');
var $genreDivEl = document.querySelector('.genre');

var $xhrRandom = new XMLHttpRequest();
var randomPage = Math.floor(Math.random() * 934 + 1);
$xhrRandom.open('GET', 'https://api.jikan.moe/v4/anime?sfw=true&page=' + randomPage);
$xhrRandom.responseType = 'json';
$xhrRandom.addEventListener('load', loading);

function loading(event) {
  onPage = [];
  random.push($xhrRandom.response);
  for (var i = 0; i < 3; i++) {
    var randomObj = {};
    var randomData = parseInt(Math.floor(Math.random() * random[0].data.length));
    if (random[0].data[randomData].images.jpg.large_image_url) {
      randomObj.imgUrl = random[0].data[randomData].images.jpg.large_image_url;
    } else {
      randomObj.imgUrl = 'images/placeholder-image-square.jpg';
    }
    if (random[0].data[randomData].title_english) {
      randomObj.title = random[0].data[randomData].title_english;
    } else {
      randomObj.title = random[0].data[randomData].title;
    }
    if (random[0].data[randomData].synopsis) {
      randomObj.synopsis = random[0].data[randomData].synopsis;
    } else {
      randomObj.synopsis = 'No synopsis information has been added to this title. Update for synopsis coming soon.';
    }

    randomObj.malId = random[0].data[randomData].mal_id;
    // var favid = random[0].data[randomData].mal_id;
    $malId = random[0].data[randomData].mal_id;
    // console.log('random[0].data[randomData].mal_id: ', random[0].data[randomData].mal_id);
    // console.log('favid: ', favid);
    // console.log('global $malID', $malId);
    onPage.push(randomObj);

    // data.favorite.push() random[0].
    $randomDivEl.appendChild(renderLists(randomObj));
    random[0].data.splice(randomData, 1);
  }
}

function renderLists(obj) {
  var $mainDiv = document.createElement('div');
  $mainDiv.className = 'col-50 padding-0-7-20';
  var $wrapperDiv = document.createElement('div');
  $wrapperDiv.className = 'row wrapper col-full col-50 justify-center align-center padding-10';
  var $imgDiv = document.createElement('div');
  $imgDiv.className = 'col-full col-50 shadow align-self-start';
  var $img = document.createElement('img');
  $img.setAttribute('src', obj.imgUrl);
  var $infoColDiv = document.createElement('div');
  $infoColDiv.className = 'col-full col-50 info-col-padding align-self-start height-100';
  var $rowDiv = document.createElement('div');
  $rowDiv.className = 'row height-100';
  var $titleHeader = document.createElement('h4');
  $titleHeader.className = 'title-font';
  $titleHeader.textContent = obj.title;
  var $paragraph = document.createElement('p');
  $paragraph.className = 'height-68 info-para overflow-ellipsis';
  $paragraph.textContent = obj.synopsis;

  // FOR BUTTON
  var $buttonDiv = document.createElement('div');
  $buttonDiv.className = 'col-full text-center padding-t20-button';
  var $button = document.createElement('button');
  $button.className = 'fav-btn-false';
  $button.setAttribute('data-malId', $malId);
  $button.textContent = 'Add to Favorite';

  $buttonDiv.appendChild($button);

  // END OF BUTTON
  $rowDiv.appendChild($buttonDiv);
  $rowDiv.appendChild($titleHeader);
  $rowDiv.appendChild($paragraph);
  $infoColDiv.appendChild($rowDiv);
  $imgDiv.appendChild($img);
  $wrapperDiv.appendChild($imgDiv);
  $wrapperDiv.appendChild($infoColDiv);
  $mainDiv.appendChild($wrapperDiv);

  return $mainDiv;

}
$xhrRandom.send();
// end of feature 1

// feature 2
var $viewRandom = document.querySelector('.random-view');
var $viewRecommend = document.querySelector('.genre-view');
window.addEventListener('DOMContentLoaded', loadview);

function loadview(event) {
  if (data.view === 'random-view') {
    $viewRandom.className = 'random-view';
    $viewRecommend.className = 'genre-view hidden';
  } else if (data.view === 'genre-view') {
    $viewRandom.className = 'random-view hidden';
    $viewRecommend.className = 'genre-view';
  }
}

// feature 2 to render genre list
var $selectGenre = document.getElementById('genre');
$selectGenre.addEventListener('change', selectGenre);

function selectGenre(event) {
  $genreDivEl.replaceChildren();
  var $genreID;
  var $genreHeader = document.querySelector('.genre-text');
  if (event.target.value === 'sliceOfLife') {
    $genreHeader.textContent = 'Results for Genre: Slice of Life';
  } else if (event.target.value === 'sciFi') {
    $genreHeader.textContent = 'Results for Genre: Sci-Fi';
  } else {
    $genreHeader.textContent = 'Results for Genre: ' + event.target.value[0].toUpperCase() + event.target.value.substring(1);
  }

  for (var prop in data.genres[0]) {
    if (prop === event.target.value) {
      $genreID = data.genres[0][prop];
      data.view = 'genre-view';
      loadview(data.view);
      break;
    }
  }

  var $xhrGenre = new XMLHttpRequest();
  $xhrGenre.open('GET', 'https://api.jikan.moe/v4/anime?genres=' + $genreID + '&page=1&sfw=true');
  $xhrGenre.responseType = 'json';
  $xhrGenre.addEventListener('load', function () {
    getGenre($xhrGenre.response);
  });
  $xhrGenre.send();
}

function getGenre(genre) {
  onPage = [];
  for (var i = 0; i < 12; i++) {
    var genreObj = {};
    if (genre.data[i].images.jpg.large_image_url) {
      genreObj.imgUrl = genre.data[i].images.jpg.large_image_url;
    } else {
      genreObj.imgUrl = 'images/placeholder-image-square.jpg';
    }
    if (genre.data[i].title_english) {
      genreObj.title = genre.data[i].title_english;
    } else {
      genreObj.title = genre.data[i].title;
    }
    if (genre.data[i].synopsis) {
      genreObj.synopsis = genre.data[i].synopsis;
    } else {
      genreObj.synopsis = 'No synopsis information has been added to this title. Update for synopsis coming soon.';
    }

    genreObj.malId = genre.data[i].mal_id;
    $malId = genre.data[i].mal_id;
    // console.log('mal id on genre', genre.data[i].mal_id);
    // console.log('global $malId for genre', $malId);
    onPage.push(genreObj);
    $genreDivEl.appendChild(renderLists(genreObj));
  }
}

// FEATURE 4 for favorite button bubbling and capturing
// $selectGenre.addEventListener('click', favoriteButton);

var $favBtn = document.querySelector('.main-container');

$favBtn.addEventListener('click', favoriteButton);
function favoriteButton(event) {

  // console.log(event.target.getAttribute('data-malid'));
  // use the event target to change the className to change the color of the button.
}
// var $favButton = document.querySelector('button');
// $favButton.addEventListener('click', favoriteButton);
