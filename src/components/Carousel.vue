<template lang="html">
  <div id="slider" class="content-slide">
    <transition-group tag="div" :name="transitionName">
      <div v-if="show" :key="current" class="slide" :class="slides[current].className">
        <p>I'm {{slides[current].className}}!</p>
      </div>
    </transition-group>
    <div class="btn-slide btn-prev" aria-label="Previous slide" @click="slide(-1)">
      &#10094;
    </div>
    <div class="btn-slide btn-next" aria-label="Next slide" @click="slide(1)">
      &#10095;
    </div>
    <footer>
      <span>By</span>
      <a href="https://codepen.io/adaban/pen/qoqLJb">Ada</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      current: 0,
      direction: 1,
      transitionName: 'fade',
      show: false,
      slides: [
        { className: 'blue' },
        { className: 'red' },
        { className: 'yellow' }
      ]
    }
  },
  methods: {
    slide (dir) {
      this.direction = dir
      dir === 1
        ? (this.transitionName = 'slide-next')
        : (this.transitionName = 'slide-prev')
      var len = this.slides.length
      this.current = (this.current + dir % len + len) % len
    }
  },
  mounted () {
    this.show = true
  }
}
</script>

<style lang="css">
@import '../assets/css/carousel.css';
</style>
