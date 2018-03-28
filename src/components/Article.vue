<template lang="html">
  <article class="media" style="padding:25px;">
      <figure class="media-left" v-if="word.note">
        <p class="image is-64x64">
          <img src="https://image.flaticon.com/icons/svg/259/259500.svg">
        </p>
      </figure>
      <div class="media-content">
        <div class="content" v-if="word.note">
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
              <img src="https://www.flaticon.com/premium-icon/icons/svg/797/797446.svg">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <strong>Definitions</strong>
              <li v-for="(item, index) in word.definitions" :key="index">
                <Card :source="item.partOfSpeech" :text="item.text" :attribution="item.source"></Card>
              </li>
            </div>
          </div>
        </article>

        <article class="media" v-if="word.examples">
          <figure class="media-left">
            <p class="image is-48x48">
              <img src="https://image.flaticon.com/icons/svg/468/468045.svg">
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <strong>Examples </strong>
              <br>
              <li v-for="(item, index) in word.examples" :key="index">
                <Card :source="item.title" :text="item.text"></Card>
              </li>
              <br>
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
