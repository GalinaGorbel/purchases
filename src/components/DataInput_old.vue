<template>
  <form class="form" @submit.prevent="submitForm">
    <div :class="['form-control', { error: pError }]">
      <label>Наименование</label>
      <input name="product" type="text" v-model.trim="product" @blur="pBlur" />
      <span v-if="pError" name="product">{{ pError }}</span>
    </div>
    <div :class="['form-control', { error: cError }]">
      <label>Категория</label>
      <input
        name="category"
        type="text"
        v-model.trim="category"
        @blur="cBlur"
      />
      <span v-if="cError" name="category">{{ cError }}</span>
    </div>
    <div :class="['form-control', { error: prError }]">
      <label>Цена</label>
      <input name="price" type="text" v-model.trim="price" @blur="prBlur" />
      <span v-if="prError" name="price">{{ prError }}</span>
    </div>
    <button type="submit" name="submit" :disabled="isSubmitting">
      Добавить
    </button>
  </form>
</template>

<script>
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const { handleSubmit, isSubmitting } = useForm();
    const date = new Date().toLocaleDateString().split('.').reverse().join('-');

    const {
      value: price,
      errorMessage: prError,
      handleBlur: prBlur,
    } = useField(
      'price',
      yup
        .number()
        .typeError('Поле должно содержать цифровое значение')
        .required('Поле не должно быть пустым')
    );
    const {
      value: product,
      errorMessage: pError,
      handleBlur: pBlur,
    } = useField(
      'product',
      yup.string().required('Поле не должно быть пустым')
    );
    const {
      value: category,
      errorMessage: cError,
      handleBlur: cBlur,
    } = useField(
      'category',
      yup.string().required('Поле не должно быть пустым')
    );

    const submitForm = handleSubmit((values, { resetForm }) => {
      store.dispatch('request/addNewPurchase', { date, ...values });
      resetForm();
    });

    return {
      price,
      product,
      category,
      prBlur,
      cBlur,
      pBlur,
      pError,
      prError,
      cError,
      submitForm,
      isSubmitting,
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
}
</style>