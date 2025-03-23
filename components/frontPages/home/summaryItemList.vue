<script lang="ts">
type Props = {
    model: SummaryItemDetailModel[];
}
</script>

<script setup lang="ts">
// Props.
defineProps<Props>();

// Computed.
function computeItemParagraphs(item: SummaryItemDetailModel): string[] {
    return item.detailContent.split(/\r?\n/);
}
</script>

<template>
    <div class="container my-5">
        <div class="row g-3">
            <div
                v-for="item in model"
                class="col col-xl-3 col-md-6 col-12 p-3 d-flex flex-column align-items-center"
            >
                <img
                    class="rounded-circle summary-item-thumbnail mb-3 shadow"
                    :src="item.thumbnailUrl"
                    :alt="item.name"
                >
                <span class="fs-3 text-center text-success mb-3">
                    {{ item.name }}
                </span>


                <p>
                    {{ item.summaryContent }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.summary-item-thumbnail {
    width: 150px;
    height: 150px;
    aspect-ratio: 1;
}
</style>