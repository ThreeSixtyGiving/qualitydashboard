<template>
  <div>
    <h2>Included Publishers:</h2>
    <ul v-if="publishers" class="card-list" id="publisher-list-updater">
      <li
        v-for="publisher in publishers"
        v-bind:key="publisher.prefix"
        class="card-list__item"
      >
        <article class="registry-card">
          <div v-if="publisher.logo" class="registry-card__pub-logo">
            <a v-bind:href="publisher.website" target="_blank">
              <img v-bind:src="publisher.logo" v-bind:alt="publisher.name" />
            </a>
          </div>
          <div class="registry-card__content">
            <h3 class="registry-card__pub-name">
              {{ publisher.name }}
            </h3>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PublisherList",
  props: {
    publishers: {}
  },
};
</script>

