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
      <div class="todo-header">
        <input
          class="select"
          type="checkbox"
          :checked="isAllCompleted"
          @change="handleSelectAll"
        />
        <input
          class="add-todo"
          type="text"
          placeholder="Press Enter to add a todo ↵"
          autofocus
          v-model.lazy.trim="content"
          @keyup.enter="handleAdd"
        />
      </div>

      <div class="todo-list" v-if="todos.length">
        <draggable v-model="todos">
          <todo-item
            v-for="todo in filterTodos"
            :key="todo.id"
            :todo="todo"
            @change="handleChange"
            @update="handleUpdate"
            @del="handleDelete"
          ></todo-item>
        </draggable>
      </div>
      <div class="no-todo" v-else>无待办事项</div>
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
import draggable from 'vuedraggable'
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
    draggable,
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
    isAllCompleted() {
      return this.todos.every(item => item.completed)
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
    handleTabChange(s) {
      this.state = s
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
    handleSelectAll(event) {
      console.log('进来了')
      const isChecked = event.target.checked
      this.todos.forEach(todo => {
        todo.completed = isChecked
      })

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

      .todo-header
        display: flex
        width: 95%
        margin:14px 12px
        padding:5px 5px
        align-items:center
        border-radius: 50px
        box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.3)
        .select
          clearDefault()
          margin: 0 5px
          padding-left:20px
          padding-right:5px
          width 40px
          height 32px
          &::after
            content: url('~images/unchecked3.svg')
          &:checked::after
            content: url('~images/checked3.svg')
        .add-todo
          flex:1
          padding 10px 16px 10px 36px
          background-color: rgba(255,255,255,0.3)
          margin:0 15px
          border-radius: 5px
          font-size: 24px
          font-weight: 300
          color: #333
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
      .no-todo
        box-shadow:2px 2px 4px 4px rgba(0, 0, 0, 0.3)
        border-radius:5px
        margin:3px 20px
        padding:10px 0
        height 250px
        font-size: 55px
        font-weight: 500
        line-height: 250px
        text-align: center
        font-family: 'sanjihexi'
        color:whitesmoke
// @media screen and (max-width:1380px) {
// .main-todo
//     width:80%
//     flex-direction: column-reverse
// }
@media screen and (max-width:1380px)
  .main-todo
    width:70%
    flex-direction: column-reverse
</style>
