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
          v-for="todo in filterTodos"
          :key="todo.id"
          :todo="todo"
          @change="handleChange"
          @update="handleUpdate"
          @del="handleDelete"
        ></todo-item>
      </div>
      <todo-info
        :total="total"
        @change="handleTabChange"
        @del="handleDelCompleted"
      >
      </todo-info>
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
      state: 'all',
    }
  },
  computed: {
    total() {
      return this.todos.filter(item => item.completed == false).length
    },
    filterTodos() {
      switch (this.state) {
        case 'all':
          return this.todos
        case 'active':
          return this.todos.filter(item => item.completed == false)
        case 'completed':
          return this.todos.filter(item => item.completed == true)
      }
    },
  },
  created() {
    this.getTodos()
  },
  methods: {
    getTodos() {
      // this.$http.get('http://localhost:3000/todos').then(res => {
      //   // console.log(res)
      //   this.todos = res.data
      // })
      let res = localStorage.getItem('todos')
      if (!res) {
        // 第一次读取, todos中是没有数据的
        localStorage.setItem('todos', JSON.stringify([]))
      } else {
        this.todos = JSON.parse(res)
      }
    },
    handleAdd() {
      if (this.content == '') {
        alert('请输入内容')
        return
      }
      //
      const max = Math.max(...this.todos.map(item => item.id))
      console.log(max)
      this.todos.push({
        id: max < 0 ? 1 : max + 1,
        content: this.content,
        completed: false,
      })
      this.content = ''

      // 保存数据
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    handleChange(id, checked) {
      // this.$http
      //   .patch(`http://localhost:3000/todos/${id}`, {
      //     completed: checked,
      //   })
      //   .then(res => {
      //     console.log(res)
      //     this.getTodos()
      //   })
      const todo = this.todos.find(item => item.id == id)
      todo.completed = checked

      // 保存数据
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    handleUpdate(id, value) {
      const todo = this.todos.find(item => item.id == id)
      todo.content = value

      // 保存数据
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    handleDelete(id) {
      //confirm确认框
      const result = window.confirm('确认删除吗')
      if (result) {
        const index = this.todos.findIndex(item => item.id == id)
        this.todos.splice(index, 1)

        // 保存数据
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    },
    handleTabChange(state) {
      this.state = state
    },
    handleDelCompleted() {
      // this.$http
      //   .delete('http://localhost:3000/todos?completed=true')
      //   .then(res => {
      //     setTimeout(() => {
      //       this.getTodos()
      //     }, 100)
      //   })
      const filter = this.todos.filter(item => item.completed == false)
      this.todos = filter

      // 保存数据
      localStorage.setItem('todos', JSON.stringify(this.todos))
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
          overflow-y:auto
</style>
