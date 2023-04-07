<template>
  <div class="main-todo">
    <input
      class="add-todo"
      type="text"
      placeholder="Press Enter to add a todo ↵"
    />
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>

    <todo-info></todo-info>
  </div>
</template>

<script>
import TodoItem from './coms/TodoItem'
import TodoInfo from './coms/TodoInfo'
export default {
  name: 'MainTodo',
  components: {
    TodoItem,
    TodoInfo,
  },
  data() {
    return {
      todos: [
        { id: 1, content: '代办1', completed: false },
        { id: 2, content: '代办2', completed: true },
        { id: 3, content: '代办3', completed: false },
      ],
    }
  },
  created() {
    this.$http.get('http://localhost:3000/todos').then(res => {
      console.log(res)
      this.todos = res.data
    })
  },
}
</script>

<style lang="stylus">
@import '~styles/mixins.styl'
.main-todo
    width 600px
    margin 0 auto
    border-top: rgba(255,255,255,0.2)
    border-right: rgba(255,255,255,0.2)
    background-color: rgba(255,255,255,0.2)
    backdrop-filter: blur(5px)
    border-radius: 20px
    box-shadow: 0 15px 20px rgba(255,255,255,0.2)
    .add-todo
       width: 95%
       margin:10px 15px
       padding 16px 16px 16px 36px
       background-color: rgba(255,255,255,0.3)
       font-size: 24px
       font-weight: 300
       color: #333
       border-radius: 50px
       font-family:'Alkatra', cursive
       box-sizing: border-box
       clearDefault()
</style>
