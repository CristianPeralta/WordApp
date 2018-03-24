<template>
  <div class="hello">
    <h2>Search</h2>
    <input v-model="word" type="text" name="" value="" placeholder="word">
    <button @click="getDefinition()" type="button" name="button">Search</button>
    <ul>
      <li v-for="(item, index) in definitions" :key="index">
        <p>
          {{item.text}}
        </p>
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
          partOfSpeech: 'noun',
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
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
