
<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useLayout } from './composables/layout';
import AppMenu from './AppMenu.vue';

const page = usePage();

const { layoutState, isDesktop, hasOpenOverlay } = useLayout();

const sidebarRef = ref(null);

let outsideClickListener = null;

watch(
    () => page.url,
    (newPath) => {
        if (isDesktop()) {
            layoutState.activePath = null;
        } else {
            layoutState.activePath = newPath.split('?')[0];
        }

        layoutState.overlayMenuActive = false;
        layoutState.mobileMenuActive = false;
        layoutState.menuHoverActive = false;
    },
    { immediate: true }
);

watch(
    hasOpenOverlay,
    (newValue) => {
        if (isDesktop()) {
            if (newValue) {
                bindOutsideClickListener();
            } else {
                unbindOutsideClickListener();
            }
        }
    }
);

const bindOutsideClickListener = () => {
    if (outsideClickListener) return;

    outsideClickListener = (event) => {
        if (isOutsideClicked(event)) {
            layoutState.overlayMenuActive = false;
        }
    };

    document.addEventListener('click', outsideClickListener);
};

const unbindOutsideClickListener = () => {
    if (!outsideClickListener) return;

    document.removeEventListener('click', outsideClickListener);
    outsideClickListener = null;
};

const isOutsideClicked = (event) => {
    const sidebar = sidebarRef.value;

    const topbarButton = document.querySelector(
        '.layout-menu-button'
    );

    if (!sidebar) return false;

    return !(
        sidebar.contains(event.target) ||
        topbarButton?.contains(event.target)
    );
};

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
</script>

<template>
    <div ref="sidebarRef" class="layout-sidebar">
        <AppMenu />
    </div>
</template>
