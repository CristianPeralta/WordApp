<template lang="html">
  <div class="">
    <a @click="changeStatus" class="button is-large is-focused" style="margin-top: 10px;text-align:center;">Word of Day</a>
    <div class="modal" :class="{'is-active': status}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{title}}</p>
          <button @click="changeStatus" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <slot></slot>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['title'],
  data () {
    return {
      status: false
    }
  },
  methods: {
    changeStatus () {
      this.status = !this.status
    }
  }
}
</script>

<style lang="css">
</style>
