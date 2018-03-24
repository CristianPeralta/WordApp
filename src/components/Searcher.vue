<template>
  <div class="hello">
    <h2>Search</h2>
    <input v-model="word" type="text" name="" value="" placeholder="word">
    <button @click="getDefinition()" type="button" name="button">Search</button>
    <ul>
      <li v-for="(item, index) in definitions" :key="index">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{item.sourceDictionaries}}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              {{item.text}}
              <a href="#">{{item.partOfSpeech}}</a>
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
    <button @click="testDefinition()" type="button" name="button">Search</button>
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
