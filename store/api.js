import Vue from 'vue'
let url = {
    dev: 'http://localhost:5000',
    prod: 'https://relax2focus.herokuapp.com'
}

const methods = {
    loadTrack: function (channel, cb) {
        Vue.http.get(`${url.prod}/tracks/?offset=1&timestamp=1531438026840&channel=${channel}`).then(response => {
            let track = response.body

            return cb(null, track)
        },
        response => {
            console.log(response);
        })
    },
    nextTrack: function ({ index, channel }, cb) {
        Vue.http.get(`${url.prod}/tracks/?offset=${index++}&timestamp=1531438026840&channel=${channel}`).then(response => {
            let track = response.body

            return cb(null, track)
        },
        response => {
            console.log(response);
        })
    },
    previousTrack: function ({ index, channel }, cb) {
        Vue.http.get(`${url.prod}/tracks/?offset=${index--}&timestamp=1531438026840&channel=${channel}`).then(response => {
            let track = response.body

            return cb(null, track)
        },
        response => {
            console.log(response);
        })
    }
}

export default methods