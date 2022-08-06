var random = [];
var onPage = [];
var $malId;
var $loadScreen = document.querySelector('.load-screen');
var $viewRandom = document.querySelector('.random-view');
var $viewGenre = document.querySelector('.genre-view');
var $viewFavorite = document.querySelector('.favorite-view');
var $randomDivEl = document.querySelector('.random');
var $genreDivEl = document.querySelector('.genre');
var $favoriteDivEl = document.querySelector('.favorite');
var $animeRandom = document.querySelector('.anime-random');

$animeRandom.addEventListener('click', function () {
  $randomDivEl.replaceChildren();
  firstLoad();
});

if (data.view === 'random-view') {
  firstLoad();
}

function firstLoad() {
  data.view = 'random-view';
  loadView(data.view);
  var $xhrRandom = new XMLHttpRequest();
  var randomPage = Math.floor(Math.random() * 934 + 1);
  $xhrRandom.open('GET', 'https://api.jikan.moe/v4/anime?sfw=true&page=' + randomPage);
  $loadScreen.className = 'load-screen row justify-center';
  $xhrRandom.responseType = 'json';
  $xhrRandom.addEventListener('load', function () {
    $loadScreen.className = 'load-screen row justify-center hidden';
    random.push($xhrRandom.response);
    loading();
  });
  $xhrRandom.send();
}

function loading(event) {
  onPage = [];
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
    $malId = random[0].data[randomData].mal_id;
    onPage.push(randomObj);

    $randomDivEl.appendChild(renderLists(randomObj));
    random[0].data.splice(randomData, 1);
  }

}

function renderLists(obj) {
  var $mainDiv = document.createElement('div');
  $mainDiv.className = 'col-50 padding-0-7-20 render-div';
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
  $titleHeader.className = 'title-font padding-l10';
  $titleHeader.textContent = obj.title;
  var $paragraph = document.createElement('p');
  $paragraph.className = 'height-68 info-para padding-l10';
  $paragraph.textContent = obj.synopsis;

  var $buttonDiv = document.createElement('div');
  $buttonDiv.className = 'col-full text-center padding-t20-button';
  var $button = document.createElement('button');
  $button.setAttribute('data-malId', $malId);
  $button.className = 'fav-btn-false';
  $button.textContent = 'Add to Favorite';
  if (data.favorite.length !== 0) {
    for (var i = 0; i < data.favorite.length; i++) {
      if ($malId === data.favorite[i].malId) {
        $button.textContent = 'Remove from Favorite';
        $button.className = 'fav-btn-true';
      }
    }
  }

  $buttonDiv.appendChild($button);
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

window.addEventListener('DOMContentLoaded', loadView);

function loadView(event) {
  // debugger;
  if (data.view === 'random-view') {
    $viewRandom.className = 'random-view';
    $viewGenre.className = 'genre-view hidden';
    $viewFavorite.className = 'favorite-view hidden';
  } else if (data.view === 'genre-view') {
    $viewRandom.className = 'random-view hidden';
    $viewGenre.className = 'genre-view';
    $viewFavorite.className = 'favorite-view hidden';
  } else if (data.view === 'favorite-view') {
    $viewRandom.className = 'random-view hidden';
    $viewGenre.className = 'genre-view hidden';
    $viewFavorite.className = 'favorite-view';
    if (data.favorite.length !== 0) {
      for (var i = 0; i < data.favorite.length; i++) {
        $malId = data.favorite[i].malId;
        $favoriteDivEl.appendChild(renderLists(data.favorite[i]));
      }
    }
    if (data.favorite.length !== 0) {
      var $defaultNoFav = document.querySelector('.default-no-fav');
      $defaultNoFav.className = 'default-no-fav text-center hidden';
    }
  }
  $loadScreen.className = 'load-screen row justify-center hidden';
}

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
      loadView();
      break;
    }
  }
  var $xhrGenre = new XMLHttpRequest();
  $xhrGenre.open('GET', 'https://api.jikan.moe/v4/anime?genres=' + $genreID + '&page=1&sfw=true');
  $loadScreen.className = 'load-screen row justify-center';
  $xhrGenre.responseType = 'json';
  $xhrGenre.addEventListener('load', function () {
    $loadScreen.className = 'load-screen row justify-center hidden';
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
    onPage.push(genreObj);
    $genreDivEl.appendChild(renderLists(genreObj));
  }
}

var $favBtn = document.querySelector('.main-container');
$favBtn.addEventListener('click', favoriteButton);

function favoriteButton(event) {
  if (event.target.getAttribute('class') === 'fav-btn-false') {
    event.target.className = 'fav-btn-true';
    event.target.textContent = 'Remove from Favorite';
    for (var i = 0; i < onPage.length; i++) {
      if (onPage[i].malId === parseInt(event.target.getAttribute('data-malid'))) {
        data.favorite.unshift(onPage[i]);
      }
    }
  } else if (event.target.getAttribute('class') === 'fav-btn-true' && event.target.tagName === 'BUTTON') {
    event.target.className = 'fav-btn-false';
    event.target.textContent = 'Add to Favorite';
    if (data.view === 'favorite-view') {
      var $closestAncestor = event.target.closest('.render-div');
      $closestAncestor.remove();
    }
    for (var k = 0; k < data.favorite.length; k++) {
      if (parseInt(event.target.getAttribute('data-malid')) === data.favorite[k].malId) {
        data.favorite.splice(k, 1);
        if (data.favorite.length === 0) {
          var $defaultNoFav = document.querySelector('.default-no-fav');
          $defaultNoFav.className = 'default-no-fav text-center';
        }
      }
    }
  }
}

var $favoriteLink = document.querySelector('.anime-favorite');
$favoriteLink.addEventListener('click', goToFavorite);

function goToFavorite(event) {
  $selectGenre.selectedIndex = 0;
  event.preventDefault();
  $favoriteDivEl.replaceChildren();
  data.view = 'favorite-view';
  loadView(data.view);
  if (data.favorite.length !== 0) {
    var $defaultNoFav = document.querySelector('.default-no-fav');
    $defaultNoFav.className = 'default-no-fav text-center hidden';
  }
}
