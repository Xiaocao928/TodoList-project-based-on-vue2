<template>
  <div class="hotlist">
    <h4 class="sort">知乎热榜:</h4>
    <ul class="list">
      <li v-for="list in lists" :key="list.index" class="title">
        <a :href="list.mobilUrl" class="content" target="_blank">
          {{ list.index }}.{{ list.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HotList',
  data() {
    return {
      lists: null,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('https://api.vvhan.com/api/hotlist?type=zhihuHot')
        .then(res => {
          // console.log(res)
          this.lists = res.data.data
          // console.log(this.type)
        })
        .catch(error => {
          console.error(error)
        })
    },
  },
}
</script>

<style lang="stylus">
.hotlist

    font-family: 'ruhuaxingkai'
    color: whitesmoke
    box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.3)
    border-radius: 5px

    font-size: 16px
    transition: all 0.3s
    .sort
        margin:3px 5px
    .list
        height: 200px

        overflow: auto
        &::-webkit-scrollbar
            width 8px
        &::-webkit-scrollbar-thumb
            background: #85afb1
            border-radius 5px
        &::-webkit-scrollbar-track
            background: rgba(255,255,255,0.5)
            border-radius 5px
        .title
            margin: 0px 3px
            .content
                color:whitesmoke
                text-decoration: none
</style>
