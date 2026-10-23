
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import {
    colorTheme,
    setColorTheme,
    themeColors
} from './composables/layout';

const isOpen = ref(false);
const panelRef = ref(null);

const colors = Object.entries(themeColors).map(([name, hex]) => ({
    name,
    hex
}));

function updateMode(mode) {
    setColorTheme({ mode });
}

function updatePrimary(primary) {
    setColorTheme({ primary });
}

function updateSecondary(secondary) {
    setColorTheme({ secondary });
}

function closeOnOutsideClick(event) {
    if (panelRef.value && !panelRef.value.contains(event.target)) {
        isOpen.value = false;
    }
}

function closeOnEscape(event) {
    if (event.key === 'Escape') {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
});

onUnmounted(() => {
    document.removeEventListener('pointerdown', closeOnOutsideClick);
    document.removeEventListener('keydown', closeOnEscape);
});
</script>

<template>
    <div ref="panelRef" class="jr-theme-settings">
        <!-- Palette toggle -->
        <button
            type="button"
            class="layout-topbar-action"
            title="Customize theme"
            aria-label="Customize theme"
            :aria-expanded="isOpen"
            @click="isOpen = !isOpen"
        >
            <i class="pi pi-palette"></i>
        </button>

        <!-- Settings panel -->
        <div
            v-if="isOpen"
            class="jr-theme-panel"
            role="region"
            aria-label="Theme settings"
        >
            <div class="jr-theme-header">
                <div>
                    <h3>Theme Settings</h3>
                    <p>Personalize your workspace</p>
                </div>

                <button
                    type="button"
                    class="jr-close-button"
                    aria-label="Close theme settings"
                    @click="isOpen = false"
                >
                    <i class="pi pi-times"></i>
                </button>
            </div>

            <!-- Mode selection -->
            <div class="jr-theme-section">
                <label class="jr-section-label">Color mode</label>

                <div class="jr-mode-options">
                    <button
                        type="button"
                        :class="{ active: colorTheme.mode === 'single' }"
                        @click="updateMode('single')"
                    >
                        Single
                    </button>

                    <button
                        type="button"
                        :class="{ active: colorTheme.mode === 'gradient' }"
                        @click="updateMode('gradient')"
                    >
                        Gradient
                    </button>
                </div>
            </div>

            <!-- Primary colors -->
            <div class="jr-theme-section">
                <label class="jr-section-label">
                    Primary color
                </label>

                <div class="jr-color-options">
                    <button
                        v-for="color in colors"
                        :key="color.name"
                        type="button"
                        class="jr-color-option"
                        :class="{
                            selected: colorTheme.primary === color.name
                        }"
                        :style="{ backgroundColor: color.hex }"
                        :title="color.name"
                        :aria-label="`Primary: ${color.name}`"
                        :aria-pressed="colorTheme.primary === color.name"
                        @click="updatePrimary(color.name)"
                    >
                        <i
                            v-if="colorTheme.primary === color.name"
                            class="pi pi-check"
                        ></i>
                    </button>
                </div>
            </div>

            <!-- Gradient ending colors -->
            <div
                v-if="colorTheme.mode === 'gradient'"
                class="jr-theme-section"
            >
                <label class="jr-section-label">
                    Gradient end color
                </label>

                <div class="jr-color-options">
                    <button
                        v-for="color in colors"
                        :key="color.name"
                        type="button"
                        class="jr-color-option"
                        :class="{
                            selected: colorTheme.secondary === color.name
                        }"
                        :style="{ backgroundColor: color.hex }"
                        :title="color.name"
                        :aria-label="`Gradient end: ${color.name}`"
                        :aria-pressed="colorTheme.secondary === color.name"
                        @click="updateSecondary(color.name)"
                    >
                        <i
                            v-if="colorTheme.secondary === color.name"
                            class="pi pi-check"
                        ></i>
                    </button>
                </div>
            </div>

            <!-- Live preview -->
            <div class="jr-theme-section">
                <label class="jr-section-label">
                    Preview
                </label>

                <div
                    class="jr-theme-preview"
                >
                    <i class="pi pi-sparkles"></i>
                    JR SkyFlow
                </div>
            </div>

            <p class="jr-theme-note">
                Your selections are saved automatically.
            </p>
        </div>
    </div>
</template>

<style scoped>
.jr-theme-settings {
    position: relative;
    display: flex;
    align-items: center;
}

.jr-theme-panel {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    z-index: 1100;
    width: min(340px, calc(100vw - 2rem));
    padding: 1.25rem;
    border-radius: 1rem;
    border: 1px solid var(--surface-border, #334155);
    background: var(--surface-card, #ffffff);
    color: var(--text-color, #0f172a);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.jr-theme-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
}

.jr-theme-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
}

.jr-theme-header p,
.jr-theme-note {
    margin: 0.3rem 0 0;
    font-size: 0.8rem;
    opacity: 0.65;
}

.jr-close-button {
    padding: 0.4rem;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
}

.jr-theme-section {
    margin-bottom: 1.25rem;
}

.jr-section-label {
    display: block;
    margin-bottom: 0.75rem;
    font-size: 0.85rem;
    font-weight: 600;
}

.jr-mode-options {
    display: flex;
    gap: 0.5rem;
}

.jr-mode-options button {
    flex: 1;
    padding: 0.65rem;
    border: 1px solid var(--surface-border, #cbd5e1);
    border-radius: 0.6rem;
    background: transparent;
    color: inherit;
    cursor: pointer;
}

.jr-mode-options button.active {
    border-color: var(--jr-accent-text);
    background: color-mix(in srgb, var(--jr-primary) 12%, transparent);
    color: var(--jr-accent-text);
    font-weight: 700;
}

.jr-color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.jr-color-option {
    display: flex;
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    border-radius: 50%;
    color: white;
    cursor: pointer;
}

.jr-color-option.selected {
    outline: 2px solid var(--text-color, #0f172a);
    outline-offset: 3px;
}

.jr-theme-preview {
    display: flex;
    min-height: 70px;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    border-radius: 0.75rem;
    background: var(--jr-button-background);
    color: var(--jr-accent-contrast);
    font-weight: 700;
}

.jr-theme-note {
    text-align: center;
}

:global(.app-dark) .jr-theme-panel {
    background: #1e293b;
    border-color: #475569;
    color: #f8fafc;
}

:global(.app-dark) .jr-mode-options button.active {
    color: var(--jr-accent-text-dark);
}
</style>
