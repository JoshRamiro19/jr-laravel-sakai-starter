<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel({
    type: String,
    required: true,
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>


<template>
    <input
        v-model="model"
        ref="input"
        class="jr-theme-input rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
    />
</template>

