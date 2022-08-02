var random = [];

// Feature 1 START

var $xhrRandom = new XMLHttpRequest();
var randomPage = Math.floor(Math.random() * 934 + 1);
$xhrRandom.open('GET', 'https://api.jikan.moe/v4/anime?sfw=true&page=' + randomPage);

$xhrRandom.responseType = 'json';

$xhrRandom.addEventListener('load', loading);

function loading(event) {
  random.push($xhrRandom.response);

  var $randomDivEl = document.querySelector('.random');

  for (var i = 0; i < 3; i++) {
    var title = '';
    var imgUrl;
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
    $titleHeader.className = 'title';
    $titleHeader.textContent = title;

    $rowDiv.appendChild($titleHeader);
    $infoColDiv.appendChild($rowDiv);
    $imgDiv.appendChild($img);
    $wrapperDiv.appendChild($imgDiv);
    $wrapperDiv.appendChild($infoColDiv);
    $mainDiv.appendChild($wrapperDiv);
    $randomDivEl.appendChild($mainDiv);
  }
}

$xhrRandom.send();
// end of feature 1
