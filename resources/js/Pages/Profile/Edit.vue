
<script setup>
import { Head } from '@inertiajs/vue3';

import AppLayout from '@/Layouts/Sakai/AppLayout.vue';

import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});
</script>

<template>
    <Head title="My Profile" />

    <AppLayout>
        <div class="space-y-6">
            <!-- Page Heading -->
            <div>
                <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
                    My Profile
                </h1>

                <p class="mt-1 text-sm text-surface-500 dark:text-surface-400">
                    Manage your account information, password, and preferences.
                </p>
            </div>

            <!-- Profile Information -->
            <div class="jr-profile-card">
                <UpdateProfileInformationForm
                    :must-verify-email="mustVerifyEmail"
                    :status="status"
                    class="max-w-xl"
                />
            </div>

            <!-- Update Password -->
            <div class="jr-profile-card">
                <UpdatePasswordForm class="max-w-xl" />
            </div>

            <!-- Delete Account -->
            <div class="jr-profile-card">
                <DeleteUserForm class="max-w-xl" />
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
.jr-profile-card {
    background: var(--p-content-background, #ffffff);
    color: var(--p-text-color, #334155);
    border: 1px solid var(--p-content-border-color, #e2e8f0);
    border-radius: 0.875rem;
    padding: 1.75rem;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.035);
}

@media (max-width: 640px) {
    .jr-profile-card {
        padding: 1.25rem;
    }
}
</style>
