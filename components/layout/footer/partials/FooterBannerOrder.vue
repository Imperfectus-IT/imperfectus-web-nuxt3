<template>
  <Section class="FooterBannerOrder is-medium">
    <Container class="has-text-centered">
      <h3
        class="FooterBannerOrder__title is-size-2 title"
        v-html="$t('footer.order.title')"
      />
      <OrderButton size="is-large">
        {{ $t("footer.order.text") }}
      </OrderButton>
    </Container>
  </Section>
</template>

<script>
export default {}
</script>

<!-- <style lang="scss">
.FooterBannerOrder {
  background-image: url("/images/home/talkual-banner-alt.jpg");
  background-position: center;
  color: white;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
  }

  &__title {
    color: inherit;
  }
}
</style> -->
