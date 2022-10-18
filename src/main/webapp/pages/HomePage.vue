<template>
  <section>
    <h2>This is Home page</h2>
    <div>word : {{ word }}</div>
  </section>
</template>

<script>
import axios from "axios";

export default{
  data() {
    return {
      pageId: 'HomePage',
       word : ""
    }
  },
  computed: {
    word() {
      // return this.$store.getters.getWord
      return this.getWord();
    }
  },
  mounted() {
    if (window.__INITIAL_STATE__ === null) {
     this.getWord();
    } else {
      window.__INITIAL_STATE__ = null
    }
  },
  methods: {
    getWord  () {
      //this.$store.dispatch('getWordAction')
      axios.get(`http://localhost:9090/word`)
          .then((response) => {
            this.word = response.data
          })
    }
  },

}
</script>

<style scoped>
div > div:nth-child(1) {
  height: 20px;
}
</style>