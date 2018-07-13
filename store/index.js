import Vuex from 'vuex'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      track: { url: '' },
      channel: '',
      trackIndex: 0
    },
    mutations
  })
}

export default createStore