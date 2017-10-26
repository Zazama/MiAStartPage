var backgrounds = [
    "https://i.imgur.com/47f2kIt.png",
    "https://i.imgur.com/V67JVxg.jpg",
    "https://i.imgur.com/oykVjkv.jpg"
]

var searchEngines = [
    {
        name: "Google",
        query: "http://www.google.com/search?q=%QUERY%",
        regex: function(query) {
            return encodeURIComponent(query)
        }
    }
]

var storage = localStorage;
if(!storage.getItem('background')) {
    storage.setItem('background', backgrounds[0]);
}

if(!storage.getItem('searchEngine')) {
    storage.setItem('searchEngine', searchEngines[0].name);
}

document.getElementById('background').src = storage.getItem('background');
var currentSearchEngine = storage.getItem('searchEngine');

searchEngines.forEach(function(engine) {
    if(engine.name == storage.getItem('searchEngine')) {
        var searchEvent = function(ev) {
            ev.preventDefault();
            window.location.href = engine.query.replace('%QUERY%', engine.regex(document.getElementById('search-bar-input').value));
            return false;
        };
        document.getElementById('search-bar-go').onclick = searchEvent;
        document.getElementById('search-bar-input').onkeydown = function(ev) {
            console.log(ev)
            if(ev.keyCode === 13) {
                searchEvent(ev);
            }
        };
    }
})