<template>
  <div class="mb-12">
    <TKCarousel image-class="rounded-t-[20px]" :data="imagesForCarousel('s').value" />
    <OurBoxesCards
    :data="sBoxData"
    :selected-box="boxSelected.s"
    @update-item-on-parent="((payload: any) => updateBoxSelected('s', payload))"
    />
  </div>
  <div class="mb-12">
    <TKCarousel image-class="rounded-t-[20px]" :data="imagesForCarousel('m').value" />
    <OurBoxesCards 
    :data="mBoxData" 
    :selected-box="boxSelected.m"
    @update-item-on-parent="((payload: any) => updateBoxSelected('m', payload))"
      />
    </div>
    <div class="mb-12">
    <TKCarousel image-class="rounded-t-[20px]" :data="imagesForCarousel('xl').value" />
    <OurBoxesCards 
    :data="xlBoxData" 
    :selected-box="boxSelected.xl"
    @update-item-on-parent="((payload: any) => updateBoxSelected('xl', payload))"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type Size = ('s' | 'm' | 'xl');

const updateBoxSelected = (size: Size, payload: BoxSelectedType) => {
  console.log(size, payload)
  Object.assign(boxSelected[size], payload);
};

const imagesForCarousel = (size: Size) => computed(() => {
  return boxImages[size][boxSelected[size].content as keyof BoxImages[Size]]
});


const boxSelected = reactive({
  s: {
    content: "mixed",
    frequency: "weekly",
    units: 1,
  },
  m: {
    content: "mixed",
    frequency: "weekly",
    units: 1,
  },
  xl: {
    content: "mixed",
    frequency: "weekly",
    units: 1,
  },
});

export interface BoxSelectedType {
  content: string;
  frequency: string;
  units: number;
}

export interface BoxImages {
  s: {
    mixed: [{image: string}],
    fruits: [{image: string}],
    vegetables: [{image: string}],
  },
  m: {
    mixed: [{image: string}],
    fruits: [{image: string}],
    vegetables: [{image: string}],
  },
  xl: {
    mixed: [{image: string}],
    fruits: [{image: string}],
    vegetables: [{image: string}],
  },
}

const boxImages = {
  s: {
    mixed: [
      {
        image: "/images/boxes/sBox/S_1.webp",
      },

      {
        image: "/images/boxes/sBox/S_2.webp",
      },
      {
        image: "/images/boxes/sBox/S_3.webp",
      },
    ],
    fruits: [
      {
        image: "/images/boxes/sBox/SFR_1.webp",
      },

      {
        image: "/images/boxes/sBox/SFR_2.webp",
      },
      {
        image: "/images/boxes/sBox/SFR_3.webp",
      },
    ],
    vegetables: [
      {
        image: "/images/boxes/sBox/SVG_1.webp",
      },

      {
        image: "/images/boxes/sBox/SVG_2.webp",
      },
      {
        image: "/images/boxes/sBox/SVG_3.webp",
      },
    ],
  },
  m: {
    mixed: [
      {
        image: "/images/boxes/sBox/S_1.webp",
      },

      {
        image: "/images/boxes/sBox/S_2.webp",
      },
      {
        image: "/images/boxes/sBox/S_3.webp",
      },
    ],
    fruits: [
      {
        image: "/images/boxes/sBox/SFR_1.webp",
      },

      {
        image: "/images/boxes/sBox/SFR_2.webp",
      },
      {
        image: "/images/boxes/sBox/SFR_3.webp",
      },
    ],
    vegetables: [
      {
        image: "/images/boxes/sBox/SVG_1.webp",
      },

      {
        image: "/images/boxes/sBox/SVG_2.webp",
      },
      {
        image: "/images/boxes/sBox/SVG_3.webp",
      },
    ],
  },
  xl: {
    mixed: [
      {
        image: "/images/boxes/sBox/S_1.webp",
      },

      {
        image: "/images/boxes/sBox/S_2.webp",
      },
      {
        image: "/images/boxes/sBox/S_3.webp",
      },
    ],
    fruits: [
      {
        image: "/images/boxes/sBox/SFR_1.webp",
      },

      {
        image: "/images/boxes/sBox/SFR_2.webp",
      },
      {
        image: "/images/boxes/sBox/SFR_3.webp",
      },
    ],
    vegetables: [
      {
        image: "/images/boxes/sBox/SVG_1.webp",
      },

      {
        image: "/images/boxes/sBox/SVG_2.webp",
      },
      {
        image: "/images/boxes/sBox/SVG_3.webp",
      },
    ],
  },
};

const sBoxData = {
  title: t("content.home.ourBoxes.item0.title"),
  description: t("content.home.ourBoxes.item0.description"),
  price: "19.18€",
};

const mBoxData = {
  title: t("content.home.ourBoxes.item1.title"),
  description: t("content.home.ourBoxes.item1.description"),
  price: "23.99€",
};

const xlBoxData = {
  title: t("content.home.ourBoxes.item2.title"),
  description: t("content.home.ourBoxes.item2.description"),
  price: "30.72€",
};

//TODO Separate carousel slide object types
</script>
