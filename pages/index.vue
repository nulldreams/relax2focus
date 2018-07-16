<template>
  <div class="principal">
    <vue-loader v-if="loading" direction="bottom-right" image="http://www.wellnessexpome.com/wp-content/uploads/2018/06/pre-loader.gif" :text="loadingMessage" text-color="#786fa6" />
    <!-- <feedback /> -->
    <div v-if="feedback" class="overlay">
      <div class="content">
        <div class="feedback">
          <div v-if="feedbackResponse" class="response animated rubberBand">
            <p>❤</p>         
            <p>{{feedbackResponse}}</p>
          </div>
          <div class="form" v-if="!feedbackResponse">
            <div class="name">
              <input type="text" name="" v-model="feedbackData.name" id="" placeholder="name">
            </div>
            <div class="contact">
              <input type="text" name="" v-model="feedbackData.contact" id="" placeholder="email or github">
            </div>
            <div class="message">
              <textarea name="" id="" v-model="feedbackData.message" cols="30" rows="10" placeholder="message"></textarea>
            </div>
            <div class="send">
              <a @click="sendFeedback()">Send 🚀</a>
              <a @click="feedback = false"> exit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="channel" class="overlay" @click="channel = false">
      <div class="content">
        <div class="channels">
          <div class="channel" @click="setChannel(0)">electronic</div>
          <div class="channel" @click="setChannel(1)">downtempo</div>
          <div class="channel" @click="setChannel(2)">classical</div>
          <div class="channel" @click="setChannel(3)">rain</div>
          <div class="channel" @click="setChannel(4)">minecraft soundtrack</div>
        </div>
      </div>
    </div>
    <div v-if="trackinfo" class="overlay" @click="trackinfo = false">
      <div class="content">
        <div class="trackinfo">
          <p class="title">{{$store.state.track.title}}</p>
          <p class="artist">{{$store.state.track.artist}}</p>
          <div v-if="$store.state.track.permalink" class="href">
            <a :href="$store.state.track.permalink" target="new_blank()" class="href">see the artist page</a>
          </div>
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
      <div class="bonus">
        <p style="cursor: pointer;" @click="channel = true">channels</p>
        <span class="volume">
          <div @click="volumeDecrease()" class="decrease">
            <i data-feather="volume-1"></i>
          </div>
          <div @click="volumeIncrease()" class="increase">
            <i data-feather="volume-2"></i>
          </div>
        </span>
        <p style="cursor: pointer;" @click="trackinfo = true">track info</p>
        <p style="cursor: pointer;" @click="feedback = true">feedback/sugestions</p>
      </div>
    </div>
  </div>
</template>
<style>
  @import url('https://fonts.googleapis.com/css?family=Muli');

  p, a {
    font-family: 'Muli', sans-serif;
  }
  a {
    text-decoration: none;
    color: #fff;
  }

  .principal .overlay .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .principal .overlay .content .trackinfo {
    width: 400px;
    color: #fff;

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .principal .overlay .content .trackinfo p {
    margin: 5px;
  }
  .principal .overlay .content .trackinfo .href {
    background: #a29bfe;
    width: 60%;
    height: 40px;
    border-radius: .30em;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-top: 10px; */
  }
  .principal .overlay .content .trackinfo .title {
    font-size: 20px;
  }
  .principal .overlay .content .trackinfo .artist {
    font-size: 18px;
    margin-bottom: 20px;
  }
  .principal .overlay .content .trackinfo .feather {
    stroke: #fff;
  }
  .principal .overlay .content .feedback {
    background: rgba(25, 25, 25, .8);
    height: 350px;
    width: 400px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: .30em;
  }
  .principal .overlay .content .feedback .response {
    color: #fff;
    padding: 10px;
    text-align: center;
    font-size: 17px;
  }
  .principal .overlay .content .feedback .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    padding: 5px;
  }
  .principal .overlay .content .feedback .form > .name, .principal .overlay .content .feedback .form > .contact {
    width: 45%;
    height: 50px;
  }
  .principal .overlay .content .feedback .form > .name {
    margin-right: 10px;
  }
  .principal .overlay .content .feedback .form > .contact {
    margin-left: 10px;
  }
  .principal .overlay .content .feedback .form > .message {
    width: 100%;
    padding: 10px;
  }
  .principal .overlay .content .feedback .form > .send {
    width: 100%;
    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .principal .overlay .content .feedback .form .send a:first-child {
    background: #a29bfe;
    width: 80%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: .30em;
    border-bottom-left-radius: .30em;
    cursor: pointer;
  }
  .principal .overlay .content .feedback .form .send a:last-child {
    background: #ff7675;
    width: 20%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: .30em;
    border-bottom-right-radius: .30em;
    cursor: pointer;
  }
  .principal .overlay .content input, .principal .overlay .content textarea {
    background: rgba(25, 25, 25, 1.0);
    border: none;
    color: #fff;
    padding: 10px;
    outline: none;
    border-radius: .50em;
    width: 100%;
    resize: none;
    font-family: 'Muli', sans-serif;
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
  .principal .player .bonus {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    flex-wrap: wrap;

    width: 250px;
  }
  .principal .player .bonus p {
    margin: 10px;
  }
  .principal .player .bonus .volume {
    display: flex;
    flex-direction: row;
  }
  .principal .player .bonus .feather {
    stroke: #777;
    width: 20px;
    height: 20px;
    cursor: pointer;
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
  .principal .loading-box {
    z-index: 11;
  }
</style>
<script>
import feedback from '@/components/feedback'
import vueLoader from '~/node_modules/@nulldreams/vue-loading/src/vue-loading'

export default {
  components: {
    vueLoader,
    feedback
  },
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
      loading: false,
      channel: false,
      trackinfo: false,
      feedback: false,
      loadingMessage: 'Focusing song...',
      feedbackResponse: undefined,
      feedbackData: {
        name: '',
        contact: '',
        message: ''
      },
      channels: [
        'electronic',
        'downtempo',
        'classical',
        'rain',
        'minecraft'
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
    playSong (track, alterou) {
      if (track) {
        this.loading = true
        if (this.play && alterou) {
          this.audio.src = track
          this.play = false
          this.pause = true
          return this.audio.play()
        }
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
      if (this.$store.state.trackIndex > 0) {
        this.$store.commit('previousTrack', { index: this.$store.state.trackIndex, channel: this.$store.state.channel })
      }
    },
    setChannel (i) {
      this.$store.commit('setChannel', this.channels[i])
      this.$store.commit('nextTrack', { index: this.$store.state.trackIndex, channel: this.$store.state.channel })
    },
    volumeIncrease () {
      this.audio.volume = this.audio.volume + 0.2
    },
    volumeDecrease () {
      this.audio.volume = this.audio.volume - 0.2
    },
    sendFeedback () {
      if (this.feedbackData.name && this.feedbackData.contact && this.feedbackData.message) {
        if (this.feedbackData.contact.indexOf('@') === -1) {
          this.feedbackData.contact = `@${this.feedbackData.contact}`
        }

        this.loadingMessage = 'Sending...'
        this.loading = true
        this.$http.post(`https://relax2focus.herokuapp.com/feedback`, this.feedbackData).then(response => {
          this.feedbackResponse = response.body.message
          this.loading = false
          setTimeout(() => {
          this.feedbackResponse = undefined
          this.feedback = false
          }, 3000);
        },
        response => {
            console.log(response);
        })
      } else {
        this.feedbackResponse = 'please, fill the fields'
        setTimeout(() => {
        this.feedbackResponse = undefined
        }, 3000);
      }
    }
  },
  watch: {
    '$store.state.track'(v) {
      this.playSong(v.url, true)
      this.loading = false
    }
  }
}
</script>
