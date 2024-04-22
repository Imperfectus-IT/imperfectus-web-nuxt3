<template>
  <Header
    class="text-green-tertiary my-12 !h-[205px] lg:!h-[180px] lg:mb-0 lg:relative lg:-top-10 bg-green-primary"
    :title="t('pages.legal.conditions.title')"
    title-class="!text-green-tertiary !text-[48px] font-bold"
    background-color="green-primary"
  />

  <div class="w-11/12 mx-auto flex flex-col space-y-2 xl: max-w-[1300px]">
    <h4 class="font-bold mb-4">{{ t("pages.legal.terms.title") }}</h4>

    <div v-for="(text, index) in terms.introduction" :key="index">
      <div v-if="Array.isArray(text)">
        <span
          v-for="(item, itemIndex) in text"
          :key="`item-${itemIndex}`"
          :class="item.includes('bold') ? 'font-bold' : ''"
        >
          {{ t(item) }}&nbsp;
        </span>
      </div>
      <p v-else :class="text.includes('bold') ? 'font-bold' : ''">
        {{ t(text) }}
      </p>
    </div>

    <h4 class="text-[28px] !mt-8 !mb-2">{{ t("pages.legal.terms.title1") }}</h4>

    <div v-for="(text, index) in terms.firstSection.main" :key="index">
      <div v-if="Array.isArray(text)">
        <span
          v-for="(item, itemIndex) in text"
          :key="`item-${itemIndex}`"
          :class="
            (typeof item === 'object' && item.label.includes('bold')) ||
            (typeof item === 'string' && item.includes('bold'))
              ? 'font-bold'
              : typeof item === 'object' && item.label.includes('link')
                ? 'text-blue-primary'
                : ''
          "
        >
          <NuxtLink v-if="typeof item === 'object'" :to="item.link"
            >{{ t(item.label) }}&nbsp;</NuxtLink
          >
          <span v-else>{{ t(item) }}&nbsp;</span>
        </span>
      </div>

      <p v-else>
        {{ t(text) }}
      </p>
    </div>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle1.1") }}
    </h4>
    <p v-for="(text, index) in terms.firstSection.subSection1" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle1.2") }}
    </h4>
    <p v-for="(text, index) in terms.firstSection.subSection2" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="text-[28px] !mt-8 !mb-2 whitespace-normal">
      {{ t("pages.legal.terms.title2") }}
    </h4>
    <h4 class="font-bold !mb-2">
      {{ t("pages.legal.terms.subtitle2.1") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection1" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.2") }}
    </h4>
    <div v-for="(text, index) in terms.secondSection.subSection2" :key="index">
      <p v-if="text.includes('mailto')">
        Email:
        <a
          class="text-blue-primary"
          href="mailto:info@talkualfoods.com"
          target="_blank"
          rel="noopener"
        >
          {{ t(text) }}</a
        >.&nbsp;
      </p>
      <p v-else>{{ t(text) }}</p>
    </div>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.3") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection3" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.list.title1") }}
    </h4>
    <ul>
      <ListItem
        v-for="(item, index) in terms.secondSection.itemsList1"
        :key="index"
        :main-class="'flex gap-x-4'"
        :text="t(item)"
        dot-class="text-[10px] mt-1"
      />
    </ul>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.list.title2") }}
    </h4>
    <ul>
      <ListItem
        v-for="(item, index) in terms.secondSection.itemsList2"
        :key="index"
        :main-class="'flex gap-x-4'"
        :text="t(item)"
        dot-class="text-[10px] mt-1"
      />
    </ul>
    <h4 class="font-bold !mt-8 !mb-">
      {{ t("pages.legal.terms.list.title3") }}
    </h4>
    <ul class="!mb-4">
      <ListItem
        v-for="(item, index) in terms.secondSection.itemsList3"
        :key="index"
        :main-class="'flex gap-x-4'"
        :text="t(item)"
        dot-class="text-[10px] mt-1"
      />
    </ul>

    <p
      v-for="(text, index) in terms.secondSection.subSection3continue"
      :key="index"
    >
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2 whitespace-normal">
      {{ t("pages.legal.terms.subtitle2.4") }}
    </h4>
    <div v-for="(text, index) in terms.secondSection.subSection4" :key="index">
      <div v-if="Array.isArray(text)">
        <span
          v-for="(item, itemIndex) in text"
          :key="`item-${itemIndex}`"
          :class="
            (typeof item === 'object' && item.label.includes('bold')) ||
            (typeof item === 'string' && item.includes('bold'))
              ? 'font-bold'
              : typeof item === 'object' && item.label.includes('link')
                ? 'text-blue-primary'
                : ''
          "
        >
          <NuxtLink v-if="typeof item === 'object'" :to="item.link"
            >{{ t(item.label) }}&nbsp;</NuxtLink
          >
          <span v-else>{{ t(item) }}&nbsp;</span>
        </span>
      </div>

      <p v-else>
        {{ t(text) }}
      </p>
    </div>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.5") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection5" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.6") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection6" :key="index">
      {{ t(text) }}
    </p>

    <ul>
      <ListItem
        v-for="(item, index) in terms.secondSection.itemsList4"
        :key="index"
        :main-class="'flex gap-x-4'"
        :text="t(item)"
        dot-class="text-[10px] mt-1"
      />
    </ul>

    <p
      v-for="(text, index) in terms.secondSection.subSection6continue"
      :key="index"
    >
      {{ t(text) }}
    </p>

    <ul>
      <ListItem
        v-for="(item, index) in terms.secondSection.itemsList5"
        :key="index"
        :main-class="'flex gap-x-4'"
        :text="t(item)"
        dot-class="text-[10px] mt-1"
      />
    </ul>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.7") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection7" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.8") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection8" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.9") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection9" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.10") }}
    </h4>
    <div v-for="(text, index) in terms.secondSection.subSection10" :key="index">
      <span v-if="!Array.isArray(text)">
        {{ t(text) }}
      </span>
      <div v-else>
        <span
          v-for="(item, itemIndex) in text"
          :key="itemIndex"
          :class="item.includes('mailto') ? 'text-blue-primary' : ''"
        >
          <a
            v-if="item.includes('mailto')"
            class="text-blue-primary"
            href="mailto:info@talkualfoods.com"
            target="_blank"
            rel="noopener"
          >
            {{ t(item) }} </a
          >&nbsp;
          <span v-else>{{ t(item) }}&nbsp;</span>
        </span>
      </div>
    </div>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.11") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection11" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.12") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection12" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.13") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection13" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.14") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection14" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.15") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection15" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.16") }}
    </h4>
    <div>
      <span
        v-for="(item, itemIndex) in terms.secondSection.subSection16"
        :key="itemIndex"
        :class="item.includes('mailto') ? 'text-blue-primary' : ''"
      >
        <a
          v-if="item.includes('mailto')"
          class="text-blue-primary"
          href="mailto:info@talkualfoods.com"
          target="_blank"
          rel="noopener"
        >
          {{ t(item) }} </a
        >&nbsp;
        <span v-else>{{ t(item) }}&nbsp;</span>
      </span>
    </div>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.17") }}
    </h4>
    <p v-for="(text, index) in terms.secondSection.subSection17" :key="index">
      {{ t(text) }}
    </p>

    <ul>
      <ListItem
        v-for="(item, index) in terms.secondSection.itemsList6"
        :key="index"
        :main-class="'flex gap-x-4'"
        :text="t(item)"
        dot-class="text-[10px] mt-1"
      />
    </ul>

    <div
      v-for="(text, index) in terms.secondSection.subSection17continue"
      :key="index"
      class="whitespace-now"
    >
      <span
        v-if="!Array.isArray(text)"
        :class="text.includes('underline') ? 'underline' : ''"
      >
        {{ t(text) }}
      </span>
      <div v-else>
        <span
          v-for="(item, itemIndex) in text"
          :key="itemIndex"
          :class="item.includes('mailto') ? 'text-blue-primary' : ''"
        >
          <a
            v-if="item.includes('mailto')"
            class="text-blue-primary"
            href="mailto:info@talkualfoods.com"
            target="_blank"
            rel="noopener"
          >
            {{ t(item) }} </a
          >&nbsp;
          <span v-else>{{ t(item) }}&nbsp;</span>
        </span>
      </div>
    </div>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.18") }}
    </h4>
    <ul>
      <ListItem
        v-for="(item, index) in terms.secondSection.subSection18"
        :key="index"
        :main-class="'flex gap-x-4'"
        :text="t(item)"
        dot-class="text-[10px] mt-1"
      />
    </ul>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.19") }}
    </h4>
    <div v-for="(text, index) in terms.secondSection.subSection19" :key="index">
      <div v-if="Array.isArray(text)">
        <span
          v-for="(item, itemIndex) in text"
          :key="`item-${itemIndex}`"
          :class="item.includes('bold') ? 'font-bold' : ''"
        >
          {{ t(item) }}&nbsp;
        </span>
      </div>
      <p v-else :class="text.includes('bold') ? 'font-bold' : ''">
        {{ t(text) }}
      </p>
    </div>

    <h4 class="font-bold !mt-8 !mb-2">
      {{ t("pages.legal.terms.subtitle2.20") }}
    </h4>
    <div v-for="(text, index) in terms.secondSection.subSection20" :key="index">
      <span v-if="!Array.isArray(text)">
        {{ t(text) }}
      </span>
      <div v-else>
        <span
          v-for="(item, itemIndex) in text"
          :key="itemIndex"
          :class="item.includes('mailto') ? 'text-blue-primary' : ''"
        >
          <a
            v-if="item.includes('mailto')"
            class="text-blue-primary"
            href="mailto:info@talkualfoods.com"
            target="_blank"
            rel="noopener"
          >
            {{ t(item) }} </a
          >&nbsp;
          <span v-else :class="item.includes('underlined') ? 'underline' : ''">{{ t(item) }}&nbsp;</span>
        </span>
      </div>
    </div>

    <h4 class="text-[28px] !mt-8 !mb-2">{{ t("pages.legal.terms.title3") }}</h4>
    <p v-for="(text, index) in terms.thirdSection" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="text-[28px] !mt-8 !mb-2 whitespace-normal">
      {{ t("pages.legal.terms.title4") }}
    </h4>
    <p v-for="(text, index) in terms.fourthSection" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="text-[28px] !mt-8 !mb-2">{{ t("pages.legal.terms.title5") }}</h4>
    <p v-for="(text, index) in terms.fifthSection" :key="index">
      {{ t(text) }}
    </p>

    <h4 class="text-[28px] !mt-8 !mb-2">{{ t("pages.legal.terms.title6") }}</h4>
    <p
      v-for="(text, index) in terms.sixthSection"
      :key="index"
      :class="
        text.includes('bold-underlined')
          ? 'underline font-bold'
          : text.includes('bold')
            ? 'font-bold'
            : ''
      "
    >
      {{ t(text) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineI18nRoute({
  paths: {
    ca: "/termes-i-condicions/",
    es: "/terminos-y-condiciones/",
  },
});

const terms = {
  introduction: [
    [
      "pages.legal.terms.description1",
      "pages.legal.terms.description1.bold1",
      "pages.legal.terms.description1continue",
      "pages.legal.terms.description1.bold2",
    ],
    "pages.legal.terms.description2",
  ],
  firstSection: {
    main: [
      [
        "pages.legal.terms.content1",
        "pages.legal.terms.content1.bold",
        "pages.legal.terms.content1continue",
      ],
      "pages.legal.terms.content2",
      "pages.legal.terms.content3",
      "pages.legal.terms.content4",
      [
        "pages.legal.terms.content5",
        { label: "pages.legal.terms.content5.link1", link: "/notice" },
        "pages.legal.terms.content5continue",
        { label: "pages.legal.terms.content5.link2", link: "/privacy" },
      ],
    ],
    subSection1: [
      "pages.legal.terms.content6",
      "pages.legal.terms.content7",
      "pages.legal.terms.content8",
    ],
    subSection2: ["pages.legal.terms.content9", "pages.legal.terms.content10"],
  },
  secondSection: {
    subSection1: [
      "pages.legal.terms.content11",
      "pages.legal.terms.content12",
      "pages.legal.terms.content13",
      "pages.legal.terms.content14",
      "pages.legal.terms.content15",
      "pages.legal.terms.content16",
    ],
    subSection2: [
      "pages.legal.terms.content17",
      "pages.legal.terms.content18",
      "pages.legal.terms.content19.mailto",
      "pages.legal.terms.content20",
      "pages.legal.terms.content21",
    ],
    subSection3: [
      "pages.legal.terms.content22",
      "pages.legal.terms.content23",
      "pages.legal.terms.content24",
    ],
    itemsList1: [
      "pages.legal.terms.list1.item1",
      "pages.legal.terms.list1.item2",
      "pages.legal.terms.list1.item3",
      "pages.legal.terms.list1.item4",
      "pages.legal.terms.list1.item5",
    ],
    itemsList2: [
      "pages.legal.terms.list2.item1",
      "pages.legal.terms.list2.item2",
      "pages.legal.terms.list2.item3",
      "pages.legal.terms.list2.item4",
      "pages.legal.terms.list2.item5",
      "pages.legal.terms.list2.item6",
      "pages.legal.terms.list2.item7",
      "pages.legal.terms.list2.item8",
    ],
    itemsList3: [
      "pages.legal.terms.list3.item1",
      "pages.legal.terms.list3.item2",
      "pages.legal.terms.list3.item3",
      "pages.legal.terms.list3.item4",
    ],
    subSection3continue: [
      "pages.legal.terms.content25",
      "pages.legal.terms.content26",
    ],
    subSection4: [
      [
        "pages.legal.terms.content27",
        { label: "pages.legal.terms.content27.link", link: "/privacy" },
      ],
      "pages.legal.terms.content28",
      "pages.legal.terms.content29",
      "pages.legal.terms.content30",
      "pages.legal.terms.content31",
      "pages.legal.terms.content32",
      "pages.legal.terms.content33",
      "pages.legal.terms.content34",
      "pages.legal.terms.content35",
      "pages.legal.terms.content36",
    ],
    subSection5: [
      "pages.legal.terms.content37",
      "pages.legal.terms.content38",
      "pages.legal.terms.content39",
    ],
    subSection6: [
      "pages.legal.terms.content40",
      "pages.legal.terms.content41",
      "pages.legal.terms.content42",
      "pages.legal.terms.content43",
      "pages.legal.terms.content44",
    ],
    itemsList4: [
      "pages.legal.terms.list4.item1",
      "pages.legal.terms.list4.item2",
    ],
    subSection6continue: [
      "pages.legal.terms.content45",
      "pages.legal.terms.content46",
    ],
    itemsList5: [
      "pages.legal.terms.list5.item1",
      "pages.legal.terms.list5.item2",
      "pages.legal.terms.list5.item3",
    ],
    subSection7: [
      "pages.legal.terms.content47",
      "pages.legal.terms.content48",
      "pages.legal.terms.content49",
    ],
    subSection8: [
      "pages.legal.terms.content50",
      "pages.legal.terms.content51",
      "pages.legal.terms.content52",
      "pages.legal.terms.content53",
    ],
    subSection9: [
      "pages.legal.terms.content54",
      "pages.legal.terms.content55",
      "pages.legal.terms.content56",
    ],
    subSection10: [
      "pages.legal.terms.content57",
      "pages.legal.terms.content58",
      [
        "pages.legal.terms.content59",
        "pages.legal.terms.content59.mailto",
        "pages.legal.terms.content59.continue",
      ],
    ],
    subSection11: [
      "pages.legal.terms.content60",
      "pages.legal.terms.content61",
      "pages.legal.terms.content62",
      "pages.legal.terms.content63",
      "pages.legal.terms.content64",
      "pages.legal.terms.content65",
      "pages.legal.terms.content66",
      "pages.legal.terms.content67",
    ],
    subSection12: ["pages.legal.terms.content68"],
    subSection13: [
      "pages.legal.terms.content69",
      "pages.legal.terms.content70",
      "pages.legal.terms.content71",
      "pages.legal.terms.content72",
      "pages.legal.terms.content73",
    ],
    subSection14: [
      "pages.legal.terms.content74",
      "pages.legal.terms.content75",
    ],
    subSection15: [
      "pages.legal.terms.content76",
      "pages.legal.terms.content77",
      "pages.legal.terms.content78",
    ],
    subSection16: [
      "pages.legal.terms.content79",
      "pages.legal.terms.content79.mailto",
      "pages.legal.terms.content79.continue",
    ],
    subSection17: ["pages.legal.terms.content80"],
    itemsList6: [
      "pages.legal.terms.list6.item1",
      "pages.legal.terms.list6.item2",
      "pages.legal.terms.list6.item3",
      "pages.legal.terms.list6.item4",
    ],
    subSection17continue: [
      ["pages.legal.terms.content81", "pages.legal.terms.content81.mailto"],
      "pages.legal.terms.content82.underline",
      "pages.legal.terms.content83",
      [
        "pages.legal.terms.content84",
        "pages.legal.terms.content84.mailto",
        "pages.legal.terms.content84.continue",
      ],
    ],
    subSection18: [
      "pages.legal.terms.list7.item1",
      "pages.legal.terms.list7.item2",
      "pages.legal.terms.list7.item3",
      "pages.legal.terms.list7.item4",
    ],
    subSection19: [
      [
        "pages.legal.terms.content85",
        "pages.legal.terms.content85.bold",
        "pages.legal.terms.content85.continue",
      ],
      "pages.legal.terms.content86",
      ["pages.legal.terms.content87", "pages.legal.terms.content87.bold"],
    ],
    subSection20: [
      ["pages.legal.terms.content88", "pages.legal.terms.content88.mailto"],
      "pages.legal.terms.content89",
      ["pages.legal.terms.content90.underlined", "pages.legal.terms.content90"],
      ["pages.legal.terms.content91.underlined", "pages.legal.terms.content91"],
      "pages.legal.terms.content92",
    ],
  },
  thirdSection: ["pages.legal.terms.content93"],
  fourthSection: [
    "pages.legal.terms.content94",
    "pages.legal.terms.content95",
    "pages.legal.terms.content96",
    "pages.legal.terms.content97",
  ],
  fifthSection: [
    "pages.legal.terms.content98",
    "pages.legal.terms.content99",
    "pages.legal.terms.content100",
    "pages.legal.terms.content101",
    "pages.legal.terms.content102",
  ],
  sixthSection: [
    "pages.legal.terms.content103",
    "pages.legal.terms.content104.bold-underlined",
    "pages.legal.terms.content105.bold",
    "pages.legal.terms.content106",
    "pages.legal.terms.content107",
    "pages.legal.terms.content108",
    "pages.legal.terms.content109",
    "pages.legal.terms.content110",
    "pages.legal.terms.content111",
    "pages.legal.terms.content112",
    "pages.legal.terms.content113",
    "pages.legal.terms.content114",
    "pages.legal.terms.content115",
  ],
};
</script>
