<template>
  <div class="main-todo">
    <div class="menu-left">
      <div class="menu-header">
        <the-time></the-time>
        <the-music></the-music>
      </div>
      <div class="menu-main">
        <div class="main-left">
          <the-weather></the-weather>
          <daily-sentence></daily-sentence>
        </div>
        <div class="main-right">
          <hot-list></hot-list>
        </div>
      </div>
    </div>
    <div class="menu-right">
      <input
        class="add-todo"
        type="text"
        placeholder="Press Enter to add a todo ↵"
        autofocus
        v-model.lazy.trim="content"
        @keyup.enter="handleAdd"
      />
      <div class="todo-list">
        <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @change="handleChange"
          @update="handleUpdate"
        ></todo-item>
      </div>
      <todo-info></todo-info>
    </div>
  </div>
</template>

<script>
import TodoItem from './coms/TodoItem'
import TodoInfo from './coms/TodoInfo'
import TheTime from './coms/TheTime'
import TheWeather from './coms/TheWeather'
import TheMusic from './coms/TheMusic'
import DailySentence from './coms/DailySentence'
import HotList from './coms/HotList'
export default {
  name: 'MainTodo',
  components: {
    TodoItem,
    TodoInfo,
    TheTime,
    TheWeather,
    TheMusic,
    DailySentence,
    HotList,
  },
  data() {
    return {
      todos: [],
      content: '',
    }
  },
  created() {
    this.getTodos()
  },
  methods: {
    getTodos() {
      this.$http.get('http://localhost:3000/todos').then(res => {
        // console.log(res)
        this.todos = res.data
      })
    },
    handleAdd() {
      if (this.content == '') {
        alert('请输入内容')
        return
      }
      this.$http
        .post('http://localhost:3000/todos', {
          content: this.content,
          completed: false,
        })
        .then(res => {
          this.content = ''
          this.getTodos()
        })
    },
    handleChange(id, checked) {
      this.$http
        .patch(`http://localhost:3000/todos/${id}`, {
          completed: checked,
        })
        .then(res => {
          console.log(res)
          this.getTodos()
        })
    },
    handleUpdate(id, value) {
      this.$http
        .patch(`http://localhost:3000/todos/${id}`, { content: value })
        .then(res => {
          this.getTodos()
        })
    },
  },
}
</script>

<style lang="stylus">
@import '~styles/mixins.styl'
.main-todo
    width 90%
    margin 0 auto
    display: flex
    border-top: rgba(255,255,255,0.2)
    border-right: rgba(255,255,255,0.2)
    background-color: rgba(255,255,255,0.2)
    -webkit-backdrop-filter:blur(5px)
    border-radius: 20px
    box-shadow: 0 15px 20px rgba(255,255,255,0.2)
    .menu-left
      flex: 5
      .menu-header
        display: flex
        .clock
          flex: 1
        .music
          flex: 1
      .menu-main
        display: flex
        .main-left
          flex:7

        .main-right
          flex:3
      // background-color pink
    .menu-right
      flex: 5

      // background-color: green
      .add-todo
        width: 95%
        margin:10px 15px
        padding 13px 13px 13px 36px
        background-color: rgba(255,255,255,0.3)
        box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.3)
        font-size: 24px
        font-weight: 300
        color: #333
        border-radius: 50px
        font-family:'Alkatra', cursive
        box-sizing: border-box
        clearDefault()
      .todo-list
        overflow: hidden
        box-shadow:2px 2px 4px 4px rgba(0, 0, 0, 0.3)
        border-radius:5px
        margin:3px 20px
        padding:10px 0
        height 250px
        transition: all 0.3s
        &::-webkit-scrollbar
          width 8px
        &::-webkit-scrollbar-thumb
          background: #85afb1
          border-radius 5px
        &::-webkit-scrollbar-track
          background: rgba(255,255,255,0.5)
          border-radius 5px
        &:hover
          overflow-y:scroll
</style>
