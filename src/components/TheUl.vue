<template>
  <ul class="listHeader">
    <slot></slot>
  </ul>
</template>

<style lang="scss" scoped>
.listHeader {
  display: flex;
  flex: 1;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 5px;
  width: 70%;
}
</style>