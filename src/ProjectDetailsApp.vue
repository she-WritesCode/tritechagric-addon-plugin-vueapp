<template>
    <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "ProjectDetailsApp",
    mounted() {
        console.log(this.$route)
    },
})
</script>

<style scoped>
</style>