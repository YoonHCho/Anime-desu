var random = [];

// Feature 1 START
var $xhrRandom1 = new XMLHttpRequest();
var $xhrRandom2 = new XMLHttpRequest();
var $xhrRandom3 = new XMLHttpRequest();

$xhrRandom1.open('GET', 'https://api.jikan.moe/v4/random/anime');
$xhrRandom2.open('GET', 'https://api.jikan.moe/v4/random/anime');
$xhrRandom3.open('GET', 'https://api.jikan.moe/v4/random/anime');

$xhrRandom1.responseType = 'json';
$xhrRandom2.responseType = 'json';
$xhrRandom3.responseType = 'json';

$xhrRandom1.addEventListener('load', loading);
$xhrRandom2.addEventListener('load', loading);
$xhrRandom3.addEventListener('load', loading);

function loading(event) {
  if ($xhrRandom1.status === 200 &&
    $xhrRandom2.status === 200 &&
    $xhrRandom3.status === 200) {
    addModelRandom();

    var $randomDivEl = document.querySelector('.random');

    for (var i = 0; i < random.length; i++) {
      var title;
      var imgUrl = random[i].data.images.jpg.large_image_url;
      if (!random[i].data.title_english) {
        title = random[i].data.title;
      } else {
        title = random[i].data.title_english;
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
}

function addModelRandom() {
  random.push($xhrRandom1.response);
  random.push($xhrRandom2.response);
  random.push($xhrRandom3.response);
}

$xhrRandom1.send();
$xhrRandom2.send();
$xhrRandom3.send();
// end of feature 1
