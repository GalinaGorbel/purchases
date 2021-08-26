<template>
  <div class="baseWrap">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.baseWrap {
  width: 30%;
  padding: 10px;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgb(0, 0, 0 / 26%);
  border-radius: 12px;
}
</style>