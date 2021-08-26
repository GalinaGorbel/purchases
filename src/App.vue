<template>
  <base-wrap>
    <data-input></data-input>
  </base-wrap>
  <purchases-list></purchases-list>
</template>

<script>
import DataInput from './components/DataInput.vue';
import PurchasesList from './components/PurchasesList.vue';

export default {
  created() {
    this.$store.dispatch('request/loadExperience');
  },
  components: {
    DataInput,
    PurchasesList
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;1,400&display=swap');
body {
  font-family: 'Ubuntu', sans-serif;
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
:root {
  font-size: 1em; //16px
}
</style>