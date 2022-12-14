/* exported data */

var data = {
  view: 'random-view',
  genres: [
    {
      action: '1',
      adventure: '2',
      comedy: '4',
      drama: '8',
      fantasy: '10',
      mystery: '7',
      psychological: '',
      sliceOfLife: '36',
      sciFi: '24',
      sports: '30',
      supernatural: '37',
      suspense: '41'
    }
  ],
  favorite: [],
  onPage: []
};

var previousDataJSON = localStorage.getItem('ajax-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('ajax-local-storage', dataJSON);
}
