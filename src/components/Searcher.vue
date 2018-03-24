<template>
  <div class="hello">
    <div class="field">
      <label class="label is-large" style="text-align: center;">Search</label>
      <div class="control has-icons-left has-icons-right">
        <input v-model="word" class="input is-large" type="email" placeholder="Type here!">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope fa-xs"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check fa-xs"></i>
        </span>
      </div>
    </div>
    <div class="box has-text-centered">
      <button @click="getDefinition()" class="button is-primary">Go</button>
    </div>
    <div style="text-align: center; font-size: 30px;">
      <template  v-for="(item, index) in hyphenation">
        <template v-if="item.type=='stress'">
          <strong :key="index">{{item.text}} </strong>
        </template>
        <span v-else :key="index">{{item.text}} </span>
      </template>
    </div>
    <ul>
      <li v-for="(item, index) in definitions" :key="index">
        <Card :title="item.partOfSpeech" :source="item.sourceDictionary" :text="item.text" :attribution="item.attributionText"></Card>
      </li>
    </ul>
  </div>
</template>

<script>
import wordnikServices from '@/services/wordnik'
import Card from '@/components/Card'
export default {
  name: 'Searcher',
  data () {
    return {
      api: 'http://api.wordnik.com:80/v4',
      word: '',
      definitions: [],
      hyphenation: []
    }
  },
  components: {
    Card
  },
  methods: {
    getDefinition () {
      console.log('searching')
      wordnikServices.definitions(this.word, {
        params: {
          limit: 200,
          includeRelated: true,
          sourceDictionaries: 'all',
          useCanonical: false,
          includeTags: false,
          api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
        }
      }).then((response) => {
        this.definitions = response.data
        this.getHyphenation()
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.css';
</style>
