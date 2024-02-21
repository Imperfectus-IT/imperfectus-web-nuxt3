<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TalkualLogoDark from "assets/images/svg/talkual-logo-dark.svg";
</script>

<template>
    <section>
        <TopToolbar class="h-[62px] lg:h-[31px] pb-1 content-end lg:content-center"/>
        <div class="flex justify-between my-8 px-16">
            <NuxtLink class="invisible lg:visible text-[1.125rem] font-medium leading-5" to="/">
                <span class="uppercase">{{ $t("layout.navbar.menu") }}</span>
            </NuxtLink>
            <NuxtLink class="mr-20 lg:ml-36" to="/">
                <TalkualLogoDark class="w-auto h-10" :font-controlled="false"/>
            </NuxtLink>
            <div class="invisible lg:visible flex items-center justify-center gap-x-2">
                <NuxtLink to="/">
                    <span class="uppercase">{{ $t("navbarAdmin.myAccount") }}</span>
                </NuxtLink>
                <span>|</span>
                <span class="mdi mdi-shopping cursor-pointer text-lg"></span>
            </div>
        </div>
        <div class="container mx-auto">
            <slot/>
        </div>
        <FooterDefault />
    </section>
</template>

<style scoped lang="scss"></style>

