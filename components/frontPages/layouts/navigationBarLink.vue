<script lang="ts">
type Props = {
    path: string;
};
</script>

<script setup lang="ts">
// Props.
const props = defineProps<Props>();

// Dependencies.
const route = useRoute();

// Computed.
const activeClass = computed<string | undefined>(() => {
    if (route.path === "/" && props.path === "/") {
        return "active";
    }

    return route.path !== "/" && route.path.startsWith(props.path) ? "active" : undefined;
});
</script>

<template>
    <li class="nav-item">
        <NuxtLink :href="path" class="nav-link" :class="{ active: route.path.startsWith(props.path) }">
            <slot />
        </NuxtLink>
    </li>
</template>

<style scoped>
.nav-link {
    margin-right: 15px;
    padding: 3px 10px;
    border-radius: 8px;
}

.nav-link.active {
    background-color: var(--navbar-foreground-color) !important;
    color: var(--navbar-background-color);
}
</style>