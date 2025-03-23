<script lang="ts">
type Props = {
    model: string;
}
</script>

<script setup lang="ts">
// Props.
defineProps<Props>();
</script>

<template>
    <div class="container-fluid text-center text-white fw-bold p-2 mb-3 shadow">
        {{ model }}
    </div>
</template>

<style scoped>
.container-fluid {
    background-color: rgb(20, 112, 70);
    font-size: 1.4em;
}
</style>