<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const itemLinks = [
  {
    id: useId(),
    label: t("string.misc.talkual"),
    path: "#",
    childrens: [
      {
        id: useId(),
        label: t("footerLinks.boxes"),
        path: "boxes",
      },
      {
        id: useId(),
        label: t("footerLinks.deliver"),
        path: "boxes",
      },
      {
        id: useId(),
        label: t("footerLinks.companies"),
        path: "companies",
      },
      {
        id: useId(),
        label: t("footerLinks.offices"),
        path: "companies",
      },
      {
        id: useId(),
        label: t("footerLinks.benefits"),
        path: "https://blog.talkualfoods.com/tag/beneficios-y-propiedades",
      },
      {
        id: useId(),
        label: t("layout.navbar.blog.title"),
        path: t("layout.navbar.blog.url"),
      },
      {
        id: useId(),
        label: t("layout.navbar.faqs.title"),
        path: t("layout.navbar.faqs.url"),
      },
    ],
  },
  {
    id: useId(),
    label: t("footerLinks.mission"),
    path: "#",
    childrens: [
      {
        id: useId(),
        label: t("layout.navbar.history"),
        path: localePath("about"),
      },
      {
        id: useId(),
        label: t("layout.navbar.farmers"),
        path: localePath("farmers"),
      },
      {
        id: useId(),
        label: t("layout.navbar.team"),
        path: localePath("team"),
      },
      {
        id: useId(),
        label: t("pages.mission.title"),
        path: localePath("food-waste"),
      },
      {
        id: useId(),
        label: t("layout.navbar.commitment"),
        path: localePath("commitment"),
      },
      {
        id: useId(),
        label: t("layout.navbar.impact"),
        path: localePath("impact"),
      },
      {
        id: useId(),
        label: t("layout.navbar.referrals"),
        path: localePath("referafriend"),
      },
      {
        id: useId(),
        label: t("layout.navbar.giftcards"),
        path: localePath("gift-card-gift-card-create"),
      },
    ],
  },
  {
    id: useId(),
    label: t("footerLegal.title"),
    path: "#",
    childrens: [
      {
        id: useId(),
        label: t("pages.legal.conditions.title"),
        path: "legal-conditions",
      },
      {
        id: useId(),
        label: t("pages.legal.privacy.title"),
        path: localePath("legal-privacy"),
      },
      {
        id: useId(),
        label: t("pages.legal.cookies.title"),
        path: localePath("legal-cookies"),
      },
      {
        id: useId(),
        label: t("pages.legal.notice.title"),
        path: localePath("legal-notice"),
      },
    ],
  },
];
</script>
<template>
  <FooterLinkList
    v-for="item in itemLinks"
    :key="item.id"
    :item="item"
    class="mb-5"
  />
</template>
