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
    },
    {
        name: "Bing",
        query: "http://www.bing.com/search?q=%QUERY%",
        regex: function(query) {
            return encodeURIComponent(query)
        }
    },
    {
        name: "DuckDuckGo",
        query: "http://duckduckgo.com/?q=%QUERY%",
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

if(!storage.getItem('showLogo')) {
    storage.setItem('showLogo', "Yes");
}

document.getElementById('background').src = storage.getItem('background');

backgrounds.forEach(function(background) {
    var el = document.createElement('img');
    el.src = background;
    el.classList.add('background');
    if(el.src === storage.getItem('background')) {
        el.classList.add('active');
    }
    el.onclick = function(ev) {
        document.getElementsByClassName('background active')[0].classList.remove('active');
        ev.target.classList.add('active');
        storage.setItem('background', ev.target.src);
        document.getElementById('background').src = storage.getItem('background');
    }
    document.getElementById('setting-backgrounds').appendChild(el);
});

searchEngines.forEach(function(engine) {
    var el = document.createElement('a');
    el.classList.add('search-engine');
    el.innerHTML = engine.name;
    if(engine.name === storage.getItem('searchEngine')) {
        el.classList.add('active');
    }
    el.onclick = function(ev) {
        document.getElementsByClassName('search-engine active')[0].classList.remove('active');
        ev.target.classList.add('active');
        storage.setItem('searchEngine', ev.target.innerHTML);
    }
    document.getElementById('setting-search-engines').appendChild(el);
})

var searchEvent = function(ev) {
    ev.preventDefault();
    searchEngines.forEach(function(engine) {
        if(engine.name == storage.getItem('searchEngine')) {
            window.location.href = engine.query.replace('%QUERY%', engine.regex(document.getElementById('search-bar-input').value));
        }
    })
    return false;
};

if(storage.getItem('showLogo') === "Yes") {
    document.getElementsByClassName('show-logo')[0].classList.add('active');
    document.getElementById('logo').style.display = "inline-block";
} else {
    document.getElementsByClassName('show-logo')[1].classList.add('active');
    document.getElementById('logo').style.display = "none";
}

document.getElementById('search-bar-go').onclick = searchEvent;
document.getElementById('search-bar-input').onkeydown = function(ev) {
    if(ev.keyCode === 13) {
        searchEvent(ev);
    }
};

function showLogoEvent(target) {
    storage.setItem("showLogo", target.innerHTML);
    document.getElementsByClassName('show-logo active')[0].classList.remove('active');
    target.classList.add('active');
    if(target.innerHTML === "Yes") {
        document.getElementById('logo').style.display = "inline-block";
    } else {
        document.getElementById('logo').style.display = "none";
    }
}

document.getElementById('settings-text').onclick = function(ev) {
    document.getElementById('settings-module').classList.remove('hidden'); 
}

document.getElementById('settings-close').onclick = function(ev) {
    document.getElementById('settings-module').classList.add('hidden'); 
}