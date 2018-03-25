<template>
  <div class="hello">
    <label class="label is-large" style="text-align: center;">Search</label>
    <div class="field has-addons has-addons-centered">
      <p class="control">
        <span class="select">
          <select v-model="option">
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
    <div style="text-align: center; font-size: 30px;">
      <div class="columns">
        <div class="column"></div>
        <div class="column">
          <template  v-for="(item, index) in hyphenation">
            <template v-if="item.type=='stress'">
              <strong :key="index">{{item.text}} </strong>
            </template>
            <span v-else :key="index">{{item.text}} </span>
          </template>
        </div>
        <div class="column">
          <div ref="audio"></div>
        </div>
        <div class="column"></div>
      </div>

    </div>
    <ul>
      <li v-for="(item, index) in definitions" :key="index">
        <Card :title="item.partOfSpeech" :source="item.sourceDictionary" :text="item.text" :attribution="item.attributionText"></Card>
      </li>
      <li v-for="(item, index) in synonym.words" :key="index">
        <Card :text="item"></Card>
      </li>
      <li v-for="(item, index) in antonym.words" :key="index">
        <Card :text="item"></Card>
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
      option: 'definition',
      definitions: [],
      hyphenation: [],
      synonym: [],
      antonym: [],
      choice: {
        'definition': this.getDefinition,
        'synonym': this.getSynomyn,
        'antonym': this.getAntonym
      }
    }
  },
  components: {
    Card
  },
  methods: {
    search () {
      this.choice[this.option]()
      this.getHyphenation()
    },
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.css';
</style>
