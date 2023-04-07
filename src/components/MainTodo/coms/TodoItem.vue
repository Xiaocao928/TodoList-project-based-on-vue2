<template>
  <div class="todo-item">
    <input type="checkbox" />
    <label for="">{{ todo.content }} </label>
    <button></button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="stylus">
@import '~styles/mixins.styl'
@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@400;600&family=Zhi+Mang+Xing&display=swap');
.todo-item
    display: flex
    justify-content: space-between
    align-items: center
    margin:0 15px
    margin-top: 10px
    padding: 10px
    border-radius: 50px
    font-size:24px
    background-color: rgba(255,255,255,0.3)
    box-sizing: border-box
    &:hover
      border:3px dashed #7ea9af
      button::after
        content: url('~images/delete.svg')
    input[type='checkbox']
      width 40px
      height 40px
      clearDefault()
      &::after
       content: url('~images/unchecked.svg')
      &:checked::after
        content: url('~images/checked.svg')
    label
      flex:1
      padding-left: 10px
      font-family: 'sanjihexi'
      color:#333
    button
      width: 40px
      height: 40px
      clearDefault()
      background-color: transparent
</style>
