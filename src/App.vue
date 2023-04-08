<template>
  <div id="app">
    <main-header></main-header>
    <main-todo>
      <div>hello word</div>
    </main-todo>
    <main-footer></main-footer>
  </div>
</template>

<script>
//.vue .js .mjs后缀可以省略
//支持文件夹的情况
import MainHeader from './components/MainHeader'
import MainTodo from './components/MainTodo'
import MainFooter from './components/MainFooter'
export default {
  name: 'App',
  components: {
    MainHeader,
    MainTodo,
    MainFooter,
  },
}
</script>

<style lang="stylus">
@import '~styles/reset.styl'
</style>
