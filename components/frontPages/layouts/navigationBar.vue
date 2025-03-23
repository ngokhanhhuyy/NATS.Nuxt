<script setup lang="ts">
import * as routeUtils from "~/utils/routeUtils";

// Child components.
import Link from "./navigationBarLink.vue";

// Image urls.
const mainLogoUrl = "/images/main-logo-transparent-white-without-text.png";

</script>

<template>
    <nav class="navbar navbar-expand-xl fixed-top shadow fs-5" data-bs-theme="light">
        <div class="container">
            <!-- Main logo -->
            <NuxtLink
                :href="routeUtils.getHomeRoutePath()"
                class="navbar-brand d-flex align-items-center">
                <img :src="mainLogoUrl" class="me-2 flex-shrink-0 main-logo" alt="Main logo" />
                <span class="fs-2 application-short-name">NATS</span>
            </NuxtLink>
            <button
                class="navbar-toggler fs-3 me-2 py-2 navbar-toggler-button"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#navbar-content"
                aria-controls="navbar-content"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i class="bi bi-list"></i>
            </button>
            <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="navbar-content"
                aria-labelledby="offcanvasNavbarLabel"
            >
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Điều hướng</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close">
                    </button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100">
                        <!-- Home -->
                        <li class="nav-item">
                            <Link :path="routeUtils.getHomeRoutePath()">
                                Trang chủ
                            </Link>
                        </li>

                        <!-- SummaryItem -->
                        <li class="nav-item">
                            <Link :path="routeUtils.getSummaryItemsRoutePath()">
                                Giới thiệu
                            </Link>
                        </li>

                        <!-- AboutUsIntroduction -->
                        <li class="nav-item">
                            <Link :path="routeUtils.getAboutUsIntroductionRoutePath()">
                                Về chúng tôi
                            </Link>
                        </li>

                        <!-- CatalogItem - Services -->
                        <li class="nav-item">
                            <Link :path="routeUtils.getServiceListRoutePath()">
                                Dịch vụ
                            </Link>
                        </li>

                        <!-- CatalogItem - Course -->
                        <li class="nav-item">
                            <Link :path="routeUtils.getCourseListRoutePath()">
                                Khoá học
                            </Link>
                        </li>

                        <!-- CatalogItem - Product -->
                        <li class="nav-item">
                            <Link :path="routeUtils.getProductListRoutePath()">
                                Sản phẩm
                            </Link>
                        </li>

                        <!-- Enquiry -->
                        <li class="nav-item">
                            <Link :path="routeUtils.getContactsRoutePath()">
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    --navbar-background-color: var(--bs-white);
    --navbar-foreground-color: var(--bs-success);
    --navbar-logo-img-filter:
        brightness(0)
        saturate(100%)
        invert(39%)
        sepia(90%)
        saturate(393%)
        hue-rotate(100deg)
        brightness(88%)
        contrast(89%);
    --navbar-transition-duration: 0.3s;
    background: var(--navbar-background-color);
    height: var(--navbar-height);
    transition: background-color var(--navbar-transition-duration) ease;
}

.main-logo {
    width: auto;
    height: calc(var(--navbar-height) - 12px);
    padding: 5px;
    filter: var(--navbar-logo-img-filter);
    transition: filter var(--navbar-transition-duration) ease;
}

.application-short-name {
    font-family: Arial,sans-serif;
    color: var(--navbar-foreground-color);
    transform: scaleX(110%);
    transform-origin: 0 0;
    transition: color var(--navbar-transition-duration) ease;
}

.navbar-toggler-button {
    color: var(--navbar-foreground-color) !important;
    border-color: var(--navbar-foreground-color) !important;
    transition: var(--navbar-transition-duration) ease !important;
}

.navbar-toggler-button:hover {
    background-color: var(--navbar-foreground-color) !important;
    color: var(--navbar-background-color) !important;
}

.navbar-nav {
    --bs-nav-link-color: var(--navbar-foreground-color) !important;
    --bs-nav-link-hover-color: var(--navbar-foreground-color) !important;
    --bs-navbar-active-color: var(--navbar-foreground-color) !important;
}


@media (max-width: 1200px) {
    .navbar {
        height: auto !important;
    }
}

@media (max-width: 992px) {
    .navbar .offcanvas {
        max-width: 300px;
    }
}
</style>