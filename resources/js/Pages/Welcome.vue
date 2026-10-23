
<script setup>
import { Head, Link } from '@inertiajs/vue3';


defineProps({
    canLogin: {
        type: Boolean,
        default: true,
    },
    canRegister: {
        type: Boolean,
        default: true,
    },
});

import { useLayout } from '@/Layouts/Sakai/composables/layout';

const { isDarkTheme, toggleDarkMode } = useLayout();

const features = [
    {
        icon: 'pi pi-bolt',
        title: 'Ready to Build',
        description: 'Start with Laravel, Vue, Inertia, and authentication already integrated.',
    },
    {
        icon: 'pi pi-palette',
        title: 'Modern UI',
        description: 'Build interfaces with PrimeVue components and SkyFlow styling.',
    },
    {
        icon: 'pi pi-th-large',
        title: 'Sakai Dashboard',
        description: 'Enjoy responsive navigation, a topbar, and an organized application layout.',
    },
    {
        icon: 'pi pi-lock',
        title: 'Authentication',
        description: 'Login, registration, password management, and account settings with Breeze.',
    },
    {
        icon: 'pi pi-mobile',
        title: 'Responsive Design',
        description: 'A layout designed to adapt to desktop, tablet, and mobile screens.',
    },
    {
        icon: 'pi pi-code',
        title: 'Developer Friendly',
        description: 'A reusable foundation you can customize for your next Laravel project.',
    },
];
</script>

<template>
    <Head title="JR SkyFlow - Laravel Starter Kit" />

    <div class="min-h-screen">
        <div class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">

            <!-- Navigation -->
            <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" class="flex items-center gap-3">
                        <div class="jr-theme-background flex h-10 w-10 items-center justify-center rounded-xl font-extrabold shadow-lg">
                            JR
                        </div>
                        <span class="text-xl font-bold tracking-tight">
                            JR <span class="jr-theme-heading">SkyFlow</span>
                        </span>
                    </Link>

                    <div class="flex items-center gap-3">
                        <a href="#features" class="jr-theme-link hidden text-sm font-medium text-slate-600 dark:text-slate-300 sm:inline">
                            Features
                        </a>

                        <button
                            type="button"
                            class="rounded-xl p-3 text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                            aria-label="Toggle dark mode"
                            @click="toggleDarkMode"
                        >
                            <i :class="isDarkTheme ? 'pi pi-sun' : 'pi pi-moon'"></i>
                        </button>

                        <Link
                            v-if="canLogin"
                            href="/login"
                            class="jr-theme-link hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 sm:inline"
                        >
                            Login
                        </Link>

                        <Link
                            :href="canRegister ? '/register' : canLogin ? '/login' : '#features'"
                            class="jr-theme-button rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            </header>

            <!-- Hero -->
            <main>
                <section class="relative overflow-hidden px-6 pb-20 pt-24 sm:pt-32">
                    <div class="jr-theme-glow pointer-events-none absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"></div>

                    <div class="relative mx-auto max-w-5xl text-center">
                        <div class="jr-theme-border jr-theme-text mb-7 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-semibold dark:bg-slate-900">
                            <i class="pi pi-sparkles"></i>
                            Laravel 13 + Vue 3 + Inertia + PrimeVue + Sakai
                        </div>

                        <h1 class="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
                            Build faster.
                            <span class="jr-theme-heading block">
                                Create beautifully.
                            </span>
                        </h1>

                        <p class="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                            A modern Laravel starter kit featuring authentication,
                            a polished admin layout, and powerful Vue components.
                            Spend less time setting up and more time building.
                        </p>

                        <div class="mt-9 flex flex-wrap justify-center gap-4">
                            <Link
                                :href="canRegister ? '/register' : canLogin ? '/login' : '#features'"
                                class="jr-theme-button inline-flex items-center gap-3 rounded-xl px-7 py-3.5 font-semibold shadow-xl transition hover:-translate-y-0.5"
                            >
                                Get Started
                                <i class="pi pi-arrow-right"></i>
                            </Link>

                            <a
                                href="#features"
                                class="jr-theme-card inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 transition dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            >
                                Explore Features
                                <i class="pi pi-angle-down"></i>
                            </a>
                        </div>

                        <!-- Dashboard Preview -->
                        <div class="jr-theme-border mx-auto mt-20 max-w-5xl overflow-hidden rounded-2xl border bg-white p-3 shadow-2xl dark:bg-slate-900">
                            <div class="flex items-center gap-2 border-b border-slate-100 px-3 pb-3 dark:border-slate-700">
                                <span class="h-3 w-3 rounded-full bg-red-400"></span>
                                <span class="h-3 w-3 rounded-full bg-amber-400"></span>
                                <span class="h-3 w-3 rounded-full bg-green-400"></span>
                                <span class="ml-4 text-xs text-slate-400">JR SkyFlow Dashboard Preview</span>
                            </div>

                            <div class="flex min-h-64 gap-4 pt-4 text-left sm:min-h-80">
                                <aside class="hidden w-48 shrink-0 rounded-xl bg-slate-50 p-4 dark:bg-slate-800 sm:block">
                                    <div class="mb-6 text-xs font-bold text-slate-400">WORKSPACE</div>
                                    <div class="jr-theme-soft rounded-lg px-3 py-2 text-sm font-semibold">
                                        <i class="pi pi-home mr-2"></i> Dashboard
                                    </div>
                                    <div class="mt-3 px-3 text-sm text-slate-500 dark:text-slate-400">
                                        <i class="pi pi-user mr-2"></i> Profile
                                    </div>
                                    <div class="mt-3 px-3 text-sm text-slate-500 dark:text-slate-400">
                                        <i class="pi pi-cog mr-2"></i> Settings
                                    </div>
                                </aside>

                                <div class="min-w-0 flex-1 space-y-4 px-2">
                                    <div class="text-lg font-bold">Overview</div>

                                    <div class="grid grid-cols-3 gap-3">
                                        <div
                                            v-for="(stat, index) in [
                                                { label: 'Users', value: '1,284' },
                                                { label: 'Projects', value: '42' },
                                                { label: 'Activity', value: '98%' }
                                            ]"
                                            :key="index"
                                            class="rounded-xl border border-slate-100 p-3 dark:border-slate-700"
                                        >
                                            <div class="text-xs text-slate-500 dark:text-slate-400">{{ stat.label }}</div>
                                            <div class="jr-theme-text mt-2 text-xl font-bold">{{ stat.value }}</div>
                                        </div>
                                    </div>

                                    <div class="rounded-xl border border-slate-100 p-4 dark:border-slate-700">
                                        <div class="mb-3 text-sm font-semibold">Activity Overview</div>
                                        <svg viewBox="0 0 500 120" class="h-28 w-full" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="skyflowChart" x1="0" y1="0" x2="0" y2="1">
                                                    <stop class="jr-theme-chart-stop" offset="0%" stop-opacity="0.3" />
                                                    <stop class="jr-theme-chart-stop" offset="100%" stop-opacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M0 95 L60 75 L120 83 L180 42 L240 57 L300 25 L360 40 L420 12 L500 22 L500 120 L0 120 Z" fill="url(#skyflowChart)" />
                                            <path class="jr-theme-chart-line" d="M0 95 L60 75 L120 83 L180 42 L240 57 L300 25 L360 40 L420 12 L500 22" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p class="mt-4 text-xs text-slate-400">
                            Illustrative dashboard preview. Statistics are sample data.
                        </p>
                    </div>
                </section>

                <!-- Features -->
                <section id="features" class="bg-white px-6 py-24 dark:bg-slate-900">
                    <div class="mx-auto max-w-7xl">
                        <div class="mb-14 text-center">
                            <span class="jr-theme-text text-sm font-bold uppercase tracking-widest">Features</span>
                            <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Everything you need to get started
                            </h2>
                            <p class="mt-4 text-slate-600 dark:text-slate-300">
                                A practical foundation for modern Laravel applications.
                            </p>
                        </div>

                        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div
                                v-for="feature in features"
                                :key="feature.title"
                                class="jr-theme-card rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                            >
                                <div class="jr-theme-soft mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-xl">
                                    <i :class="feature.icon"></i>
                                </div>
                                <h3 class="text-lg font-bold">{{ feature.title }}</h3>
                                <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    {{ feature.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Final CTA -->
                <section class="px-6 py-24">
                    <div class="jr-theme-cta mx-auto max-w-5xl rounded-3xl px-8 py-16 text-center shadow-xl">
                        <h2 class="text-3xl font-bold sm:text-4xl">
                            Ready to build your next project?
                        </h2>
                        <p class="mx-auto mt-5 max-w-xl">
                            Start with JR SkyFlow and focus on the features that matter.
                        </p>
                        <Link
                            :href="canRegister ? '/register' : canLogin ? '/login' : '#features'"
                            class="jr-theme-text mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-3 font-bold transition hover:bg-slate-50"
                        >
                            Get Started <i class="pi pi-arrow-right"></i>
                        </Link>
                    </div>
                </section>
            </main>

            <!-- Footer -->
            
            <footer class="border-t border-slate-200 bg-white px-6 py-8 dark:border-slate-800 dark:bg-slate-950">
                <div class="mx-auto max-w-7xl">
                    <div class="flex flex-col items-center justify-between gap-5 sm:flex-row">

                        <!-- Branding -->
                        <div class="text-center sm:text-left">
                            <div class="text-lg font-bold">
                                JR <span class="jr-theme-heading">SkyFlow</span>
                            </div>
                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Laravel + Vue Starter Kit
                            </p>
                        </div>

                        <!-- Social Links -->
                        <div class="flex items-center gap-5">
                            <a
                                href="https://github.com/JoshRamiro19"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit my GitHub profile"
                                class="jr-theme-link text-slate-500 transition dark:text-slate-400"
                            >
                                <i class="pi pi-github text-xl"></i>
                            </a>

                            <a
                                href="https://www.facebook.com/joshua.ramiro.925"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit my Facebook profile"
                                class="jr-theme-link text-slate-500 transition dark:text-slate-400"
                            >
                                <i class="pi pi-facebook text-xl"></i>
                            </a>
                        </div>
                    </div>

                    <div class="mt-6 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
                        <p class="text-sm text-slate-500 dark:text-slate-400">
                            © {{ new Date().getFullYear() }} JR SkyFlow.
                            Built by
                            <span class="jr-theme-text font-semibold">
                                Joshua Martin S. Ramiro
                            </span>.
                        </p>
                        <p class="mt-2 text-xs text-slate-400">
                            Made for developers, by a developer.
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    </div>
</template>
