<script lang="ts">
import type { Carousel } from "bootstrap";

type SliderItemList = {
    model: SliderItemDetailModel[]
}
</script>

<script setup lang="ts">
// Props.
defineProps<SliderItemList>();

// States.
const carousel = ref<Carousel>();
const carouselElement = ref<HTMLDivElement>();
const carouselIndex = ref<number>(0);

// Hooks.
onMounted(() => {
    const { $bootstrap } = useNuxtApp();
    carouselElement.value?.addEventListener("slide.bs.carousel", onCarouselSlide);
    if (carouselElement.value) {
        carousel.value = new $bootstrap.Carousel(carouselElement.value, {
            interval: 2000,
            touch: false
        });
        carousel.value.cycle();
    }
});

onUnmounted(() => {
    carousel.value?.dispose();
    carouselElement.value?.removeEventListener("slide.bs.carousel", onCarouselSlide);
});

// Functions.
function onCarouselSlide(event: Event): void {
    carouselIndex.value = (event as Event & { from: number; to: number }).to;
}
</script>

<template>
    <div class="overflow-hidden position-relative bg-success">
        <Transition name="fade">
            <div
                class="blurred-background-img"
                :style="`background-image: url(${model[carouselIndex].thumbnailUrl})`"
                :key="carouselIndex"
            />
        </Transition>

        <div class="carousel-container">
            <div id="slider" class="carousel slide m-0" ref="carouselElement">
                <!-- Photos -->
                <div class="carousel-inner">
                    <div
                        v-for="(item, index) in model" :key="index"
                        class="carousel-item"
                        :class="{ active: index === 0 }"
                    >
                        <img
                            :src="item.thumbnailUrl"
                            class="carousel-img d-block w-100"
                            alt="..."
                        />
                    </div>
                </div>

                <!-- Indicator buttons -->
                <div class="carousel-indicators">
                    <template v-for="(_, index) in model" :key="index">
                        <button
                            type="button"
                            data-bs-target="#slider"
                            :data-bs-slide-to="index"
                            :class="{ active: index === 0 }"
                            :aria-current="index === 0"
                            :aria-label="`Slide ${index}`">
                        </button>
                    </template>
                </div>

                <!-- Previous/next photo control buttons -->
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#slider"
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#slider"
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.blurred-background-img {
    --blur-size: 20px;
    background-size: contain;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(var(--blur-size));
    width: calc(100% + var(--blur-size) * 3);
    height: calc(100% + var(--blur-size) * 3);
    transition: .5s ease;
}

.blurred-background-img:after {
    content: "";
    background: rgba(var(--bs-success-rgb), 0.75);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.carousel-container {
    width: 100%;
    max-width: 1400px;
    margin: auto;
}

.carousel {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.carousel-img {
    object-fit: cover;
}

.carousel-item {
    transition-duration: .5s;
}
</style>