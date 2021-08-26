<template>
  <form
    class="form"
    @submit.prevent="changes == 'saveChanges' ? saveChanges() : submitForm()"
  >
    <div :class="['form-control', { error: v$.product.$error }]">
      <label> Наименование </label>
      <input
        type="text"
        v-model.trim="product"
        name="product"
        @input="v$.product.$touch()"
      />
      <div v-if="v$.product.$error">
        <span>Поле не должно быть пустым и должно содержать только буквы</span>
      </div>
    </div>
    <div :class="['form-control', { error: v$.category.$error }]">
      <label> Категория</label>
      <input
        type="text"
        v-model.trim="category"
        name="category"
        @input="v$.category.$touch()"
      />
      <div v-if="v$.category.$error">
        <span>Поле не должно быть пустым должно содержать только буквы</span>
      </div>
    </div>
    <div :class="['form-control', { error: v$.price.$error }]">
      <label>Цена</label>
      <input
        type="text"
        v-model.trim="price"
        name="price"
        @input="v$.price.$touch()"
      />
      <div v-if="v$.price.$error">
        <span>Поле не должно быть пустым должно содержать только цифры</span>
      </div>
    </div>
    <button type="submit" name="submit">
      <slot name="button">Добавить</slot>
    </button>
  </form>
</template>

<script>
import { reactive, toRefs, ref } from 'vue';
import useValidate from '@vuelidate/core';
import { required, numeric } from 'vuelidate/lib/validators';
import { useStore } from 'vuex';

export default {
  props: ['id', 'pProduct', 'pPrice', 'pCategory', 'whatToDo'],
  emits: ['editing'],
  
  setup(props, context) {
    const store = useStore();
    const date = new Date().toLocaleDateString().split('.').reverse().join('-') || props.data;
    const state = reactive({
      product: '' || props.pProduct,
      category: '' || props.pCategory,
      price: '' || props.pPrice,
    });

    let changes = ref(props.whatToDo);

    const validations = {
      product: {
        required,
        alpha: (val) => /^[а-яА-ЯёЁa-zA-Z]*$/i.test(val),
      },
      category: {
        required,
        alpha: (val) => /^[а-яА-ЯёЁa-zA-Z]*$/i.test(val),
      },
      price: { required, numeric },
    };

    const v$ = useValidate(validations, state);

    function submitForm() {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      } else {
        store.dispatch('request/addNewPurchase', { date, ...state });
        resetForm();
      }
    }

    function saveChanges() {
      if (v$.value.$invalid) {
        v$.value.$touch();
        return;
      } else {
        let editItem = {
          id: +props.id
        };
        store.dispatch('request/saveChanges', { ...editItem, ...state });
        context.emit('editing', false)
        resetForm();
      }
    }

    function resetForm() {
      Object.keys(state).forEach((form) => (state[form] = ''));
      v$.value.$reset();
    }

    return {
      ...toRefs(state),
      v$,
      submitForm,
      saveChanges,
      changes,
      date,
      resetForm,
    };
  },
};
</script>

<style lang="scss">
form {
  margin: 10px;
}
input {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.5rem;
  border: 1px solid #ccc;
}
button {
  margin-top: 1em;
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: #fff;
  cursor: pointer;
}
label {
  font-size: 1.2rem;
  display: block;
  margin: 0.6rem 0;
}
.error {
  input {
    border-color: red;
  }
  span {
    color: red;
  }
}
</style>