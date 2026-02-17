<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useShaderDetail } from "../composables/useShaderDetail";
import { useNeutronMotion } from "../composables/useNeutronMotion";
import { useSineWaveHover } from "../composables/useSineWaveHover";
import { CARD_EXPAND_MS, SHADER_START_DELAY_MS } from "../constants";
import ShaderRenderer from "../components/ShaderRenderer.vue";
import CodeViewer from "../components/CodeViewer.vue";
import ShaderInfoDrawer from "../components/ShaderInfoDrawer.vue";

const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;
const {
    shader,
    notFound,
    activeTab,
    isInfoDrawerOpen,
    openInfoDrawer,
    closeInfoDrawer,
} = useShaderDetail(slug);

const { prefersReducedMotion } = useNeutronMotion();

const rendererRef = ref<InstanceType<typeof ShaderRenderer> | null>(null);
const isEntering = ref(true);
const detailRef = ref<HTMLElement | null>(null);

useSineWaveHover(detailRef, ".tab-button, .action-button, .link-button");

/** Whether the initial entrance animation has completed */
const hasEntered = ref(false);

onMounted(() => {
    if (prefersReducedMotion.value === "reduced") {
        isEntering.value = false;
        hasEntered.value = true;
        rendererRef.value?.startRendering();
        return;
    }
    setTimeout(() => {
        isEntering.value = false;
        // Start shader compilation + rendering after entrance animation + buffer,
        // so WebGL work doesn't jank the FLIP transition.
        setTimeout(() => {
            hasEntered.value = true;
            rendererRef.value?.startRendering();
        }, SHADER_START_DELAY_MS);
    }, CARD_EXPAND_MS);
});

// When switching back to the render tab, the v-if recreates ShaderRenderer.
// Wait for the new component to mount, then start it.
watch(activeTab, (tab) => {
    if (tab === "render" && hasEntered.value) {
        nextTick(() => {
            rendererRef.value?.startRendering();
        });
    }
});

/**
 * Toggles fullscreen mode on the renderer container.
 */
function toggleFullscreen(): void {
    const canvas = rendererRef.value?.canvasRef;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        container.requestFullscreen();
    }
}

/**
 * Captures the current renderer frame as a PNG image.
 */
function takeScreenshot(): void {
    const canvas = rendererRef.value?.canvasRef;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${slug}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

/**
 * Opens the code tab from the mobile drawer action.
 */
function showCodeFromDrawer(): void {
    activeTab.value = "code";
    closeInfoDrawer();
}

/**
 * Navigates back with a fade-out transition.
 */
function navigateBack(event: MouseEvent): void {
    if (prefersReducedMotion.value === "reduced") return;

    event.preventDefault();
    const view = (event.target as HTMLElement).closest(".detail-view");
    if (view) {
        (view as HTMLElement)
            .animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 200,
                fill: "forwards",
            })
            .finished.then(() => {
                router.push("/");
            });
    } else {
        router.push("/");
    }
}
</script>

<template>
    <div
        ref="detailRef"
        class="detail-view n-layout-shell"
        :class="{ 'detail--entering': isEntering }"
    >
        <!-- Not found state -->
        <div v-if="notFound" class="not-found">
            <h1>Shader Not Found</h1>
            <p>No shader with slug "{{ slug }}" exists.</p>
            <router-link to="/" class="back-link"
                >&larr; Back to Gallery</router-link
            >
        </div>

        <!-- Shader detail -->
        <template v-else-if="shader">
            <header class="brand-header detail-stagger-1">
                <router-link
                    to="/"
                    class="brand-link"
                    aria-label="Back to gallery"
                >
                    <svg
                        class="brand-logo"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="32.9 174.743 71.888 63.576"
                        aria-hidden="true"
                    >
                        <path
                            d="M 57.971 224.292 L 57.971 203.374 L 57.971 194.861 L 75.109 194.861 L 75.109 188.769 L 63.16 188.769 L 63.16 174.743 L 57.971 174.743 L 57.971 189.041 L 57.971 194.861 L 32.9 194.861 L 32.9 203.773 L 50.377 203.773 L 50.377 224.292 L 57.971 224.292 Z M 79.717 238.319 L 79.717 224.02 L 79.717 218.2 L 104.788 218.2 L 104.788 209.287 L 87.31 209.287 L 87.31 188.769 L 79.717 188.769 L 79.717 209.686 L 79.717 218.2 L 62.579 218.2 L 62.579 224.293 L 74.526 224.293 L 74.526 238.319 L 79.717 238.319 Z"
                        />
                    </svg>
                </router-link>
                <h1 class="brand-title">Guinetik's Shaders</h1>
            </header>

            <nav class="detail-nav n-panel detail-stagger-2">
                <router-link to="/" class="back-link" @click="navigateBack"
                    >&larr; Back</router-link
                >
                <div class="tab-bar">
                    <button
                        class="tab-button"
                        :class="{ active: activeTab === 'render' }"
                        @click="activeTab = 'render'"
                    >
                        Render
                    </button>
                    <button
                        class="tab-button"
                        :class="{ active: activeTab === 'code' }"
                        @click="activeTab = 'code'"
                    >
                        Code
                    </button>
                </div>
            </nav>

            <section class="tab-content detail-stagger-3">
                <ShaderRenderer
                    v-if="activeTab === 'render'"
                    ref="rendererRef"
                    :passes="shader.passes"
                    :channels="shader.channels"
                    :commonsSources="shader.commonsSources"
                    :screenshotUrl="shader.screenshotUrl"
                    :deferStart="true"
                />
                <CodeViewer
                    v-else
                    :passes="shader.passes"
                    :commonsSources="shader.commonsSources"
                />
            </section>

            <div v-if="activeTab === 'render'" class="action-bar">
                <button class="action-button" @click="toggleFullscreen">
                    <span class="action-icon">[ ]</span> Fullscreen
                </button>
                <button class="action-button" @click="takeScreenshot">
                    <span class="action-icon">[*]</span> Screenshot
                </button>
                <a
                    v-if="shader.links.shadertoy"
                    :href="shader.links.shadertoy"
                    target="_blank"
                    rel="noopener"
                    class="action-button"
                >
                    <span class="action-icon">&gt;_</span> Shadertoy
                </a>
            </div>

            <section class="metadata n-panel detail-stagger-4">
                <h1 class="shader-title">{{ shader.title }}</h1>
                <p class="shader-description">{{ shader.description }}</p>
                <div class="shader-meta-row">
                    <span class="shader-date">{{ shader.date }}</span>
                    <div class="shader-tags">
                        <span
                            v-for="tag in shader.tags"
                            :key="tag"
                            class="tag-pill"
                            >{{ tag }}</span
                        >
                    </div>
                </div>
                <div
                    v-if="shader.links.shadertoy || shader.links.shaderkit"
                    class="shader-links"
                >
                    <a
                        v-if="shader.links.shadertoy"
                        :href="shader.links.shadertoy"
                        target="_blank"
                        rel="noopener"
                        class="link-button"
                        >Shadertoy</a
                    >
                    <a
                        v-if="shader.links.shaderkit"
                        :href="shader.links.shaderkit"
                        target="_blank"
                        rel="noopener"
                        class="link-button"
                        >ShaderKit</a
                    >
                </div>
            </section>

            <!-- Mobile overlay controls (render mode only) -->
            <div v-if="activeTab === 'render'" class="mobile-overlay-controls">
                <router-link
                    to="/"
                    class="mobile-overlay-btn"
                    aria-label="Back to gallery"
                >
                    &larr;
                </router-link>
                <button
                    class="mobile-overlay-btn"
                    type="button"
                    aria-label="Open shader info"
                    @click="openInfoDrawer"
                >
                    i
                </button>
            </div>

            <!-- Mobile helper controls while viewing code -->
            <div v-if="activeTab === 'code'" class="mobile-code-controls">
                <router-link
                    to="/"
                    class="mobile-overlay-btn"
                    aria-label="Back to gallery"
                >
                    &larr;
                </router-link>
                <button
                    class="mobile-overlay-btn"
                    type="button"
                    aria-label="Back to render view"
                    @click="activeTab = 'render'"
                >
                    ▶
                </button>
            </div>

            <ShaderInfoDrawer
                :shader="shader"
                :isOpen="isInfoDrawerOpen"
                @close="closeInfoDrawer"
                @showCode="showCodeFromDrawer"
                @fullscreen="toggleFullscreen"
                @screenshot="takeScreenshot"
            />
        </template>
    </div>
</template>

<style scoped>
.detail-view {
    position: relative;
    max-width: 1500px;
}

/* -- Brand header -- */
.brand-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.brand-link {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    border: 1px solid var(--n-border);
    background: var(--n-surface);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}

@media (hover: hover) {
    .brand-link:hover {
        border-color: var(--n-border-active);
        box-shadow: 0 0 12px var(--n-glow);
    }
}

.brand-logo {
    width: 22px;
    height: 22px;
    display: block;
    fill: currentColor;
    color: var(--n-text-white);
}

.brand-title {
    color: var(--n-text-white);
    font-size: 18px;
    font-weight: 700;
    margin: 0;
}

/* -- Entrance stagger animation -- */
.detail-stagger-1,
.detail-stagger-2,
.detail-stagger-3,
.detail-stagger-4 {
    transition:
        opacity 400ms ease-out,
        transform 400ms ease-out;
}

.detail--entering .detail-stagger-1 {
    opacity: 0;
    transform: translateY(12px);
    transition-delay: 150ms;
}

.detail--entering .detail-stagger-2 {
    opacity: 0;
    transform: translateY(12px);
    transition-delay: 250ms;
}

.detail--entering .detail-stagger-3 {
    opacity: 0;
    transform: translateY(12px);
    transition-delay: 350ms;
}

.detail--entering .detail-stagger-4 {
    opacity: 0;
    transform: translateY(12px);
    transition-delay: 450ms;
}

@media (prefers-reduced-motion: reduce) {
    .detail-stagger-1,
    .detail-stagger-2,
    .detail-stagger-3,
    .detail-stagger-4 {
        transition: none;
    }

    .detail--entering .detail-stagger-1,
    .detail--entering .detail-stagger-2,
    .detail--entering .detail-stagger-3,
    .detail--entering .detail-stagger-4 {
        opacity: 1;
        transform: none;
    }
}

.not-found {
    text-align: center;
    padding: 64px 16px;
    color: var(--n-text-dim);
}

.not-found h1 {
    color: var(--n-text-white);
    font-size: 24px;
    margin-bottom: 8px;
}

.back-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--n-text);
    font-size: 14px;
    text-decoration: none;
    transition: text-shadow 0.2s;
}

@media (hover: hover) {
    .back-link:hover {
        text-shadow: 0 0 12px var(--n-glow);
    }
}

.detail-nav {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 10px 12px;
    border-radius: 8px;
}

.tab-bar {
    display: flex;
    gap: 8px;
}

.tab-button {
    min-width: 96px;
    padding: 10px 14px;
    background: rgba(14, 21, 35, 0.8);
    border: 1px solid var(--n-border);
    border-radius: 8px;
    color: var(--n-text);
    font-family: "Fira Code", monospace;
    font-size: 14px;
    cursor: pointer;
    min-height: 44px;
    transition:
        border-color 0.2s,
        background 0.2s,
        box-shadow 0.2s;
}

.tab-button.active {
    border-color: var(--n-border-active);
    background: var(--n-bg-hover);
    box-shadow: 0 0 12px var(--n-glow);
}

.tab-content {
    position: relative;
}

.action-bar {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

.action-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    min-height: 44px;
    background: var(--n-bg);
    border: 1px solid var(--n-border);
    border-radius: 8px;
    color: var(--n-text);
    font-family: "Fira Code", monospace;
    font-size: 12px;
    cursor: pointer;
    text-decoration: none;
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}

.action-icon {
    color: var(--n-text-dim);
}

@media (hover: hover) {
    .action-button:hover {
        border-color: var(--n-border-active);
        box-shadow: 0 0 12px var(--n-glow);
    }
}

.metadata {
    margin-top: 16px;
    padding: 16px;
    border-radius: 8px;
}

.shader-title {
    color: var(--n-text-white);
    font-size: 20px;
    margin-top: 0;
}

.shader-description {
    color: var(--n-text-dim);
    font-size: 14px;
    margin-top: 8px;
    line-height: 1.5;
}

.shader-meta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 12px;
    flex-wrap: wrap;
}

.shader-date {
    color: var(--n-text-dim);
    font-size: 12px;
}

.shader-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.tag-pill {
    font-size: 10px;
    padding: 2px 8px;
    border: 1px solid var(--n-border);
    border-radius: 8px;
    color: var(--n-text-dim);
}

.shader-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
}

.link-button {
    display: block;
    padding: 12px 16px;
    background: rgba(14, 21, 35, 0.8);
    border: 1px solid var(--n-border);
    border-radius: 8px;
    color: var(--n-text);
    font-size: 12px;
    text-decoration: none;
    text-align: center;
    min-height: 44px;
    transition: all 0.2s;
}

@media (hover: hover) {
    .link-button:hover {
        border-color: var(--n-border-active);
        box-shadow: 0 0 12px var(--n-glow);
    }
}

.mobile-overlay-controls,
.mobile-code-controls {
    display: none;
}

.mobile-overlay-btn {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid var(--n-border);
    background: rgba(10, 15, 26, 0.8);
    color: var(--n-text-white);
    font-family: "Fira Code", monospace;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
}

@media (min-width: 768px) {
    .metadata {
        padding: 20px;
    }

    .shader-title {
        font-size: 24px;
    }

    .shader-links {
        flex-direction: row;
    }

    .link-button {
        display: inline-block;
        padding: 8px 16px;
        text-align: left;
    }
}

@media (min-width: 1440px) {
    .shader-title {
        font-size: 30px;
    }
}

@media (max-width: 767px) {
    .detail-view {
        padding: 0;
        max-width: none;
    }

    .brand-header,
    .detail-nav,
    .action-bar,
    .metadata {
        display: none;
    }

    .tab-content {
        min-height: 100dvh;
        border-radius: 0;
    }

    .tab-content :deep(.renderer-container),
    .tab-content :deep(.shader-canvas) {
        width: 100%;
        min-height: 100dvh;
        height: 100dvh;
        aspect-ratio: auto;
        border-radius: 0;
        border: 0;
    }

    .tab-content :deep(.code-viewer) {
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        padding: calc(64px + var(--n-safe-top)) 12px
            calc(12px + var(--n-safe-bottom));
        background: var(--n-surface);
    }

    .tab-content :deep(.code-viewer .code-panel) {
        flex: 1;
        min-height: 0;
        max-height: none;
    }

    .mobile-overlay-controls,
    .mobile-code-controls {
        position: fixed;
        top: calc(12px + var(--n-safe-top));
        left: max(12px, var(--n-safe-left));
        right: max(12px, var(--n-safe-right));
        z-index: 65;
        display: flex;
        justify-content: space-between;
    }
}
</style>
