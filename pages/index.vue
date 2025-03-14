<script lang="ts">
interface SliderItemDetailModel {
    id: number;
    url: string;
    index: number;
}
</script>

<script setup lang="ts">
import type { Carousel } from "bootstrap";

// Page meta.
definePageMeta({
    layout: "front-page",
});

// States.
const sliderItems = useState<SliderItemDetailModel[]>("sliderItems", () => {
    return Array.from(Array(10).keys()).map((_, index) => {
        const height = Math.round((Math.random() * 5 + 5) * 100);
        return {
            id: index + 1,
            url: `https://placehold.jp/1920x${height}.png`,
            index: index
        };
    });
});
const carouselController = ref<Carousel>();

// Hooks.
onMounted(() => {
    const { $bootstrap } = useNuxtApp();
    const carouselElement = document.getElementById("slider") as HTMLDivElement;
    carouselController.value = new $bootstrap.Carousel(carouselElement, {
        interval: 2000,
        touch: false
    });
    carouselController.value.cycle();
    console.log("Mounted");
});
</script>

<template>
    <div class="container-fluid">
        <!-- Slider -->
        <div id="slider" class="carousel slide">
            <div class="carousel-inner">
                <div
                    v-for="(item, index) in sliderItems" :key="item.id"
                    class="carousel-item"
                    :class="{ active: index == 1 }"
                >
                    <img
                        :src="item.url"
                        class="carousel-img d-block w-100"
                        alt="..."
                    />
                </div>
            </div>
            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#homePageSlider"
                data-bs-slide="prev"
            >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#homePageSlider"
                data-bs-slide="next"
            >
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <!-- Content -->
        <div class="container mt-3">
            <div class="row g-3">
                <div class="col col-4">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.carousel {
    height: 500px;
}

.carousel-img {
    max-height: 500px;
    object-fit: cover;
}
</style>