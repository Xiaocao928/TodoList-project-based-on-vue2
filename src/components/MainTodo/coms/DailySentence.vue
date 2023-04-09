<template>
  <div class="sentence">
    <h3 class="text-title">每日一句:</h3>
    <p class="zh">{{ sentence.chinese }}</p>
    <p class="en">{{ sentence.english }}</p>
  </div>
</template>

<script>
export default {
  name: 'DailySentence',
  data() {
    return {
      sentence: { chinese: '', english: '' },
    }
  },
  mounted() {
    this.$http
      .get('https://api.vvhan.com/api/en?type=sj')
      .then(res => {
        //console.log(res)
        this.sentence.chinese = res.data.data.zh
        this.sentence.english = res.data.data.en
      })
      .catch(error => {
        console.error(error)
      })
  },
}
</script>

<style lang="stylus">
.sentence
  margin 10px 10px
  padding:5px 10px
  box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.3)
  border-radius: 5px
  font-size: 18px
  font-family: 'ruhuaxingkai'
  color: whitesmoke
</style>
