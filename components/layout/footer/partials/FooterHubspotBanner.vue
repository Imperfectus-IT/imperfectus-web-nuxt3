<template>
  <div class="hubspot-banner">
    <p
      v-if="!isHubspotButtonHidden"
      :class="
        'hubspot-banner__description ' +
        (isInverse ? ' ' : ' has-text-secondary')
      "
    >
      {{ $t("hubspot.banner.description") }}
    </p>
    <button
      id="hs_show_banner_button"
      ref="hubspotButton"
      class="bg-green-quaternary text-green-tertiary font-bold px-4 rounded-lg text-[16px] my-4"
      type="button"
      onClick="(function(){
          var _hsp = window._hsp = window._hsp || [];
          _hsp.push(['showBanner']);
        })()"
    >
      {{ $t("hubspot.banner.action") }}
    </button>
  </div>
</template>

<script>
export default {
  name: "HubspotBannerButton",
  props: {
    isInverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isHubspotButtonHidden: false,
    };
  },
  mounted() {
    const button = this.$refs.hubspotButton;
    const buttonStyle = getComputedStyle(button);
    this.isHubspotButtonHidden = buttonStyle.display === "none";
  },
};
</script>
