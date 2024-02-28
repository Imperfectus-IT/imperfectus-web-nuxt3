<script setup lang="ts">
/* global hbspt */
import { computed, onMounted } from "vue";

import { useI18n } from "vue-i18n";
const { locale } = useI18n();

type FormIdMapType = {
  [key: string]: {
    ca: string;
    es: string;
  };
};

const props = defineProps({
  form: {
    type: String,
    default: "b2b",
  },
});

// Define reactive data and methods
const formId = computed(() => {
  const formIdMap: FormIdMapType = {
    b2b: {
      ca: "4333cea7-a6f2-4071-a84f-e1f645b0f581",
      es: "90089aa4-5216-418c-82fa-28b4460e417b",
    },
    b2c: {
      ca: "e22ed5e0-672d-4c7b-84b7-42791c0b8d2f",
      es: "0ba31b35-3282-4071-9baf-9b086f1c0ea2",
    },
    weCallYou: {
      es: "f98c7469-fd96-44a1-ae61-3c1fe10acda4",
      ca: "725a5b1a-cca6-4378-8c07-7aa19370526f",
    },
  };

  const id = formIdMap[props.form][locale.value];
  if (!id) {
    throw new Error(
      `Form ID not found for form ${props.form} and locale ${locale}`,
    );
  }

  return id;
});

onMounted(() => {
  // Create a function to handle form creation
  const createHubSpotForm = () => {
    if (typeof hbspt !== "undefined") {
      hbspt.forms.create({
        region: "eu1",
        portalId: "25251467",
        formId: formId.value,
        target: "#HubSpotForm",
      });
    } else {
      // HubSpot script not loaded yet, retry after a delay
      setTimeout(createHubSpotForm, 100);
    }
  };

  // Load the HubSpot form script dynamically
  const script = document.createElement("script");
  script.setAttribute("charset", "utf-8");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", "//js-eu1.hsforms.net/forms/embed/v2.js");
  document.head.appendChild(script);

  script.onload = createHubSpotForm;
});
</script>

<template>
  <div id="HubSpotForm" class="bg-green-quaternary" />
</template>

<style lang="scss" scoped>
#HubSpotForm {
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
