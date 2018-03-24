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
    <ul>
      <li v-for="(item, index) in definitions" :key="index">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{item.partOfSpeech}}
            </p>
            <a href="#">{{item.sourceDictionary}}</a>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              {{item.text}}
              <br>
            </div>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <span>
                {{item.attributionText}}
              </span>
            </p>
          </footer>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import wordnikServices from '@/services/wordnik'
export default {
  name: 'Searcher',
  data () {
    return {
      api: 'http://api.wordnik.com:80/v4',
      word: '',
      definitions: []
    }
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
        this.word = ''
        this.definitions = response.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.css';
</style>
