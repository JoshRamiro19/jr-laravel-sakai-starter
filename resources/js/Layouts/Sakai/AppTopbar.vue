
<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { useLayout } from './composables/layout';

import ThemeSettings from './ThemeSettings.vue';

const page = usePage();

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();

const user = computed(() => page.props.auth?.user);

const dashboardUrl = '/dashboard';
const profileUrl = '/profile';
const logoutUrl = '/logout';
</script>

<template>
    <div class="layout-topbar">

        <div class="layout-topbar-logo-container">
            <!-- Responsive sidebar toggle -->
            <button
                type="button"
                class="layout-menu-button layout-topbar-action"
                aria-label="Toggle sidebar"
                @click="toggleMenu"
            >
                <i class="pi pi-bars"></i>
            </button>

            <!-- JR SkyFlow branding -->
            <Link :href="dashboardUrl" class="layout-topbar-logo">
                <span class="jr-brand-icon">JR</span>

                <span class="jr-brand-text">
                    JR <span class="jr-theme-heading">SkyFlow</span>
                </span>
            </Link>
        </div>

        <div class="layout-topbar-actions">
            <ThemeSettings />

            <!-- Dark mode toggle -->
            <button
                type="button"
                class="layout-topbar-action"
                :aria-label="isDarkTheme ? 'Enable light mode' : 'Enable dark mode'"
                @click="toggleDarkMode"
            >
                <i
                    :class="[
                        'pi',
                        isDarkTheme ? 'pi-moon' : 'pi-sun'
                    ]"
                ></i>
            </button>

            <!-- Profile -->
            <Link
                :href="profileUrl"
                class="layout-topbar-action jr-profile-link"
                title="My Profile"
            >
                <i class="pi pi-user"></i>
                <span class="jr-user-name">
                    {{ user?.name || 'User' }}
                </span>
            </Link>

            <!-- Logout -->
            <Link
                :href="logoutUrl"
                method="post"
                as="button"
                class="layout-topbar-action"
                title="Logout"
            >
                <i class="pi pi-sign-out"></i>
            </Link>
        </div>
    </div>
</template>

<style scoped>
.jr-brand-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.7rem;
    background: var(--jr-button-background);
    color: var(--jr-accent-contrast);
    font-weight: 800;
    font-size: 0.9rem;
    letter-spacing: -0.04em;
}

.jr-brand-text {
    font-size: 1.15rem;
    font-weight: 700;
    white-space: nowrap;
}

.jr-profile-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
}

.jr-user-name {
    font-size: 0.875rem;
    font-weight: 500;
}

@media (max-width: 640px) {
    .jr-user-name {
        display: none;
    }

    .jr-brand-text {
        font-size: 1rem;
    }
}
</style>
