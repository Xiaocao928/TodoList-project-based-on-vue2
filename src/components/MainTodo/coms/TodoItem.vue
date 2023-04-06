<template>
  <div class="todo-item">
    <input type="checkbox" />
    <label for="">Hello World 你好</label>
    <button></button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
}
</script>

<style lang="stylus">
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
      border:1px dashed #7ea9af
      button::after
        content: url(../../../assets/images/delete.svg)
    input[type='checkbox']
      width 40px
      height 40px
      appearance: none
      border:none
      outline:none
      &::after
       content: url(../../../assets/images/unchecked.svg)
      &:checked::after
        content: url(../../../assets/images/checked.svg)
    label
      flex:1
      padding-left: 10px
      font-family: 'Zhi Mang Xing', cursive
      color:#333
    button
      width: 40px
      height: 40px
      appearance: none
      border:none
      outline:none
      background-color: transparent
</style>
