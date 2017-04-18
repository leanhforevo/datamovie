var express = require('express');
var app = express();
var server = require('http').createServer(app);
var Nightmare = require('nightmare');
var nightmare = Nightmare();
var osmosis = require('osmosis');
server.listen(process.env.PORT||8888);

app.get('/', function (req, res) {
    // var page = req.params.data;
    // var arrData = {};
    // var typeMovie = 'http://www.phimmoi.net/phim/xac-song-5-the-walking-dead-season-5-1468/xem-phim.html';
    // console.log('data page:' + page)
    // res.header("Content-Type", "application/json; charset=utf-8");
    // getlistespisode(typeMovie, function(data) {

    //     res.end(JSON.stringify(data));
    // }, function(error)  {
    //     console.log('error : ', error);
    //     res.end('error : ');
    // });
    res.end('You Must add page in end of url ex: phim\2');
})
app.get('/getserver/:type/:urlid', function (req, res) {
    var page = req.params.type + '/' + req.params.urlid;
    var arrData = {};
    var typeMovie = 'http://www.phimmoi.net/' + page + '/xem-phim.html';
    console.log('data page:' + page)
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistespisode(typeMovie,function (data) {

        res.end(JSON.stringify(data));
    }, function(error)  {
        getlistespisode2(typeMovie, function(data) {

            res.end(JSON.stringify(data));
        }, function(error)  {
            console.log('error : ', error);
            res.end('error :');
        });
    });
    // res.end('You Must add page in end of url ex: phim\2');
})
app.get('/test', function (req, res) {
    nightmare
        .goto('https://www.facebook.com/login')
        .on('page-title-updated', function (title) {
            console.log(title);
        }).inject('.js', 'jquery.js')
        .type('#email', 'leanh_lanh@yahoo.com')
        .type('#pass', 'Mat Khau1')
        .click('#u_0_2')
        .wait(10000)
        .goto('https://www.facebook.com/Trinh2795?fref=ufi')
        .wait(5000)
        .screenshot("linkedin.png")
        // .scrollTo(500, 0)
        .screenshot(function(err, buf)  {
            console.log('hello from screenshot callback');
            // do something with the buffer
            console.log(buf)
            res.end(buf)
            return "some value";
        })
        .end()
        .then(function(something) { console.log(something)});
})
app.get('/phim', function (req, res) {
    res.end('You Must add page in end of url ex: phim\2');
})
app.get('/movieDetail/:urlMovie/:urlId', function (req, res) {
    var urlMovie = req.params.urlMovie;
    var urlId = req.params.urlId;
    var urlMovieId = req.params.urlMovie + '/' + urlId + '/';
    var dataAll = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistMovieDetails(urlMovieId, function(data) {
        dataAll.detail = getlinkPosterDetails(data.titleMovie);
        getlistMovieDetailsDes(urlMovieId, function(data) {
            dataAll.descrip = data;
            getlistMovieDetailsActor(urlMovieId, function(data) {
                dataAll.actor = getlinkPosterActor(data);
                res.end(JSON.stringify(dataAll));
            }, function(error)  {
                console.log('error : ', error);
                res.end('error : ');
            });
        }, function(error)  {
            console.log('error : ', error);
            res.end('error : ');
        });
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})
app.get('/phimle/:data', function (req, res) {
    var page = req.params.data;
    var arrData = {};
    var typeMovie = 'phim-le';
    console.log('data page:' + page)
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistPhimLe(page, typeMovie, function(data)  {
        arrData.page = parseInt(page);
        arrData.item = getlinkPoster(data);
        res.end(JSON.stringify(arrData));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})
app.get('/searchtext/:data', function (req, res) {
    var page = req.params.data;
    var arrData = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistSearchText(page, function(data)  {
        arrData.page = parseInt(page);
        arrData.item = getlinkPoster(data);
        res.end(JSON.stringify(arrData));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})

app.get('/searchadv/:ht/:tl/:qg/:year', function (req, res) {
    var page = req.params.ht === 'null' ? 'the-loai/' : req.params.ht + '/' +
        req.params.tl + '/' +
        req.params.qg === 'null' ? '' : req.params.ht + '/' +
            req.params.year === 'null' ? '' : req.params.ht + '/';
    var arrData = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistSearchText(page, function(data)  {
        arrData.page = parseInt(page);
        arrData.item = getlinkPoster(data);
        res.end(JSON.stringify(arrData));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})
app.get('/phimbo/:data', function (req, res) {
    var page = req.params.data;
    var arrData = {};
    var typeMovie = 'phim-bo';
    console.log('data page:' + page)

    res.header("Content-Type", "application/json; charset=utf-8");
    getlistPhimLe(page, typeMovie, function(data)  {
        arrData.page = parseInt(page);
        arrData.item = getlinkPoster(data);
        res.end(JSON.stringify(arrData));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})
app.get('/phimkinhdien/:data', function (req, res) {
    var page = req.params.data;
    var arrData = {};
    var typeMovie = 'phim-kinh-dien';
    console.log('data page:' + page)
    arrData.page = data
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistPhimLe(page, typeMovie, function(data)  {
        arrData.page = parseInt(page);
        arrData.item = getlinkPoster(data);
        res.end(JSON.stringify(arrData));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})
app.get('/trailer/:data', function (req, res) {
    var page = req.params.data;
    var arrData = {};
    var typeMovie = 'trailer';
    console.log('data page:' + page)

    res.header("Content-Type", "application/json; charset=utf-8");
    getlistPhimLe(page, typeMovie, function(data)  {
        arrData.page = parseInt(page);
        arrData.item = getlinkPoster(data);
        res.end(JSON.stringify(arrData));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})

app.get('/movieVideo/:urlMovie/:urlId', function (req, res) {
    var urlMovieId = req.params.urlMovie + '/' + req.params.urlId + '/';
    var dataAll = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistMovieVideo(urlMovieId, function(data)  {
        dataAll.url = data;
        res.end(JSON.stringify(dataAll));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });

})
app.get('/movieVideo222/:urlMovie/:urlId', function (req, res) {
    var urlMovieId = req.params.urlMovie + '/' + req.params.urlId + '/';
    var dataAll = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistMovieVideo222(urlMovieId, function(data)  {
        dataAll.url = data;
        res.end(JSON.stringify(dataAll));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });

})

app.get('/movieVideo/:urlMovie/:urlId/:urlSession', function (req, res) {
    var urlMovieId = req.params.urlMovie + '/' + req.params.urlId + '/' + req.params.urlSession;
    var dataAll = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getlistMovieVideo2(urlMovieId, function(data)  {
        dataAll.url = data;
        res.end(JSON.stringify(dataAll));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });

})
app.get('/topphimbo', function (req, res) {
    dataAll = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getTopPhimBo(function(data)  {
        dataAll.data = getEditTopMovie(data);
        res.end(JSON.stringify(dataAll));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})
app.get('/topphimle', function (req, res) {
    dataAll = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getTopPhimLe(function(data)  {
        dataAll.data = getEditTopMovie(data);
        res.end(JSON.stringify(dataAll));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });
})
app.get('/topphimtrailer', function (req, res) {
    dataAll = {};
    res.header("Content-Type", "application/json; charset=utf-8");
    getTopTrailer(function(data)  {
        dataAll.data = getEditTopMovie(data);
        res.end(JSON.stringify(dataAll));
    }, function(error)  {
        console.log('error : ', error);
        res.end('error : ');
    });

})
function getlistPhimLe(dataPage, typeMovie, callback, callbackError) {
    var arrdata = [];
    var i = 0;
    return new Promise(function(resolve, reject)  {
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
            .error(function(error) {reject(error)} )
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError(error)
    })
}
function getlistSearchText(dataPage, callback, callbackError) {
    var arrdata = [];
    var i = 0;
    return new Promise(function(resolve, reject)  {
        osmosis
            .get('http://www.phimmoi.net/tim-kiem/' + dataPage + '/')
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
            .error(function(error){  reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError(error)
    })
}
function getlinkPoster(data) {
    var newArray = [];
    data.map(function(val)  {
        var start = val.image.indexOf("http://image.phimmoi.net");

        var end = val.image.indexOf("poster.thumb.jpg");

        var data = {
            "url": val.url,
            "titlev": val.titlev,
            "titlew": val.titlew,
            "image": val.image.substring(start, end + 16),
            "time": val.time
        }
        newArray.push(data);
    })
    return newArray;
}

function getlinkPosterDetails(data) {


    var start = data.image.indexOf("http://image.phimmoi.net");

    var end = data.image.indexOf("poster.medium.jpg");

    var data2 = {
        "title1": data.title1,
        "title2": data.title2,
        "description": data.description,
        "image": data.image.substring(start, end + 17),
        "haveVideo": data.haveVideo ? 'yes' : 'no',
        "idYoutube": data.idYoutube.replace('https://www.youtube.com/watch?v=', ''),
        "trailername": data.trailername
    }

    return data2;
}
function getlistMovieDetails(dataPage, callback, callbackError) {
    var arrdata = {};

    // arrdata.concat(getlistMovieDetailsDes);
    return new Promise(function(resolve, reject)  {
        osmosis
            .get('http://www.phimmoi.net/' + dataPage)
            .find('.col-lg-8 > .page-single > .movie-info')
            .set({

                "title1": ".block-movie-info > div > .movie-detail > .movie-title > .title-1",
                "title2": ".block-movie-info > div > .movie-detail > .movie-title > .title-2",
                "description": ".block-movie-content > .content > p",
                "image": ".block-movie-info > div > .movie-image > .movie-l-img > img@src",
                "haveVideo": "#btn-film-watch",
                "idYoutube": ".btn-film-trailer @data-videourl",
                "trailername": ".btn-film-trailer @title"

            })
            .data(function (listing) {
                // do something with listing data
                console.log(listing);
                arrdata.titleMovie = listing
                resolve(arrdata)
            })
            .log(console.log)
            .error(function(error)  {reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError(error)
    })
}

function getlistMovieDetailsDes(dataPage, callback, callbackError) {
    var arrdata = {};
    var i = 0;
    return new Promise(function(resolve, reject)  {
        osmosis
            .get('http://www.phimmoi.net/' + dataPage)
            .find('.movie-meta-info > dl')
            .set({

                "status": ".movie-dd[1]",
                "ibm": ".movie-dd[2]",
                "voteIBM": ".movie-dd[3]",
                "director": ".movie-dd[4]",
                "state": ".movie-dd[5]",
                "year": ".movie-dd[6]",
                "dateRelease": ".movie-dd[7]",
                "time": ".movie-dd[8]",
                "quality": ".movie-dd[9]",
                "language": ".movie-dd[10]",
                "language2": ".movie-dd[11]",
                "typeMovie": ".movie-dd[12]",
                "company": ".movie-dd[13]",
                "view": ".movie-dd[14]"

            })
            .data(function (listing) {
                // do something with listing data
                // console.log(listing);
                listing.status === 'Trailer' ?
                    osmosis
                        .get('http://www.phimmoi.net/' + dataPage)
                        .find('.movie-meta-info > dl')
                        .set({

                            "status": ".movie-dd[1]",
                            "director": ".movie-dd[2]",
                            "state": ".movie-dd[3]",
                            "year": ".movie-dd[4]",
                            "dateRelease": ".movie-dd[5]",
                            "time": ".movie-dd[6]",
                            "quality": ".movie-dd[7]",
                            "pixcel": ".movie-dd[8]",
                            "language": ".movie-dd[9]",
                            "typeMovie": ".movie-dd[10]",
                            "company": ".movie-dd[11]",
                            "view": ".movie-dd[12]"

                        })
                        .data(function (listing) {
                            arrdata.Detail = listing;
                            resolve(arrdata)
                        })
                        .log(console.log)
                        .error(function(error)  {reject(error)})
                        .debug(console.log)
                    :
                    osmosis
                        .get('http://www.phimmoi.net/' + dataPage)
                        .find('.movie-meta-info > dl')
                        .set({
                            "status": ".movie-dd[1]",
                            "ibm": ".movie-dd[2]",
                            "voteIBM": ".movie-dd[3]",
                            "director": ".movie-dd[4]",
                            "state": ".movie-dd[5]",
                            "year": ".movie-dd[6]",
                            "dateRelease": ".movie-dd[7]",
                            "time": ".movie-dd[8]",
                            "quality": ".movie-dd[9]",
                            "language": ".movie-dd[10]",
                            "pixcel": ".movie-dd[11]",
                            "typeMovie": ".movie-dd[12]",
                            "company": ".movie-dd[13]",
                            "view": ".movie-dd[14]"

                        })
                        .data(function (listing) {
                            arrdata.Detail = listing;
                            resolve(arrdata)
                        })
                        .log(console.log)
                        .error(function(error)  {reject(error)})
                        .debug(console.log)


            })
            .log(console.log)
            .error(function(error)  {reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError(error)
    })
}
function getlistMovieDetailsActor(dataPage, callback, callbackError) {
    var arrdata = [];
    var i = 0;
    return new Promise(function(resolve, reject)  {
        osmosis
            .get('http://www.phimmoi.net/' + dataPage)
            .find('#list_actor_carousel > li')
            .set({
                'id': 'a @title',
                'url': 'a @href',
                'img': 'a > div @style',
                'name': 'a > .actor-name > .actor-name-a',
                'movieName': 'a > .actor-name > .character'


            })
            .data(function (listing) {
                // do something with listing data
                console.log(listing);
                arrdata.push(listing);
                resolve(arrdata)
            })
            .log(console.log)
            .error(function(error)  {reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError(error)
    })
}
function getlinkPosterActor(data) {
    var newArray = [];
    data.map(function(val)  {
        var start = val.img.indexOf("http://image.phimmoi.net");
        var end = val.img.indexOf("/thumb.jpg");
        var data = {
            "id": val.id,
            "url": val.url,
            "img": val.img.substring(start, end + 10),
            "name": val.name,
            "movieName": val.movieName
        }
        newArray.push(data);
    })
    return newArray;
}
function getlistMovieVideo222(dataPage, callback, callbackError) {
    var data = '';
    nightmare
        .goto('http://www.phimmoi.net')
        // .wait('.movie-list-index .list-movie .movie-item a')
        // .click('.movie-list-index .list-movie .movie-item a')
        // .wait(500)
        // .wait('#media-player .jw-media video')
        // .wait('.jw-icon-tooltip .jw-overlay .jw-menu li')
        .screenshot('111.png')
        .type('#form-search div input', 'la tu em da tinh')
        .click('#mega-menu-1 li')
        .wait(10)
        .screenshot('222.png')
        .evaluate(function () {
            // var x = document.querySelectorAll('.jw-icon-tooltip .jw-overlay .jw-menu li');
            var d = ['asd'];

            // for (var i = 0; i < x.length; i++) {
            //     d.push(x[i].textContent)
            // }
            return d;
        })
        // .end()
        .then(function (result) {
            console.log(result);
            callback(result)

        })
        .catch(function (error) {
            console.error('Search failed:', error);
            callbackError('error')
        });

    // callbackError({as:'as'})
}
function getlistMovieVideo(dataPage, callback, callbackError) {
    console.log('------------------------------------');
    console.log('Waiting loading link video');
    console.log('------------------------------------');
    var data = '';
    nightmare
        .goto('http://www.phimmoi.net/' + dataPage + '/xem-phim.html')
        .wait('#media-player .jw-media video')
        .evaluate(function () {
            return document.querySelector('#media-player .jw-media video').src;
        })
        // .end()
        .then(function (result) {
            console.log(result);
            callback(result)

        })
        .catch(function (error) {
            console.error('Search failed:', error);
            callbackError('error')
        });

    // callbackError({as:'as'})
}
function getlistMovieVideo2(dataPage, callback, callbackError) {
    console.log('------------------------------------');
    console.log('Waiting loading link video');
    console.log('------------------------------------');
    var data = '';
    nightmare
        .goto('http://www.phimmoi.net/' + dataPage)
        .wait('#media-player .jw-media video')
        .evaluate(function () {
            return document.querySelector('#media-player .jw-media video').src;
        })
        // .end()
        .then(function (result) {
            console.log(result);
            callback(result)

        })
        .catch(function (error) {
            console.error('Search failed:', error);
            callbackError('error')
        });

    // callbackError({as:'as'})
}
function getTopTrailer(callback, callbackError) {
    var arrdata = [];
    var i = 0;
    return new Promise(function(resolve, reject)  {
        osmosis
            .get('http://www.phimmoi.net')
            .find('.top-film-week[1] > .right-box-content > .list-top-movie > li')
            .set({

                "title": "a @title",
                "url": "a @href",
                "image": ".list-top-movie-item-thumb @style",
                "itemvn": ".list-top-movie-item-vn",
                "itemen": ".list-top-movie-item-en",
                "view": ".list-top-movie-item-view",
                "start": ".rate-vote@class"
            })
            .data(function (listing) {
                // do something with listing data
                // console.log(listing);
                arrdata.push(listing)
                resolve(arrdata)
            })
            .log(console.log)
            .error(function(error)  {reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError(error)
    })
}
function getTopPhimLe(callback, callbackError) {
    var arrdata = [];
    var i = 0;
    return new Promise(function(resolve, reject)  {
        osmosis
            .get('http://www.phimmoi.net')
            .find('.top-film-week[2] > .right-box-content > .list-top-movie > li')
            .set({

                "title": "a @title",
                "url": "a @href",
                "image": ".list-top-movie-item-thumb @style",
                "itemvn": ".list-top-movie-item-vn",
                "itemen": ".list-top-movie-item-en",
                "view": ".list-top-movie-item-view",
                "start": ".rate-vote@class"
            })
            .data(function (listing) {
                // do something with listing data
                // console.log(listing);
                arrdata.push(listing)
                resolve(arrdata)
            })
            .log(console.log)
            .error(function(error)  {reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError(error)
    })
}
function getTopPhimBo(callback, callbackError) {
    var arrdata = [];
    var i = 0;
    return new Promise(function(resolve, reject)  {
        osmosis
            .get('http://www.phimmoi.net')
            .find('.top-film-week[3] > .right-box-content > .list-top-movie > li')
            .set({

                "title": "a @title",
                "url": "a @href",
                "image": ".list-top-movie-item-thumb @style",
                "itemvn": ".list-top-movie-item-vn",
                "itemen": ".list-top-movie-item-en",
                "view": ".list-top-movie-item-view",
                "start": ".rate-vote@class"
            })
            .data(function (listing) {
                // do something with listing data
                // console.log(listing);
                arrdata.push(listing)
                resolve(arrdata)
            })
            .log(console.log)
            .error(function(error)  {reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError(error)
    })
}
function getlistespisode(url, callback, callbackError) {
    var arrdata = [];
    var dataespisode = {};
    var i = 1;
    return new Promise(function(resolve, reject)  {
        osmosis
            .get(url)
            .find('.list-server > div')
            .set({

                "serverName": "h3"
            })
            .find('.list-server > div[' + i + '] > ul > li')
            .set({
                "title": "a@title",
                "href": "a@href"
            })

            .data(function (listing) {
                arrdata.push(listing);
                ++i;
                resolve(arrdata)
            })
            .log(console.log)
            .error(function(error)  {reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError('error')
    })
}

function getlistespisode2(url, callback, callbackError) {
    var arrdata = [];
    var dataespisode = {};
    var i = 1;
    return new Promise(function(resolve, reject)  {
        osmosis
            .get(url)

            .find('.server-list > li')
            .set({
                "serverName": "h3",
                "title": "ul > li > a@title",
                "href": "ul > li > a@href"
            })

            .data(function (listing) {

                arrdata.push(listing);
                i++;
                resolve(arrdata)
            })
            .log(console.log)
            .error(function(error)  {reject(error)})
            .debug(console.log)



    }).then(function(r)  {
        callback(r);
    }).catch(function(error)  {
        callbackError('error')
    })
}
function getEditTopMovie(data) {
    var newArray = [];
    data.map(function(val)  {
        var start = val.image.indexOf("http://image.phimmoi.net");
        var end = val.image.indexOf("poster.small.jpg");
        var data = {
            "title": val.title,
            "url": val.url,
            "image": val.image.substring(start, end + 16),
            "itemvn": val.itemvn,
            "itemen": val.itemen,
            "start": val.start,
            "view": val.view.replace("Lượt xem: ", " "),
            
        }
        newArray.push(data);
    })
    return newArray;
}

