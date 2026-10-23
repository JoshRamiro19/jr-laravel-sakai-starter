
<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/Sakai/AppLayout.vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout>
        <div class="p-6">
            <Card>
                <template #title>
                    Welcome to JR SkyFlow
                </template>

                <template #content>
                    <p class="mb-4">
                        Laravel 13 + Vue 3 + Breeze
                        + Inertia + PrimeVue
                    </p>

                    <Button
                        label="PrimeVue is Working!"
                        icon="pi pi-check"
                    />
                </template>
            </Card>
        </div>
    </AppLayout>
</template>
