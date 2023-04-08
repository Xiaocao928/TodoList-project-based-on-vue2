<template>
  <div>
    <h3>每日一句</h3>
    <p>{{ sentence.chinese }}</p>
    <p>{{ sentence.english }}</p>
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
        console.log(res)
        this.sentence.chinese = res.data.data.zh
        this.sentence.english = res.data.data.en
      })
      .catch(error => {
        console.error(error)
      })
  },
}
</script>

<style></style>
