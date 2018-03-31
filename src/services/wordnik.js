import wApi from '@/services/source/wordnik'

let apiKey = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'

export default {
  definitions (word, limit) {
    return wApi().get('/word.json/' + word + '/definitions', {
      params: {
        limit: limit,
        includeRelated: true,
        sourceDictionaries: 'all',
        useCanonical: false,
        includeTags: false,
        api_key: apiKey
      }
    })
  },
  examples (word) {
    return wApi().get('/word.json/' + word + '/examples', {
      params: {
        includeDuplicates: false,
        skip: 0,
        useCanonical: false,
        limit: 5,
        api_key: apiKey
      }
    })
  },
  hyphenation (word) {
    return wApi().get('/word.json/' + word + '/hyphenation', {
      params: {
        useCanonical: false,
        limit: 50,
        api_key: apiKey
      }
    })
  },
  synonym (word) {
    return wApi().get('/word.json/' + word + '/relatedWords', {
      params: {
        useCanonical: false,
        relationshipTypes: 'synonym',
        limitPerRelationshipType: 20,
        api_key: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
      }
    })
  },
  antonym (word) {
    return wApi().get('/word.json/' + word + '/relatedWords', {
      params: {
        useCanonical: false,
        relationshipTypes: 'antonym',
        limitPerRelationshipType: 20,
        api_key: apiKey
      }
    })
  },
  audio (word, params) {
    return wApi().get('/word.json/' + word + '/audio', {
      params: {
        useCanonical: false,
        limit: 50,
        api_key: apiKey
      }
    })
  },
  wordOfDay (date) {
    return wApi().get('/words.json/wordOfTheDay', {
      params: {
        date: date,
        api_key: apiKey
      }
    })
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
