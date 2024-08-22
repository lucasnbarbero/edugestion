# My Field

El componente `MyField` es un envoltorio personalizado para campos de formulario que permite manejar la validación y el binding de datos de manera sencilla utilizando `vee-validate` y `@vueuse/core`.

## Uso

```vue
<template>
  <MyField name="username" as="input" v-model="username" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const username = ref<string>('');
</script>
```

## Props

| Prop         | Tipo              | Descripción                                                            | Requerido |
| ------------ | ----------------- | ---------------------------------------------------------------------- | --------- |
| `name`       | `string`          | Nombre del campo, utilizado por `vee-validate` para la validación.     | Sí        |
| `as`         | `string` `object` | Tipo de componente a renderizar (`input`, `textarea`, `select`, etc.). | Sí        |
| `modelValue` | `any`             | El valor del campo. Se utiliza con `v-model`.                          | No        |

## Slots

El componente `MyField` acepta un slot que se renderiza dentro del componente que se especifíca con la prop `as`.

## Ejemplo completo

```vue
<template>
  <MyField>
    <template #default>
      <span>Campo de email</span>
    </template>
  </MyField>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const email = ref<string>('');
</script>
```

## Funcionalidad 

- **Validación:** La validación se maneja utilizando `vee-validate`. El `errorMessage` asociado al campo se muestra automáticamente si existe un error.

- **VModel:** El componente utiliza `useVModel` de `@vueuse/core` para manejar el binding bidireccional de datos con `v-model`.

- **Manejo de Eventos:** El componente escucha el evento `blur` para manejar la lógica de validación cuando el usuario abandona el campo.
