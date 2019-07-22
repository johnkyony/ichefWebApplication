<template>
  <div id="app">
    <Navigation v-if="currentUser"></Navigation>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
<script>
import {mapState} from 'vuex'
import Navigation from '@/components/Navigation'
export default {
  components: {
    Navigation
  },
  computed: {
    ...mapState(['currentUser'])
  }
  
}
</script>

