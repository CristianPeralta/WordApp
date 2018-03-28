import wApi from '@/services/source/wordnik'

let apiKey = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'

export default {
  definitions (word, params) {
    return wApi().get('/word.json/' + word + '/definitions', params)
  },
  examples (word, params) {
    return wApi().get('/word.json/' + word + '/examples', params)
  },
  hyphenation (word, params) {
    return wApi().get('/word.json/' + word + '/hyphenation', params)
  },
  synonym (word, params) {
    return wApi().get('/word.json/' + word + '/relatedWords', params)
  },
  antonym (word, params) {
    return wApi().get('/word.json/' + word + '/relatedWords', params)
  },
  audio (word, params) {
    return wApi().get('/word.json/' + word + '/audio', params)
  },
  wordOfDay (params) {
    return wApi().get('/words.json/wordOfTheDay', params)
  },
  randomWord () {
    return wApi().get('/words.json/randomWord', {
      params: {
        hasDictionaryDef: false,
        minCorpusCount: 0,
        maxCorpusCount: '-1',
        minDictionaryCount: 1,
        maxDictionaryCount: '-1',
        minLength: 5,
        maxLength: '-1',
        api_key: apiKey
      }
    })
  },
  signup (params) {
    return wApi().post('signup', params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  login (params) {
    return wApi().post('login', params)
  }
}
