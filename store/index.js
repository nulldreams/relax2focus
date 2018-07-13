import Vuex from 'vuex'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      track: '',
      channel: 'rain',
      trackIndex: 1
    },
    mutations
  })
}

export default createStore