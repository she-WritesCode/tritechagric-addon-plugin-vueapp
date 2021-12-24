<template>
  <div class="markdown prose" v-html="source"></div>
</template>

<script>
import MarkdownIt from "markdown-it"
import { defineComponent } from "vue";

export default defineComponent({
  name: "Markdown",
  props: {
    source: { type: String, required: true },
  },
  data() {
    return {
      text: "",
    };
  },
  mounted() {
    const md = new MarkdownIt();
    this.text = md.render(this.source);
  }
})
</script>

<style scoped>
</style>