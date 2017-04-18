var express = require('express');
var app = express();
var server = require('http').createServer(app);
var Nightmare = require('nightmare');
var nightmare = Nightmare();
var osmosis = require('osmosis');
server.listen(8888);

app.get('/', function (req, res) {
    var url='http://keeng.vn/audio/Di-De-Tro-Ve-%28Da-Co-Hoai-Lang-OST%29-Uyen-Linh-320Kbps/xRZawvUj.html?src=noibat';
    res.header("Content-Type", "application/json; charset=utf-8");
    testget(url, (data) => {

        res.end(JSON.stringify(data));
    }, (error) => {
        console.log('error : ', error);
        res.end('error : ');
    });
    // res.end('You Must add page in end of url ex: phim\2');
})

function testget(url, callback, callbackError) {
    var arrdata = [];
    var i = 0;
    return new Promise((resolve, reject) => {
        osmosis
            .get(url)
            .find('.player-playing > audio')
            .set({

                "a": "@src"
            })
            .data(function (listing) {

                arrdata.push(listing);
                resolve(arrdata)

            })
            .log(console.log)
            .error((error) => reject(error))
            .debug(console.log)
    }).then(r => {
        callback(r);
    }).catch((error) => {
        callbackError(error)
    })
}
app.get('/test', function (req, res) {
    nightmare
        .goto('http://keeng.vn/audio/Di-De-Tro-Ve-%28Da-Co-Hoai-Lang-OST%29-Uyen-Linh-320Kbps/xRZawvUj.html?src=noibat')
        .on('player-playing', function (title) {
            console.log(title);
        })
        
        .end()
        .then((something) => res.end(something))

     
})

function getlistPhimLe(dataPage, typeMovie, callback, callbackError) {
    var arrdata = [];
    var i = 0;
    return new Promise((resolve, reject) => {
        osmosis
            .get('http://www.phimmoi.net/' + typeMovie + '/page-' + dataPage + '.html')
            .find('.movie-list-index > ul > .movie-item')
            .set({

                "url": "a @href",
                "titlev": "a > div > .movie-title-1",
                "titlew": "a > div > .movie-title-2",
                "image": 'a > div @style',
                "time": 'a > div > .movie-title-chap'
            })
            .data(function (listing) {
                // do something with listing data
                // console.log(listing);
                arrdata.push(listing)
                resolve(arrdata)
            })
            .log(console.log)
            .error((error) => reject(error))
            .debug(console.log)



    }).then(r => {
        callback(r);
    }).catch((error) => {
        callbackError(error)
    })
}