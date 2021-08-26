<template>
  <base-wrap>
    <h2 v-if="updateDate(picked1) != updateDate(picked2)">
      Покупки за {{ updateDate(picked1) }} - {{ updateDate(picked2) }}
    </h2>
    <h2 v-else>Покупки за {{ updateDate(picked1) }}</h2>
    <input
      type="search"
      placeholder="поиск по категории..."
      v-model="filter"
      @input="searchTotal"
    />
    <form @submit.prevent="searchAnotherDate">
      <label>Выбрать дату/даты</label>
      <datepicker v-model="picked1" :upper-limit="new Date()"></datepicker
      ><br />
      <datepicker
        v-model="picked2"
        :lower-limit="picked1"
        :upper-limit="new Date()"
      ></datepicker>
      <button>Выбрать</button>
    </form>
    <div class="productWrapper" v-if="products.length > 0">
      <list-header></list-header>
      <purchase-item
        :search="search"
        v-for="product in products"
        :key="product"
        :product="product.product"
        :price="product.price"
        :category="product.category"
        :id="product.id"
      >
      </purchase-item>
      <div>
        Итого потрачено: <span>{{ !newTotal ? total : newTotal }}</span>
      </div>
    </div>
    <p v-else>Вы не совершали покупок {{ updateDate(picked1) }}</p>
  </base-wrap>
  <chart></chart>
</template>

<script>
import PurchaseItem from './PurchaseItem.vue';
import ListHeader from './ListHeader.vue';
import Chart from './Chart';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Datepicker from 'vue3-datepicker';

export default {
  components: {
    PurchaseItem,
    ListHeader,
    Datepicker,
    Chart,
  },
  setup() {
    const store = useStore();

    const picked1 = ref(new Date()),
      picked2 = ref(new Date());

    let search = ref(false);

    let products = computed(() => {
      return store.getters['request/requests'].filter((request) => {
        if (filter.value) {
          return request.category.includes(filter.value.toLowerCase());
        }
        return request;
      });
    });

    let total = computed(() => {
      return store.getters['purchases/total'];
    });

    let newTotal = ref(0);

    const filter = ref();

    function updateDate(date) {
      return date.toLocaleDateString().split('.').reverse().join('-');
    }

    function searchAnotherDate() {
      let date1 = picked1,
        date2 = picked2;
      store.commit('request/changeDate1', date1);
      store.commit('request/changeDate2', date2);
      store.dispatch('request/loadExperience');
    }

    function searchTotal(e) {
      search.value = true;

      let sum = 0;

      products.value.forEach((elem) => {
        sum += +elem.price;
      });

      newTotal.value = sum;

      if (!e.target.value) {
        search.value = false;
         newTotal.value = 0;
      }
    }

    return {
      products,
      total,
      searchAnotherDate,
      picked1,
      picked2,
      updateDate,
      filter,
      searchTotal,
      newTotal,
      search,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>