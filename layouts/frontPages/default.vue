<template>
    <div class="d-flex flex-column">
        <!-- NavigationBar -->
        <FrontPagesLayoutsNavigationBar/>

        <main>
            <slot/>
        </main>

        <FrontPagesLayoutsFooter />
    </div>
</template>

<style>
:root {
    --navbar-height: 60px;
}

main {
    margin-top: var(--navbar-height);
}
</style>
<script setup lang="ts">
</script>