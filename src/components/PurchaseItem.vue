<template>
  <div>
    <the-ul>
      <li>{{ product }}</li>
      <li>{{ category }}</li>
      <li>{{ price }}</li>
    </the-ul>
    <button v-if="!search" @click="redItem">red</button>
    <button v-if="!search" @click="delItem">del</button>
  </div>
  <data-input
    v-if="editElements.editing"
    :id="id"
    :pProduct="editElements.editProduct"
    :pPrice="editElements.editPrice"
    :pCategory="editElements.editCategory"
    :whatToDo="whatToDo"
    @editing="editElements.editing = $event"
  >
    <template #button>Редактировать</template>
  </data-input>
</template>

<script>
import { useStore } from 'vuex';
import { reactive } from 'vue';
import DataInput from './DataInput.vue';

export default {
  components: { DataInput },
  props: ['product', 'price', 'category', 'id', 'search'],
  setup(props) {
    const store = useStore();

    let editElements = reactive({
      editing: false,
      editProduct: '',
      editPrice: '',
      editCategory: '',
    });

const whatToDo = 'saveChanges';

    function delItem() {
      store.dispatch('request/delPurchase', {
        id: +props.id
      });
    }
    function redItem() {
      editElements.editing = true;
      editElements.editProduct = props.product;
      editElements.editPrice = props.price;
      editElements.editCategory = props.category;
    }

    return {
      delItem,
      redItem,
      editElements,
      whatToDo,
      inputSearch: props.search
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  align-items: baseline;
}
</style>