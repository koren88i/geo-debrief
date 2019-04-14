<template>

  <div id="app">
    <HelloWorld style="height: 500px; width: 500px" msg="Welcome to Your Vue.js App"/>
    <DatePickerForm style="height: 500px; width: 500px"/>
    <SimpleForm style="height: 500px; width: 500px"/>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import DatePickerForm from './components/DatePickerForm.vue'
import SimpleForm from './components/SimpleForm.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    DatePickerForm,
    SimpleForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
