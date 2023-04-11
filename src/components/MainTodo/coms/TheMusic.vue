<template>
  <div class="music">
    <div class="title">
      <span>{{ music.name }}--{{ music.auther }}</span>
    </div>
    <div class="panel">
      <img
        :src="music.picUrl"
        alt=""
        :class="{ 'pic-stop': true, 'pic-start': active }"
        :style="{ animationPlayState: RotateState }"
      />
      <audio
        ref="audioRef"
        :src="music.mp3url"
        controls
        @ended="next"
        class="player"
      ></audio>
    </div>
    <div class="control">
      <button @click="next" class="item">
        <i class="iconfont icon-shangyishoushangyige"></i>
      </button>
      <button @click="pause" class="item">
        <i :class="PlayState"> </i>
      </button>
      <button @click="next" class="item">
        <i class="iconfont icon-xiayigexiayishou"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheMusic',
  data() {
    return {
      music: { auther: '', mp3url: '', name: '', picUrl: '', status: '' },
      audio: null,
      active: false,
      RotateState: 'paused',
    }
  },
  computed: {
    PlayState() {
      return ['iconfont', this.active ? 'icon-zanting' : 'icon-24gl-playCircle']
    },
  },
  mounted() {
    this.audio = this.$refs.audioRef
    this.loadSong()
  },
  methods: {
    async loadSong() {
      try {
        const res = await this.$http.get(
          'https://api.vvhan.com/api/rand.music?type=json&sort=热歌榜'
        )
        //console.log(res.data)
        const data = res.data
        this.music.auther = data.info.auther
        this.music.mp3url = data.info.mp3url
        //console.log(this.music.mp3url)
        this.music.name = data.info.name
        this.music.picUrl = data.info.picUrl
        this.music.status = data.success
        //console.log(this.music.status)
      } catch (error) {
        console.error(error)
        this.music.status = false
      }
    },
    async play() {
      try {
        await this.audio.play()
      } catch (error) {
        console.error(error)
      }
    },
    async pause() {
      try {
        if (this.active) {
          await this.audio.pause()
          this.RotateState = 'paused'
        } else {
          await this.audio.play()
          this.RotateState = 'running'
        }
        this.active = !this.active
      } catch (error) {
        console.error(error)
      }
    },
    async next() {
      this.loadSong().then(() => {
        this.play()
        this.active = true
      })
    },
  },
}
</script>

<style lang="stylus">
@import 'https://at.alicdn.com/t/c/font_4003533_1q5gifvma70j.css'
@import '~styles/mixins.styl'
.music
    border-radius: 5px;
    box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.3)
    color: whitesmoke
    height: 112px
    margin: 10px 2px
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
    .title
        margin: 2px 2px
        font-family: 'ruhuaxingkai'
        font-size: 20px
        overflow: hidden
        color: whitesmoke
    .panel
        display: flex
        .pic-start
            width:54px
            height:54px
            border-radius:54px
            animation: rotate 4s linear infinite
            animation-play-state: running;
        .pic-stop
            width:54px
            height:54px
            border-radius:54px

        .player
            clearDefault()
            width: 300px
            opacity: 0.2
     .control
        color: whitesmoke
        display: flex
        justify-content: space-evenly
        align-items: center
        .item
          width 35px
          height 35px
          clearDefault()

          color: whitesmoke
          background-color: rgba(255,255,255,0)
          i
            color:#457079
            font-size: 24px
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@media screen and (max-width:1380px)
  .music
    margin-right:10px
</style>
