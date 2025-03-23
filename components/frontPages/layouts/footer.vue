<script lang="ts">
type Model = {
    contacts: ContactDetailModel[];
    generalSettings: GeneralSettingsDetailModel;
}

async function fetchAsync(): Promise<Model> {
    const [contactResponseDtos, generalSettingsResponseDto] = await Promise.all([
        getContactListAsync(),
        getGeneralSettingsAsync()
    ]);

    return {
        contacts: contactResponseDtos.map(dto => createContactDetailModel(dto)),
        generalSettings: createGeneralSettingsDetailModel(generalSettingsResponseDto)
    }
}
</script>

<script setup lang="ts">
import * as routeUtils from "@/utils/routeUtils.js";
import { ContactType } from "@/enums/contactType";

// States.
const { data: model } = await useAsyncData("footerData", fetchAsync);

// Hooks.
onUnmounted(() => {
    clearNuxtData("footerData");
});

// Computed.
const footerLogoUrl = "/images/main-logo-transparent-white.png";

// Functions.
function computeGoogleMapUrl(contact: ContactDetailModel): string {
    return `https://maps.google.com/?q=${contact.encodedContent}`;
}
</script>

<template>
    <footer class="container-fluid bg-dark">
        <div class="container text-white">
            <div class="row gx-4 gy-5 justify-content-center align-items-stretch px-3 py-5 pb-4">
                <!-- Links - Left/Top column -->
                <div class="col col-xl-2 col-lg-3 col-sm-6 col-12 links-column">
                    <span class="fw-bold fs-4 opacity-75">
                        Công ty
                    </span>

                    <!-- SummaryItems -->
                    <NuxtLink :href="routeUtils.getSummaryItemsRoutePath()">
                        Giới thiệu
                    </NuxtLink>

                    <!-- AboutUs -->
                    <NuxtLink :href="routeUtils.getAboutUsIntroductionRoutePath()">
                        Về chúng tôi
                    </NuxtLink>

                    <!-- News -->
                    <NuxtLink href="#">
                        Tin tức
                    </NuxtLink>

                    <!-- Contacts -->
                    <NuxtLink :href="routeUtils.getContactsRoutePath()">
                        Liên hệ
                    </NuxtLink>
                </div>

                <!-- Links - Right/Bottom column -->
                <div class="col col-xl-2 col-lg-3 col-sm-6 col-12 links-column">
                    <span class="fw-bold fs-4 opacity-75">
                        Lĩnh vực
                    </span>

                    <!-- Services -->
                    <NuxtLink :href="routeUtils.getServiceListRoutePath()">
                        Dịch vụ
                    </NuxtLink>

                    <!-- Courses -->
                    <NuxtLink :href="routeUtils.getCourseListRoutePath()">
                        Khóa học
                    </NuxtLink>
                </div>

                <!-- Contacts -->
                <div class="col col-xl-5 col-lg-6 col-12">
                    <template v-if="model">
                        <span class="fw-bold fs-4 opacity-75">
                            Liên hệ
                        </span>

                        <div class="my-3" v-for="contact in model.contacts">
                            <!-- Label -->
                            <i class="bi me-2" :class="contact.iconClassName"></i>

                            <!-- Content -->
                            <template v-if="contact.type === ContactType.PhoneNumber">
                                <a :href="`tel:${contact.content}`">
                                    {{ contact.content }}
                                </a>
                            </template>

                            <template v-else-if="contact.type === ContactType.ZaloNumber">
                                <a
                                    :href="`https://zalo.me/${contact.content}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {{ contact.content }}
                                </a>
                            </template>

                            <template v-else-if="contact.type === ContactType.Email">
                                <a :href="`mailto:${contact.content}`">
                                    {{ contact.content }}
                                </a>
                            </template>

                            <template v-else>
                                <a
                                    :href="computeGoogleMapUrl(contact)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {{ contact.content }}
                                </a>
                            </template>
                        </div>
                    </template>
                </div>

                <!-- Logo -->
                <div class="col d-flex flex-column justify-content-center align-items-center">
                    <template v-if="model">
                        <div
                            class="border border-4 rounded-circle d-flex justify-content-center
                                    align-items-center logo-container"
                        >
                            <img
                                :src="footerLogoUrl"
                                :alt="model.generalSettings.applicationName"
                            >
                        </div>

                        <div class="fw-bold fs-5 text-center mt-3">
                            {{ model.generalSettings.applicationName }}
                        </div>
                    </template>
                </div>

                <!-- Copyright -->
                <div class="col col-12 text-center">
                    Bản quyền ©2025&nbsp;
                    <a
                        href="https://facebook.com/huy.nino.97"
                        class="fw-bold"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ngô Khánh Huy
                    </a>.
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
a {
    color: white !important;
}

a:not(:hover) {
    text-decoration: none;
}

.links-column a {
    margin-top: .75rem;
    margin-bottom: .75rem;
    display: block;
}

.logo-container {
    width: 150px;
    height: auto;
    aspect-ratio: 1;
}

.logo-container img {
    width: 65%;
}
</style>