<template>
  <div>
    MainTodo
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

<style></style>
