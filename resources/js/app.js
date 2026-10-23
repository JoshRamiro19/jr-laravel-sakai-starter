import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import 'primeicons/primeicons.css';

import './assets/styles.scss';
import { definePreset } from '@primeuix/themes';

import { initializeTheme } from './Layouts/Sakai/composables/layout';

import { initializeColorTheme } from './Layouts/Sakai/composables/themeEngine';

const appName = import.meta.env.VITE_APP_NAME || 'JR Starter';
const SkyFlowPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{primary.700}',
                    contrastColor: '#ffffff',
                    hoverColor: '{primary.800}',
                    activeColor: '{primary.900}'
                }
            },
            dark: {
                primary: {
                    color: '{primary.300}',
                    contrastColor: '{surface.900}',
                    hoverColor: '{primary.200}',
                    activeColor: '{primary.100}'
                }
            }
        }
    }
});

initializeTheme();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        ),

    setup({ el, App, props, plugin }) {
        const app = createApp({
            render: () => h(App, props),
        })
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: {
                    preset: SkyFlowPreset,
                    options: {
                        darkModeSelector: '.app-dark',
                    },
                },
            });

        initializeColorTheme();
        app.mount(el);
    },

    progress: {
        color: 'var(--jr-primary)',
    },
});
