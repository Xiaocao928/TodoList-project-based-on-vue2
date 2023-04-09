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

.main-header
  text-align:center
  margin-top:30px

  h1
    margin:30px auto
    width 400px
    font-family: 'english'
    font-size 100px
    color:#88b2b6
    font-weight :200
    text-shadow:5px 5px 10px rgb(0,0,0,0.3)
    animation: breathing-light 1s alternate infinite forwards;
@keyframes breathing-light
    0%
        color: #97bdbe
    100%
        color: #6f9aa1

    // background-image: linear-gradient(90deg,red 0%,green 100%)
    // -webkit-background-clip: text
    // color: transparent
</style>
