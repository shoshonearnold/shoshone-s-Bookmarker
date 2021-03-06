document.getElementById('myForm').addEventListener('submit', saveBookmark);
document.getElementById('btn').addEventListener('click', showNavBar)
document.getElementById('closed').addEventListener('click', closeNavBar)
document.getElementById('myForm').addEventListener('submit', fetchHistory)
document.getElementById('btn-secondary').addEventListener('reset', clearLocalStorage)


function showNavBar() {
  document.getElementById('btn').classList.add('js');
  document.getElementById('menu').classList.add('show');
  document.getElementById('closed').classList.add('btn');
}

function closeNavBar() {
  document.getElementById('btn').classList.remove('js');
  document.getElementById('menu').classList.remove('show');
  document.getElementById('closed').classList.remove('btn');
}

function fetchHistory() {
  var bookmarkHistory = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarkHistoryName = document.getElementById('saved-user-history');
  bookmarkHistoryName.innerHTML = "";
  for(var i = 0; i < bookmarkHistory.length; i++) {
    var name = bookmarkHistory[i].name;
    bookmarkHistoryName.innerHTML += '<div class="">' + '<h5 id="history-block">' + name + ' ----> added' + '</h5>' + '</div>';
  }
  //if (location.reload()) {
  //  name.preventDefault(); // work on in 1.1.3
  //}
  
}

function clearLocalStorage() {
  document.localStorage.clear();
}
 
function saveBookmark(e) {
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;

  function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl) {
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
    return true;
  }

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  document.getElementById('myForm').reset();

  fetchBookmarks();

  e.preventDefault();
}

function deleteBookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarksResults = document.getElementById('bookmarksResults');
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h3>'+ name +
                                    ' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                    '</h3>'+
                                  '</div>';
  }
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}