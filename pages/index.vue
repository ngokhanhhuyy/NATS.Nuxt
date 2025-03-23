<script lang="ts">
type Model = {
    sliderItems: SliderItemDetailModel[];
    summaryItems: SummaryItemDetailModel[];
    aboutUsIntroduction: AboutUsIntroductionDetailModel;
    catalogItems: CatalogItemBasicModel[];
    generalSettings: GeneralSettingsDetailModel;
}

async function fetchAsync(): Promise<Model> {
    const [
        sliderItemResponseDtos,
        summaryItemResponseDtos,
        aboutUsIntroductionResponseDto,
        catalogItemResponseDtos,
        generalSettingsResponseDto
    ] = await Promise.all([
        getSliderItemListAsync(),
        getSummaryItemListAsync(),
        getAboutUsIntroductionAsync(),
        getCatalogItemListAsync(),
        getGeneralSettingsAsync()
    ]);

    return {
        sliderItems: sliderItemResponseDtos.map(dto => createSliderItemDetailModel(dto)),
        summaryItems: summaryItemResponseDtos.map(dto => createSummaryItemDetailModel(dto)),
        aboutUsIntroduction: createAboutUsIntroductionDetailModel(
            aboutUsIntroductionResponseDto),
        catalogItems: catalogItemResponseDtos.map(dto => createCatalogItemBasicModel(dto)),
        generalSettings: createGeneralSettingsDetailModel(generalSettingsResponseDto)
    }
}
</script>

<script setup lang="ts">
import type { Carousel } from "bootstrap";

// Page meta.
definePageMeta({
    layout: "front-pages-default",
});

// Head.
useHead({ title: "Trang chủ" });

// Fetch.
const isHydrated = ref<boolean>(false);
const carouselController = ref<Carousel>();
const { data: model } = await useAsyncData("homePage", fetchAsync);

if (model.value == null) {
    throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

// Hooks.
onMounted(() => {
    const { $bootstrap } = useNuxtApp();
    const carouselElement = document.getElementById("slider") as HTMLDivElement;
    carouselController.value = new $bootstrap.Carousel(carouselElement, {
        interval: 2000,
        touch: false
    });
    carouselController.value.cycle();
    refreshNuxtData("homeData");
    isHydrated.value = true;
});

onUnmounted(() => {
    carouselController.value?.dispose();
});

// Computed.
const serviceItems = computed<CatalogItemBasicModel[]>(() => {
    return model.value?.catalogItems
        .filter(item => item.type === CatalogItemType.Service) ?? [];
})

const courseItems = computed<CatalogItemBasicModel[]>(() => {
    return model.value?.catalogItems
        .filter(item => item.type === CatalogItemType.Course) ?? [];
})

const productItems = computed<CatalogItemBasicModel[]>(() => {
    return model.value?.catalogItems
        .filter(item => item.type === CatalogItemType.Product) ?? [];
})
</script>

<template>
    <div class="container-fluid p-0" v-if="model">
        <!-- SliderItemList -->
        <FrontPagesHomeSliderItemList :model="model.sliderItems" />

        <!-- ApplicationName -->
        <FrontPagesHomeApplicationName :model="model.generalSettings.applicationName" />

        <!-- SummaryItemList -->
        <FrontPagesHomeSummaryItemList :model="model.summaryItems" />

        <!-- AboutUsIntroduction -->
        <FrontPagesHomeAboutUsIntroduction :model="model.aboutUsIntroduction" />

        <!-- CatalogItemList - Services -->
        <FrontPagesHomeCatalogItemList :model="serviceItems" />

        <!-- CatalogItemList - Courses -->
        <FrontPagesHomeCatalogItemList :model="courseItems" />

        <!-- CatalogItemList - Products -->
        <FrontPagesHomeCatalogItemList :model="productItems" />

        <!-- EnquiryForm -->
        <FrontPagesLayoutsEnquiryForm />
    </div>
</template>