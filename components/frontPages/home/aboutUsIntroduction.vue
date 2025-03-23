<script lang="ts">
type Props = {
    model: AboutUsIntroductionDetailModel;
}
</script>

<script setup lang="ts">
defineProps<Props>();
</script>

<template>
    <div class="container-fluid bg-success text-white fs-5 my-5 shadow">
        <div class="container">
            <div class="row justify-content-center align-items-stretch">
                <div class="col col-xl-6 col-lg-8 col-12 overflow-hidden
                            d-flex align-items-center p-4">
                    <img
                        :src="model.thumbnailUrl"
                        class="w-100 rounded-3"
                        alt="Về chúng tôi"
                    />
                </div>
                <div class="col-xl col-lg-8 col p-4 pt-3 d-flex flex-column
                            justify-content-center align-items-start">
                    <div class="fs-2 mb-3">Về chúng tôi</div>
                    <p>{{ model.aboutUsContent }}</p>
                    <NuxtLink :href="model.detailRoute" class="btn btn-outline-light mt-3">
                        Tìm hiểu thêm
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>