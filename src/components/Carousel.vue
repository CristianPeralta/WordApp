<template lang="html">
  <div id="slider" class="content-slide" v-if="words.length>0">
    <transition-group tag="div" :name="transitionName">
      <div v-if="(show)&&(words[current].word)" :key="current" class="slide" :class="slides[currentColor].className">
        <p>
          <span>Do you know "</span>
          <b @click="search(words[current].word)">{{words[current].word}}</b>
          <span>"?</span>
        </p>
      </div>
    </transition-group>
    <div class="btn-slide btn-prev" aria-label="Previous slide" @click="slide(-1)">
      &#10094;
    </div>
    <div class="btn-slide btn-next" aria-label="Next slide" @click="slide(1)">
      &#10095;
    </div>
    <footer>
      <span>Based</span>
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
      currentColor: 0,
      currentColot: 0,
      direction: 1,
      transitionName: 'fade',
      show: false,
      slides: [
        { className: 'blue' },
        { className: 'red' },
        { className: 'yellow' },
        { className: 'green' }
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
      this.currentColor = (this.currentColor + dir % len + len) % len
      this.current++
      console.log(this.current)
    },
    search () {

    },
    getRandomWord () {
      wordnikServices.randomWord().then((response) => {
        this.words.push(response.data)
      })
    },
    infinity () {
      setInterval(() => {
        this.slide(1)
      }, 3000)
    }
  },
  created () {
    this.getRandomWord()
  },
  mounted () {
    this.show = true
    this.infinity()
  }
}
</script>

<style lang="css">
@import '../assets/css/carousel.css';
</style>
