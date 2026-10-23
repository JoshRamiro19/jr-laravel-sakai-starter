
<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="min-h-screen bg-sky-50 text-slate-800">
        <!-- Background decoration -->
        <div
            class="pointer-events-none fixed inset-0 overflow-hidden"
            aria-hidden="true"
        >
            <div
                class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-200/50 blur-3xl"
            ></div>
            <div
                class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl"
            ></div>
        </div>

        <div class="relative flex min-h-screen flex-col">
            <!-- Header -->
            <header class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                <Link
                    href="/"
                    class="flex items-center gap-3 no-underline"
                >
                    <span
                        class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-sky-400 text-lg font-extrabold tracking-tight text-white shadow-md shadow-sky-200"
                    >
                        JR
                    </span>

                    <span class="text-xl font-bold tracking-tight text-slate-900">
                        JR <span class="text-sky-600">SkyFlow</span>
                    </span>
                </Link>

                <span class="hidden text-sm text-slate-500 sm:block">
                    Laravel + Vue Starter Kit
                </span>
            </header>

            <!-- Authentication content -->
            <main class="flex flex-1 items-center justify-center px-4 py-10">
                <div class="w-full max-w-md">
                    <div class="mb-8 text-center">
                        <h1 class="text-2xl font-bold text-slate-900">
                            JR SkyFlow
                        </h1>

                        <p class="mt-2 text-sm text-slate-500">
                            A modern Laravel + Vue experience
                        </p>
                    </div>

                    <div
                        class="rounded-2xl border border-sky-100 bg-white p-6 shadow-xl shadow-sky-100/60 sm:p-8"
                    >
                        <slot />
                    </div>
                </div>
            </main>

            <!-- Footer -->
            <footer class="px-6 py-6 text-center text-xs text-slate-500">
                &copy; {{ new Date().getFullYear() }} JR SkyFlow.
                Built by Joshua Martin S. Ramiro.
            </footer>
        </div>
    </div>
</template>
