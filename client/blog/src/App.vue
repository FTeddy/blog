<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/utils/Navbar'
import Footer from '@/components/utils/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
#app {

}
</style>
