
<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                to: '/dashboard'
            }
        ]
    },
    {
        label: 'Account',
        items: [
            {
                label: 'My Profile',
                icon: 'pi pi-fw pi-user',
                to: '/profile'
            }
        ]
    },
    {
        label: 'Resources',
        items: [
            {
                label: 'Laravel Documentation',
                icon: 'pi pi-fw pi-book',
                url: 'https://laravel.com/docs',
                target: '_blank'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, index) in model" :key="index">
            <AppMenuItem
                v-if="!item.separator"
                :item="item"
                :root="true"
            />
            <li v-else class="menu-separator"></li>
        </template>
    </ul>
</template>
