/**
 * Vue Router configuration.
 * Hash mode for static hosting compatibility (GitHub Pages).
 *
 * @module router
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import GalleryView from './views/GalleryView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'gallery',
    component: GalleryView,
  },
  {
    path: '/shader/:slug',
    name: 'shader-detail',
    component: () => import('./views/ShaderDetailView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
