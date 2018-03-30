<template lang="html">
  <div id="slider" class="content-slide" v-if="words.length>0">
    <transition-group tag="div" :name="transitionName">
      <div v-if="(show)&&(current>=0)&&(words[current].word)" :key="current" class="slide" :class="slides[currentColor].className">
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
    <footer style="hidden: true; ;text-align: center; background: #4dff4d">
      <a href="https://codepen.io/adaban/pen/qoqLJb">Ada</a>
    </footer>
  </div>
</template>

<script>
import wordnikServices from '@/services/wordnik'

export default {
  name: 'Carousel',
  props: ['automaticSlide', 'currentWord'],
  data () {
    return {
      current: -1,
      currentColor: 0,
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
  watch: {
    currentWord (val) {
      if (this.currentWord) {
        console.log(this.currentWord)
        this.$emit('saveCurrentWord', this.words[this.current].word)
      }
    }
  },
  methods: {
    async slide (dir) {
      this.direction = dir
      if (dir === 1) {
        this.transitionName = 'slide-next'
        await this.getRandomWord()
        this.current++
      } else {
        this.transitionName = 'slide-prev'
        this.current--
      }
      var len = this.slides.length
      this.currentColor = (this.currentColor + dir % len + len) % len
    },
    search (word) {
      this.$emit('clicked', word)
    },
    getRandomWord () {
      wordnikServices.randomWord().then((response) => {
        this.words.push(response.data)
      }).then(() => {

      })
    },
    infinity () {
      setInterval(() => {
        if (this.automaticSlide === true) {
          this.slide(1)
        }
      }, 3000)
    }
  },
  created () {
    this.getRandomWord()
  },
  mounted () {
    this.show = true
    this.slide(1)
    this.infinity()
  }
}
</script>

<style lang="css">
@import '../assets/css/carousel.css';
</style>
