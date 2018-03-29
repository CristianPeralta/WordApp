<template>
  <div>
    <a href="#" style="position: fixed; top: 0px;">
      <span @click="backHome()" class="icon is-medium" style="margin: 10px;">
        <svg class="svg-inline--fa fa-home fa-w-18 fa-2x" aria-hidden="true" data-prefix="fas" data-icon="home" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z"></path></svg><!-- <i class="fas fa-2x fa-home"></i> -->
      </span>
    </a>
    <br>
    <br>
    <template v-if="definitions.length==0">
      <br>
      <br><br>
      <br><br><br>
    </template>
    <label class="label is-large title is-2" style="text-align: center;">Search</label>
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <span class="select">
          <select v-model="option">
            <option selected value="overview">Overview</option>
            <option value="definition">Definition</option>
            <option value="synonym">Synonym</option>
            <option value="antonym">Antonym</option>
          </select>
        </span>
      </p>
      <p class="control">
        <input v-model="word" class="input" type="text" placeholder="Type here!">
      </p>
      <p class="control">
        <a @click="search()" class="button is-primary">
          Go
        </a>
      </p>
    </div>
    <br>
    <br>
    <div v-if="definitions.length==0 && synonym.length==0 && antonym.length==0">
      <br>
      <br>
      <div class="center-figure">
        <figure class="media-content" style="display: inline-block;">
          <a @click="changeSlide(true)">
            <p class="image is-32x32">
              <img src="https://cdn4.iconfinder.com/data/icons/eldorado-player/40/button_play_1-128.png">
            </p>
          </a>
        </figure>
        <figure class="media-content" style="display: inline-block;">
          <a @click="changeSlide(false)">
            <p class="image is-32x32">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk7t4zdWL-Q6NUSzV7lA3gOHRX9ggEwFQHdM9cNxsgb1Heiw5FFg">
            </p>
          </a>
        </figure>
      </div>
      <Carousel @clicked="explore" :automaticSlide="stateSlide"></Carousel>
      <br>
      <section class="hero is-info" style="text-align: center; font-size: 30px;">
        <div class="hero-body" @click="focus">
          <div class="container">
            <h1 class="title">
              Word Of Day
            </h1>
            <h2 class="subtitle">
              {{wordOfDay.word}}
            </h2>
          </div>
        </div>
      </section>
      <template v-if="wordOfDay.word">
        <br>
        <Article ref="wordDay" :word="wordOfDay"></Article>
      </template>
    </div>
    <div v-if="(option!='synonym')&&(option!='antonym')" style="text-align: center; font-size: 30px;">
      <template  v-for="(item, index) in hyphenation">
        <template v-if="item.type=='stress'">
          <strong :key="index">{{item.text}} </strong>
        </template>
        <span v-else :key="index">{{item.text}} </span>
      </template>
    </div>
    <div v-if="(option!='synonym')&&(option!='antonym')" style="text-align: center; font-size: 30px;">
      <div class="columns">
        <template v-for="(item, index) in audio">
          <div class="column" :key="index">
            <video width="320" height="240" controls :src="item.fileUrl" type="audio/mpeg">

            </video>
          </div>
        </template>
      </div>
    </div>
    <template v-if="option=='overview'">
      <br>
      <Article :word="overview"></Article>
    </template>
    <br>
    <br>
    <ul>
      <li v-if="option=='definition'" v-for="(item, index) in definitions" :key="index">
        <Card :title="item.partOfSpeech" :source="item.sourceDictionary" :text="item.text" :attribution="item.attributionText"></Card>
      </li>
      <div v-if="option=='synonym'" class="tags centered" >
        <span style="font-size: 30px;" v-for="(item, index) in synonym.words" :key="index" class="tag">{{item}}</span>
      </div>
      <div v-if="option=='antonym'" class="tags">
        <span style="font-size: 30px;" v-for="(item, index) in antonym.words" :key="index" class="tag">{{item}}</span>
      </div>
    </ul>
  </div>
</template>

<script>
import wordnikServices from '@/services/wordnik'
import Card from '@/components/Card'
import Article from '@/components/Article'
import Carousel from '@/components/Carousel'
export default {
  name: 'Searcher',
  data () {
    return {
      api: 'http://api.wordnik.com:80/v4',
      word: '',
      option: 'definition',
      slideState: true,
      definitions: [],
      examples: [],
      hyphenation: [],
      synonym: [],
      antonym: [],
      audio: [],
      wordOfDay: {},
      randomWord: {},
      choice: {
        'overview': this.getOverview,
        'definition': this.getDefinition,
        'synonym': this.getSynomyn,
        'antonym': this.getAntonym
      }
    }
  },
  components: {
    Card,
    Article,
    Carousel
  },
  created () {
    this.getWordOfDay()
    this.getRandomWord()
  },
  computed: {
    overview () {
      return {
        definitions: this.definitions,
        examples: this.examples.examples
      }
    },
    stateSlide () {
      return this.slideState
    }
  },
  methods: {
    search () {
      this.choice[this.option]()
      this.getHyphenation()
      this.getAudio()
    },
    explore (value) {
      this.word = value
      this.option = 'overview'
      this.getOverview()
      this.getAudio()
      this.getHyphenation()
    },
    getDefinition (limit = 5) {
      console.log('searching')
      wordnikServices.definitions(this.word, {
        params: {
          limit: limit,
          includeRelated: true,
          sourceDictionaries: 'all',
          useCanonical: false,
          includeTags: false,
          api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        }
      }).then((response) => {
        this.definitions = response.data
      })
    },
    getOverview () {
      this.getDefinition(5)
      this.getExamples()
    },
    getExamples () {
      wordnikServices.examples(this.word, {
        params: {
          includeDuplicates: false,
          skip: 0,
          useCanonical: false,
          limit: 5,
          api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        }
      }).then((response) => {
        this.examples = response.data
      })
    },
    getHyphenation () {
      wordnikServices.hyphenation(this.word, {
        params: {
          useCanonical: false,
          limit: 50,
          api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        }
      }).then((response) => {
        this.hyphenation = response.data
      })
    },
    getSynomyn () {
      wordnikServices.synonym(this.word, {
        params: {
          useCanonical: false,
          relationshipTypes: 'synonym',
          limitPerRelationshipType: 20,
          api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        }
      }).then((response) => {
        this.synonym = response.data[0]
      })
    },
    getAntonym () {
      wordnikServices.antonym(this.word, {
        params: {
          useCanonical: false,
          relationshipTypes: 'antonym',
          limitPerRelationshipType: 20,
          api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        }
      }).then((response) => {
        this.antonym = response.data[0]
      })
    },
    getAudio () {
      wordnikServices.audio(this.word, {
        params: {
          useCanonical: false,
          limit: 50,
          api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        }
      }).then((response) => {
        this.audio = response.data
      })
    },
    getWordOfDay () {
      this.getDateToday().then((date) => {
        console.log(date)
        wordnikServices.wordOfDay({
          params: {
            date: date,
            api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
          }
        }).then((response) => {
          this.wordOfDay = response.data
        })
      })
    },
    getRandomWord () {
      wordnikServices.randomWord().then((response) => {
        console.log(response)
        this.randomWord = response.data
      })
    },
    getDateToday () {
      return new Promise((resolve) => {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        let todayDate = yyyy + '-' + mm + '-' + dd
        resolve(todayDate)
      })
    },
    backHome () {
      this.word = ''
      this.definitions = []
    },
    focus () {
      this.$refs.wordDay.$el.scrollIntoView()
    },
    changeSlide (val) {
      this.slideState = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.css';
.center-figure{
  display: content;
  justify-content: center;
  align-items: center;
}
</style>
