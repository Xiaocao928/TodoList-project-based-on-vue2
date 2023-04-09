<template>
  <div class="todo-item">
    <input type="checkbox" :checked="todo.completed" @change="handleChange" />
    <input
      v-if="isEdit"
      v-focus
      type="text"
      :value="todo.content"
      @keyup.enter="handleUpdate"
      @blur="handleUpdate"
      @keyup.esc="isEdit = false"
    />
    <label
      v-else
      :class="todo.completed ? 'completed' : ''"
      @dblclick="isEdit = true"
    >
      {{ todo.content }}
    </label>
    <button></button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', this.todo.id, e.target.checked)
    },
    handleUpdate(e) {
      if (e.target.value.trim() == '') {
        alert('内容不能为空')
        return
      }

      if (this.isEdit) {
        this.isEdit = false
        this.$emit('update', this.todo.id, e.target.value)
      }
    },
  },
}
</script>

<style lang="stylus">
@import '~styles/mixins.styl'

.todo-item
    display: flex
    justify-content: space-between
    align-items: center
    margin:0 15px
    margin-top: 10px
    padding: 3px
    border-radius: 50px
    font-size:24px
    background-color: rgba(255,255,255,0.3)
    box-sizing: border-box
    &:hover
      border:3px dashed #7ea9af
      button::after
        content: url('~images/delete1.svg')
    input[type='checkbox']
      width 40px
      height 32px
      margin-left:10px
      clearDefault()
      &::after
       content: url('~images/unchecked1.svg')
      &:checked::after
        content: url('~images/checked1.svg')
    label
      flex:1
      padding-left: 10px
      font-family: 'sanjihexi'
      color:#333
      transition: all 0.3s cubic-bezier(.645,.045,.355,1)
      &.completed
        text-decoration: line-through
        color:#666
    input[type="text"]
      width 100%
      margin:0px 10px
      padding 10px
      clearDefault()
      font-family: 'sanjihexi'
      background-color: rgba(255,255,255,0.3)
      border-radius: 50px
      font-size: 19px
      line-height: 20px
    button
      width: 40px
      height: 40px
      clearDefault()
      background-color: transparent
</style>
