<script lang="ts">
type Props = {
    model: CatalogItemBasicModel[];
};
</script>

<script setup lang="ts">
// Props.
const props = defineProps<Props>();

// Computed.
const title = computed<string>(() => {
    if (!props.model.length) {
        return "";
    }

    switch (props.model[0].type) {
        case CatalogItemType.Service:
            return "Dịch vụ";
        case CatalogItemType.Course:
            return "Khoá học";
        case CatalogItemType.Product:
            return "Sản phẩm";
        default:
            return "";
    }
});
</script>

<template>
    <div class="container" v-if="model.length">
        <div class="row g-4 align-items-stretch mt-5 catalog-items-row">
            <div class="col col-12 fs-2 text-success text-center mb-2">
                {{ title }}
            </div>

            <template v-for="item in model" :key="item.id">
                <div class="col col-xl-3 col-lg-4 col-md-6 col-sm-10 col-10
                            justify-self-md-start justify-self-sm-center">
                    <div class="card h-100 shadow-sm">
                        <img
                            :src="item.thumbnailUrl"
                            class="card-img-top catalog-item-thumbnail"
                            :alt="item.name"
                        />

                        <div class="card-body d-flex flex-column flex-fill
                                    justify-content-between align-items-start">
                            <h5 class="card-title">
                                {{ item.name }}
                            </h5>

                            <NuxtLink
                                :href="item.detailRoute"
                                class="btn btn-outline-success mt-2"
                            >
                                Chi tiết
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.catalog-item-thumbnail {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: 50% 50%;
}

@media (max-width: 768px) {
    .catalog-items-row.row {
        width: fit-content !important;
        justify-content: center;
    }
}

@media (max-width: 576px) {
    .catalog-items-row.row {
        width: 100%;
    }
}
</style>