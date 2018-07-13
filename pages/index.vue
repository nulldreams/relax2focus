<template>
  <div class="principal">
    <div v-if="channel" class="overlay" @click="channel = false">
      <div class="content">
        <div class="channels">
          <div class="channel" @click="setChannel(0)">electronic</div>
          <div class="channel" @click="setChannel(1)">downtempo</div>
          <div class="channel" @click="setChannel(2)">classical</div>
          <div class="channel" @click="setChannel(3)">rain</div>
        </div>
      </div>
    </div>
    <div class="player">
      <div class="options">
        <div class="left" @click="previousSong()">
            <i data-feather="skip-back"></i>
        </div>
        <div v-show="!pause" :class="{ 'middle': true, 'animated': true, 'shake': true }" @click="playSong($store.state.track.url)">
            <i data-feather="play"></i>
        </div>
        <div v-show="pause" :class="{ 'middle': true, 'animated': true, 'rubberBand': true }" @click="pauseSong()">
            <i data-feather="pause"></i>
        </div>
        <div class="right" @click="nextSong()">
            <i data-feather="skip-forward"></i>
        </div>
      </div>
      <div class="channels" @click="channel = true">
        <p style="cursor: pointer;">channels</p>
      </div>
    </div>
  </div>
</template>
<style>
  .principal .overlay .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .principal .overlay .content .channels {
    width: 300px;
    height: 500px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .principal .overlay .content .channels > .channel {
    background: rgba(25, 25, 25, .8);
    color: #fff;
    border-radius: .20em;
    margin: 5px;

    height: 50px;
    width: 200px;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .principal .overlay .content .channels > .channel:hover {
    background: rgba(25, 25, 25, 1.0);
    transition: background 500ms;
    cursor: pointer;
  }
  .principal .overlay {
    z-index: 10;
    background: rgba(25, 25, 25, .8);
    height: 100vh;
    width: 100vw;
    position: absolute;
  }
  .principal {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
  }
  .principal .player {
    width: 400px;
    height: 400px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .principal .player .options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .principal .player .options .left {
    height: 80px;
    width: 80px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .principal .player .options .middle {
    background: #a29bfe;
    border-radius: 50%;
    height: 150px;
    width: 150px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }
  .principal .player .options .right {
    height: 80px;
    width: 80px;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .principal .player .options .middle .feather {
    stroke: #fff;
    width: 70px;
    height: 70px;
  }
  .principal .player .options .right .feather, .principal .player .options .left .feather {
    stroke: #a29bfe;
    width: 30px;
    height: 30px;
  }
</style>
<script>
export default {
  head () {
    return {
      title: 'Relax to focus',
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: 'Focus with songs for work, productivity and flow.'
        },
        {
          hid: `keywords`,
          name: 'keywords',
          keywords: 'Relax to Focus'
        },
        {
          hid: `og:title`,
          property: 'og:title',
          content: `Relax to focus`
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content: '/cover.png'
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: 'Focus with songs for work, productivity and flow.'
        }
      ]
    }
  },
  data () {
    return {
      play: false,
      pause: false,
      audio: undefined,
      track: undefined,
      duration: 0,
      channel: false,
      channels: [
        'electronic',
        'downtempo',
        'classical',
        'rain'
      ]
    }
  },
  created() {
    if (process.browser) {
      this.audio = new Audio('')
      this.$store.commit('setChannel', this.channels[2])

      $(function () {
        feather.replace()
      })
    }
  },
  methods: {
    playSong (track) {
      if (track) {
        if (this.play) {
          this.play = false
          this.pause = true
          return this.audio.play()
        }
        this.audio.src = track

        this.audio.play()
        this.audio.onended = () => {
          this.$store.commit('nextTrack', { index: this.$store.state.trackIndex, channel: this.$store.state.channel })
        }
        this.pause = true
        this.play = false
      } else {
          this.$store.commit('firstTrack', this.$store.state.channel)
      }
    },
    pauseSong () {
        this.audio.pause()
        this.play = true
        this.pause = false
    },
    async nextSong () {
      this.$store.commit('nextTrack', { index: this.$store.state.trackIndex, channel: this.$store.state.channel })
    },
    async previousSong () {
      this.$store.commit('previousTrack', { index: this.$store.state.trackIndex, channel: this.$store.state.channel })
    },
    setChannel (i) {
      this.$store.commit('setChannel', this.channels[i])
      this.$store.commit('nextTrack', { index: this.$store.state.trackIndex, channel: this.$store.state.channel })
    }
  },
  watch: {
    '$store.state.track'(v) {
      this.playSong(v.url)
    }
  }
}
</script>
