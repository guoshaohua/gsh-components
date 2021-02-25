<template>
  <div id="app">
    <imagesUpload></imagesUpload>
  </div>
</template>

<script>
import imagesUpload from './myPlugin/ImagesUpload/index.vue'

export default {
  name: 'app',
  components: {
    imagesUpload
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
