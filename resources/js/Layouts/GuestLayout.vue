
<script setup>
import { Link } from '@inertiajs/vue3';
import { useLayout } from '@/Layouts/Sakai/composables/layout';

const { isDarkTheme, toggleDarkMode } = useLayout();
</script>

<template>
    <div
        class="min-h-screen bg-slate-50 text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-100"
    >
        <!-- Background decoration -->
        <div
            class="pointer-events-none fixed inset-0 overflow-hidden"
            aria-hidden="true"
        >
            <div
                class="jr-theme-glow absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl"
            ></div>

            <div
                class="jr-theme-glow absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl"
            ></div>
        </div>

        <div class="relative flex min-h-screen flex-col">
            <!-- Header -->
            <header
                class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6"
            >
                <Link
                    href="/"
                    class="flex items-center gap-3 no-underline"
                >
                    <span
                        class="jr-theme-background flex h-11 w-11 items-center justify-center rounded-xl text-lg font-extrabold tracking-tight shadow-md"
                        >
                        JR
                    </span>

                    <span
                        class="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
                    >
                        JR
                        <span class="jr-theme-heading">
                            SkyFlow
                        </span>
                    </span>
                </Link>

                <div class="flex items-center gap-3">
                    <span
                        class="hidden text-sm text-slate-500 dark:text-slate-400 sm:block"
                    >
                        Laravel + Vue Starter Kit
                    </span>

                    <!-- Theme toggle -->
                    <button
                        type="button"
                        class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        :aria-label="
                            isDarkTheme
                                ? 'Enable light mode'
                                : 'Enable dark mode'
                        "
                        @click="toggleDarkMode"
                    >
                        <i
                            :class="[
                                'pi',
                                isDarkTheme ? 'pi-sun' : 'pi-moon'
                            ]"
                        ></i>
                    </button>
                </div>
            </header>

            <!-- Authentication content -->
            <main
                class="flex flex-1 items-center justify-center px-4 py-10"
            >
                <div class="w-full max-w-md">
                    <div class="mb-8 text-center">
                        <h1
                            class="text-2xl font-bold text-slate-900 dark:text-white"
                        >
                            JR SkyFlow
                        </h1>

                        <p
                            class="mt-2 text-sm text-slate-500 dark:text-slate-400"
                        >
                            A modern Laravel + Vue experience
                        </p>
                    </div>

                    <div
                        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-colors dark:border-slate-700 dark:bg-slate-900 dark:shadow-none sm:p-8"
                    >
                        <slot />
                    </div>
                </div>
            </main>

            <!-- Footer -->
            <footer
                class="px-6 py-6 text-center text-xs text-slate-500 dark:text-slate-400"
            >
                &copy; {{ new Date().getFullYear() }} JR SkyFlow.
                Built by Joshua Martin S. Ramiro.
            </footer>
        </div>
    </div>
</template>
