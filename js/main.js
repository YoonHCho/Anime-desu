var random = [];

var $animeRandom = document.querySelector('.anime-random');
$animeRandom.addEventListener('click', loadview);

// Feature 1 START

// INSIDE TEST BOX
var $randomDivEl = document.querySelector('.random');
var $genreDivEl = document.querySelector('.genre');
var title;
var imgUrl;

// OUTSIDE TEST BOX

var $xhrRandom = new XMLHttpRequest();
var randomPage = Math.floor(Math.random() * 934 + 1);
$xhrRandom.open('GET', 'https://api.jikan.moe/v4/anime?sfw=true&page=' + randomPage);
$xhrRandom.responseType = 'json';
$xhrRandom.addEventListener('load', loading);

function loading(event) {
  random.push($xhrRandom.response);
  // var $randomDivEl = document.querySelector('.random');

  for (var i = 0; i < 3; i++) {
    // var title = '';
    // var imgUrl;
    var randomData = parseInt(Math.floor(Math.random() * random[0].data.length));
    if (random[0].data[randomData].images.jpg.large_image_url) {
      imgUrl = random[0].data[randomData].images.jpg.large_image_url;
      if (random[0].data[randomData].title_english) {
        title = random[0].data[randomData].title_english;
      } else {
        title = random[0].data[randomData].title;
      }
    } else {
      imgUrl = 'images/placeholder-image-square.jpg';
    }
    // $randomDivEl.appendChild(renderLists());
    renderLists($randomDivEl);

    // var $mainDiv = document.createElement('div');
    // $mainDiv.className = 'col-50 padding-0-7-20';
    // var $wrapperDiv = document.createElement('div');
    // $wrapperDiv.className = 'row wrapper col-full col-50 justify-center align-center padding-10';
    // var $imgDiv = document.createElement('div');
    // $imgDiv.className = 'col-full col-50 shadow';
    // var $img = document.createElement('img');
    // $img.setAttribute('src', imgUrl);
    // var $infoColDiv = document.createElement('div');
    // $infoColDiv.className = 'col-full col-50 info-col-padding align-self-start';
    // var $rowDiv = document.createElement('div');
    // $rowDiv.className = 'row';
    // var $titleHeader = document.createElement('h4');
    // $titleHeader.className = 'title-font';
    // $titleHeader.textContent = title;

    // $rowDiv.appendChild($titleHeader);
    // $infoColDiv.appendChild($rowDiv);
    // $imgDiv.appendChild($img);
    // $wrapperDiv.appendChild($imgDiv);
    // $wrapperDiv.appendChild($infoColDiv);
    // $mainDiv.appendChild($wrapperDiv);
    // $randomDivEl.appendChild($mainDiv);
    random[0].data.splice(randomData, 1);
  }
}

// INSIDE TEST BOX
function renderLists(renderDiv) {
  var $mainDiv = document.createElement('div');
  $mainDiv.className = 'col-50 padding-0-7-20';
  var $wrapperDiv = document.createElement('div');
  $wrapperDiv.className = 'row wrapper col-full col-50 justify-center align-center padding-10';
  var $imgDiv = document.createElement('div');
  $imgDiv.className = 'col-full col-50 shadow';
  var $img = document.createElement('img');
  $img.setAttribute('src', imgUrl);
  var $infoColDiv = document.createElement('div');
  $infoColDiv.className = 'col-full col-50 info-col-padding align-self-start';
  var $rowDiv = document.createElement('div');
  $rowDiv.className = 'row';
  var $titleHeader = document.createElement('h4');
  $titleHeader.className = 'title-font';
  $titleHeader.textContent = title;

  $rowDiv.appendChild($titleHeader);
  $infoColDiv.appendChild($rowDiv);
  $imgDiv.appendChild($img);
  $wrapperDiv.appendChild($imgDiv);
  $wrapperDiv.appendChild($infoColDiv);
  $mainDiv.appendChild($wrapperDiv);

  // return $mainDiv;
  renderDiv.appendChild($mainDiv);
}
// OUTSIDE TEST BOX

$xhrRandom.send();
// end of feature 1

// feature 2

window.addEventListener('DOMContentLoaded', loadview);

// feature 2 view swapping
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

  // for (var i = 0; i < 12; i++) {
  //   $genreDivEl.appendChild(renderLists(data.genreList[i]));
  // }
}

// for rendering genre lists

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
      // console.log('data.view: ', data.view);
      // console.log('data.genres[prop]: ', data.genres[prop]);
      break;
    }
  }
  // var genre = [];
  // var $xhrGenre;
  var $xhrGenre = new XMLHttpRequest();
  $xhrGenre.open('GET', 'https://api.jikan.moe/v4/anime?genres=' + $genreID + '&page=1&sfw=true');
  $xhrGenre.responseType = 'json';
  $xhrGenre.addEventListener('load', getGenre);
  function getGenre() {
    // var genreObj = {};
    // console.log($xhrGenre.response);
    data.genreList = $xhrGenre.response;
    // data.genreList.push($xhrGenre.response);
    // console.log('$xhrGenre.response: ', $xhrGenre.response);
    for (var i = 0; i < 12; i++) {

      if ($xhrGenre.response.data[i].images.jpg.large_image_url) {
        imgUrl = $xhrGenre.response.data[i].images.jpg.large_image_url;
        if ($xhrGenre.response.data[i].title_english) {
          title = $xhrGenre.response.data[i].title_english;
        } else {
          title = $xhrGenre.response.data[i].title;
        }
      } else {
        imgUrl = 'images/placeholder-image-square.jpg';
      }
      // data.genreList.push(genreObj);
      // $genreDivEl.appendChild(renderLists());
      renderLists($genreDivEl);
    }
  }
  $xhrGenre.send();

}
