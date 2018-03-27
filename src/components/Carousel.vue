<template lang="html">
  <div id="slider" class="content-slide">
    <transition-group tag="div" :name="transitionName">
      <div v-if="show" :key="current" class="slide" :class="slides[current].className">
        <p>You know {{words[current].word}}?</p>
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
import wordnikServices from '@/services/wordnik'

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
        { className: 'yellow' },
        { className: 'green'}
      ],
      words: []
    }
  },
  methods: {
    slide (dir) {
      this.direction = dir
      if (dir === 1) {
        this.transitionName = 'slide-next'
        this.getRandomWord()
      } else {
        this.transitionName = 'slide-prev'
      }
      var len = this.slides.length
      this.current = (this.current + dir % len + len) % len
      console.log(this.current)
    },
    getRandomWord () {
      wordnikServices.randomWord().then((response) => {
        console.log(response)
        this.words.push(response.data)
      })
    }
  },
  mounted () {
    this.show = true
    this.getRandomWord()
  }
}
</script>

<style lang="css">
@import '../assets/css/carousel.css';
</style>
