<template>
  <div class="todo-info">
    <span class="total">{{ total }} items left</span>
    <div class="tab">
      <a
        href="#"
        v-for="(state, index) in states"
        :key="index"
        :class="state == active ? 'current' : ''"
        @click="handleClick(state)"
      >
        {{ state }}
      </a>
    </div>
    <a href="#" class="clear" @click="$emit('del')">clear Completd</a>
  </div>
</template>

<script>
export default {
  name: 'TodoInfo',
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      states: ['all', 'active', 'completed'],
      active: 'all',
    }
  },
  methods: {
    handleClick(s) {
      this.active = s
      this.$emit('change', s)
    },
  },
}
</script>

<style lang="stylus">
.todo-info
  display:flex
  justify-content: space-between
  align-items: center
  height:30px
  margin:10px 20px
  padding:12px 10px
  box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.3)
  border-radius: 5px
  font-family:'sanjihexi'
  font-size: 25px
  .total
    color:whitesmoke
    margin-left:10px
    font-size: 35px
  .tab
    display:flex
    justify-content: space-evenly
    width 200px

    a
      padding:5px 10px
      margin:0 5px
      border: 2px solid #345964
      border-radius:5px
      color:#000
      font-weight: 700
      text-decoration: none
      &.current
        background-color #719ba2
        color:#fff
  .clear
    padding:5px 10px
    margin:0 5px
    border: 2px solid #345964
    border-radius:5px
    color:#000
    font-weight: 700
    text-decoration: none
</style>
