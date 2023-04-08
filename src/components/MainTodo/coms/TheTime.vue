<template>
  <div class="clock">
    {{ time }}
  </div>
</template>

<script>
export default {
  name: 'TheTime',
  data() {
    return {
      time: null,
    }
  },
  methods: {
    updateTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      this.time = `${hours}:${minutes}`
    },
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 1000)
  },
}
</script>

<style lang="stylus">
.clock
  font-size: 6em;
  font-family: 'english'
  font-family: 'ruhuaxingkai'
  // font-family: 'sanjihexi'
  // text-align: center;
  padding: 1rem
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3)
  color: whitesmoke
  height: 80px
  width:150px
  margin: 10px 10px
  line-height: 80px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
</style>
