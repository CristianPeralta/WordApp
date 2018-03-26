<template lang="html">
  <article class="media" style="padding:25px;">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>Note</strong>
            <br>
            {{word.note}}
            <br>
            <small><a>Like</a> · <a>Reply</a> · a few seconds</small>
          </p>
        </div>

        <article class="media">
          <figure class="media-left">
            <p class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Definitions</strong>
                <br>
                <li v-for="(item, index) in word.definitions" :key="index">
                  <Card :source="item.partOfSpeech" :text="item.text" :attribution="item.source"></Card>
                </li>
                <br>
              </p>
            </div>
          </div>
        </article>

        <article class="media">
          <figure class="media-left">
            <p class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Examples </strong>
                <br>
                <li v-for="(item, index) in word.examples" :key="index">
                  <Card :source="item.title" :text="item.text"></Card>
                </li>
                <br>
              </p>
            </div>
          </div>
        </article>
      </div>
    </article>
</template>

<script>
import Card from '@/components/Card'
export default {
  name: 'Article',
  props: ['word'],
  components: {
    Card
  }
}
</script>

<style lang="css">
</style>
