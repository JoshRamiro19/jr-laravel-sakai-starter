
<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import { useLayout } from './composables/layout';

defineOptions({ name: 'AppMenuItem' });

const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    root: {
        type: Boolean,
        default: true
    },
    parentPath: {
        type: String,
        default: null
    }
});

const page = usePage();
const { layoutState, isDesktop } = useLayout();

const currentPath = computed(() => page.url.split('?')[0]);

const fullPath = computed(() =>
    props.item.path
        ? (props.parentPath || '') + props.item.path
        : null
);

const isActive = computed(() => {
    if (props.item.items) {
        return layoutState.activePath === fullPath.value;
    }

    return props.item.to === currentPath.value;
});

const itemClick = (event, item) => {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    if (item.command) {
        item.command({ originalEvent: event, item });
    }

    if (item.items) {
        layoutState.activePath = isActive.value
            ? null
            : fullPath.value;

        layoutState.menuHoverActive = true;
    } else {
        layoutState.overlayMenuActive = false;
        layoutState.mobileMenuActive = false;
        layoutState.menuHoverActive = false;
    }
};

const onMouseEnter = () => {
    if (
        isDesktop() &&
        props.root &&
        props.item.items &&
        layoutState.menuHoverActive
    ) {
        layoutState.activePath = fullPath.value;
    }
};
</script>

<template>
    <li
        v-if="item.visible !== false"
        :class="{
            'layout-root-menuitem': root,
            'active-menuitem': isActive
        }"
    >
        <div v-if="root" class="layout-menuitem-root-text">
            {{ item.label }}
        </div>

        <a
            v-if="(!item.to || item.items)"
            :href="item.url || '#'"
            :target="item.target"
            :class="item.class"
            tabindex="0"
            @click="itemClick($event, item)"
            @mouseenter="onMouseEnter"
        >
            <i :class="item.icon" class="layout-menuitem-icon"></i>

            <span class="layout-menuitem-text">
                {{ item.label }}
            </span>

            <i
                v-if="item.items"
                class="pi pi-fw pi-angle-down layout-submenu-toggler"
            ></i>
        </a>

        <Link
            v-if="item.to && !item.items"
            :href="item.to"
            :class="[
                item.class,
                { 'active-route': isActive }
            ]"
            tabindex="0"
            @click="itemClick($event, item)"
            @mouseenter="onMouseEnter"
        >
            <i :class="item.icon" class="layout-menuitem-icon"></i>

            <span class="layout-menuitem-text">
                {{ item.label }}
            </span>
        </Link>

        <Transition
            v-if="item.items"
            name="layout-submenu"
        >
            <ul
                v-show="root || isActive"
                class="layout-submenu"
            >
                <AppMenuItem
                    v-for="child in item.items"
                    :key="child.label + '_' + (child.to || child.path)"
                    :item="child"
                    :root="false"
                    :parent-path="fullPath"
                />
            </ul>
        </Transition>
    </li>
</template>
