<template>
  <component
    :is="as"
    v-model="value"
    v-bind="$attrs"
    :error-messages="errorMessage"
    @blur="handleBlur"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useField } from 'vee-validate';
import { useVModel } from '@vueuse/core';

interface Props {
  name: string;
  as: string | object;
  modelValue?: any;
}

const props = defineProps<Props>();

const { errorMessage, handleBlur, handleChange } = useField(props.name);

const value = useVModel(props, 'modelValue');

watch(
  () => props.modelValue,
  () => {
    handleChange(props.modelValue);
  },
);
</script>
