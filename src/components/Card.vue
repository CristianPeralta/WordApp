<template lang="html">
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{title}}
      </p>
      <a href="#">{{source}}</a>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        {{text}}
        <br>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <i>
          {{attribution}}
        </i>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['title', 'text', 'source', 'attribution']
}
</script>

<style lang="css">
</style>
