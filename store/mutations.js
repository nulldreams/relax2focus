let api = require('./api')

const mutations = {
  increment (state) {
    state.counter++
  },
  playTrack (state, track) {
    state.audio.load(track)
    state.audio.play()
  },
  firstTrack: function (state, channel) {
    api.default.loadTrack(channel, (err, track) => {
      state.track = track
    })
  },
  async nextTrack (state, params) {
    api.default.nextTrack(params, (err, track) => {
      state.track = track
      state.trackIndex++
    })
  },
  async previousTrack (state, params) {
    api.default.previousTrack(params, (err, track) => {
      state.track = track
      state.trackIndex--
    })
  },
  setChannel: function (state, channel) {
    state.channel = channel
  }
}

export default mutations