<template>
  <header class="main-header">
    <h1>TodoList</h1>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@400;600&display=swap');
.main-header
  text-align:center
  h1
    margin:20px auto
    width 400px
    font-family: 'Alkatra', cursive;
    font-size 100px
    color:#47737e
    font-weight :200
    text-shadow:5px 5px 10px rgb(0,0,0,0.3)
    // background-image: linear-gradient(90deg,#bdc9bd 0%,#1f3b3f 100%)
    // -webkit-background-clip: text
    // -webkit-text-fill-color: transparent
</style>
