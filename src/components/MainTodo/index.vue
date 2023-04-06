<template>
  <div class="main-todo">
    <input
      class="add-todo"
      type="text"
      placeholder="Press Enter to add a todo ↵"
    />
    <todo-item></todo-item>
    <todo-item></todo-item>
    <todo-item></todo-item>
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
}
</script>

<style lang="stylus">
.main-todo
    width 600px
    margin 0 auto
    background-color: rgba(255,255,255,0.2)
    border-radius: 20px
    box-shadow: 0 0 5px #666
    .add-todo
       width: 95%
       margin:8px 15px
       padding 16px 16px 16px 36px
       background-color: rgba(255,255,255,0.2)
       font-size: 24px
       font-weight: 300
       color: #333
       border-radius: 50px
       font-family:'Alkatra', cursive
       box-sizing: border-box
       appearance: none
       border: none
       outline: none
</style>
