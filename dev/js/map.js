const spinner = document.querySelector('.ymap-container').parentNode.querySelector('.loader');

let check_if_load = false;
let myMapTemp, myPlacemarkTemp;

function init () {
    myMapTemp = new ymaps.Map("map-yandex", {
        center: [55.611409, 37.201122],
        zoom: 15,
        controls: ['zoomControl', 'fullscreenControl']
    });
    myPlacemarkTemp = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [55.611409, 37.201122]
        },
        properties: {
            balloonContent: 'Ремонт квартир<br><i>Телефон</i>:<br><b>+7 (495) 42-251-31</b>'
        }
    });

    myMapTemp.geoObjects.add(myPlacemarkTemp);
    myMapTemp.behaviors.disable('scrollZoom');

    let layer = myMapTemp.layers.get(0).get(0);

    waitForTilesLoad(layer).then(function() {
        spinner.classList.remove('is-active');
    });
}

function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        let tc = getTileContainer(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false;
            }
        });
        if (readyAll) {
            resolve();
        } else {
            tc.events.once("ready", function() {
                resolve();
            });
        }
    });
}

function getTileContainer(layer) {
    for (let k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
            ) {
                return layer[k];
            }
        }
    }
    return null;
}

function loadScript(url, callback){
    let script = document.createElement("script");

    if (script.readyState){  // IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

const ymap = function() {
    document.querySelector('.ymap-container').addEventListener('mouseenter', () => {
        if (!check_if_load) {
            check_if_load = true;
            spinner.classList.add('is-active');

            loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
                ymaps.load(init);
            });
        }
    })
}

ymap();
