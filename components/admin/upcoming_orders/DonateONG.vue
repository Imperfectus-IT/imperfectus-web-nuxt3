<template>
  <div class="text-[16px] leading-6 mt-5">
    <p class="font-bold">
      {{ $t(`${fragmentName}.title`) }}
    </p>
    <p class="font-bold">
      {{ $t(`${fragmentName}.title`) }}
    </p>
    <p>{{ $t(`${fragmentName}.description`) }}</p>
  </div>

  <Panel
    v-for="(ong, index) in ONGsData"
    :key="index"
    :class="['mt-4 cursor-pointer lg:flex lg:flex-row lg:jus lg:w-3/4', getBackgroundColor(ong.name)]"
    :pt="!isMobile ? { content: 'flex flex-row' } : {} "
    @click="selectONG(ong)"
  >
    <div class="flex flex-row items-center lg:block mt-3">
      <NuxtImg
        :class="`w-[100px] h-[90px]`"
        :src="`images/admin/upcoming-orders/ong-logos/${ong.image}`"
      />
      <div
        v-if="isMobile"
        class="w-1/2"
      >
        <p class="text-[18px] pl-4 font-bold leading-8">
          {{ $t(`${ong.fragment}.title`) }}
        </p>
      </div>
    </div>

    <div class="text-[14px] mt-3 lg:w-3/4 lg:text-[16px] lg:mx-auto">
      <p
        v-if="!isMobile"
        class="text-[18px] font-bold leading-8"
      >
        {{ $t(`${ong.fragment}.title`) }}
      </p>
      <p>{{ $t(`${ong.fragment}.description`) }}</p>
      <div
        v-if="isCollapsed[index]"
        class="flex flex-row justify-center mt-3 w-1/2 mx-auto cursor-pointer lg:mb-3"
        @click="toggleIsCollapsed(index)"
      >
        <Button
          :label="'Más info'"
          :pt="{ root: 'underline cursor-default' }"
        />
        <span class="mdi mdi-chevron-down text-[30px] ml-3" />
      </div>

      <div v-else>
        <p class="font-bold mt-3 mb-2">
          {{ $t(`${ong.fragment}.description_title`) }}
        </p>
        <span
          v-for="(text, index) in ong.description_sections"
          :key="index"
          :class="text.includes('bold') ? 'font-bold' : ''"
        >
          {{ $t(`${ong.fragment}.${text}`) }}
        </span>
        <div class="overflow-hidden">
          <NuxtLink :to="$t(`${ong.fragment}.${ong.link}`)">
            <span class="underline">{{
              $t(`${ong.fragment}.${ong.link}`)
            }}</span>
          </NuxtLink>
        </div>
        <div
          v-if="!isCollapsed[index]"
          class="flex flex-row justify-center mt-3"
        >
          <span
            class="mdi mdi-chevron-up text-[30px] cursor-pointer"
            @click="toggleIsCollapsed(index)"
          />
        </div>
      </div>
    </div>
  </Panel>
  <div class="mt-4 flex flex-row gap-2">
    <Button
      v-if="selectedONG"
      class="h-7 px-6"
      :label="$t(`${fragmentName}.donate_button`)"
      @click="donateToONG"
    />
    <Button
      class="h-7 px-6"
      outlined
      :label="$t(`${fragmentName}.cancel_button`)"
      @click="closeForm"
    />
  </div>
</template>

<script setup lang="ts">
const { isMobile } = useScreenSize()

const selectedONG = ref<ONG>()
const selectONG = (ongData: ONG) => {
  selectedONG.value = ONGsData.find((ong: ONG) => ongData.name === ong.name)
}

const getBackgroundColor = (name: string) => {
  if (selectedONG.value) {
    return selectedONG.value.name === name ? 'bg-green-quaternary' : ''
  }
}

const isCollapsed = ref<Record<string, boolean>>({})
const emit = defineEmits(['close-form', 'donate-to-ong'])
const closeForm = () => emit('close-form')
const donateToONG = () => emit('donate-to-ong', selectedONG.value)

const toggleIsCollapsed = (index: number) => {
  if (index in isCollapsed.value) {
    isCollapsed.value[index] = !isCollapsed.value[index]
  }
  else {
    isCollapsed.value[index] = true
  }
}

const createHandleDisplayObject = () => {
  ONGsData.forEach((_, index) => {
    isCollapsed.value[index] = true
  })
}

onMounted(() => {
  createHandleDisplayObject()
})

export type ONG = {
  name: string
  fragment: string
  description_sections: string[]
  image: string
  link: string
  firstname: string
  lastname: string
  email: string
  address1: string
  address2: string
  city: string
  state: string
  country: string
  postcode: string
  phone: string
}

const fragmentName = 'upcoming_orders.donate_to_ong'
const ONGsData: ONG[] = [
  {
    name: 'Arrels',
    fragment: `${fragmentName}.ong_1`,
    description_sections: [
      'description_1',
      'description_2_bold',
      'description_3',
      'description_4_bold',
      'description_5',
      'description_6',
    ],
    image: 'arrels.webp',
    link: 'description_link',
    firstname: 'Arrels Sant Ignasi',
    lastname: '',
    email: 'aliments@arrelssantignasi.cat',
    address1: 'Carrer del Bruc, 2 bajos',
    address2: '',
    city: 'Lleida',
    state: 'Lleida',
    country: 'ES',
    postcode: '25001',
    phone: '+34973289000',
  },
  {
    name: 'Segundas Oportunidades',
    fragment: `${fragmentName}.ong_2`,
    description_sections: ['description_1', 'description_2'],
    image: 'segundas_oportunidades.webp',
    link: 'description_link',
    firstname: 'Rosmar',
    lastname: 'Colmenter Fernández',
    email: 'somosdesegundasoportunidades@gmail.com',
    address1: 'Calle de La Rioja 7, escalera D, 6f',
    address2: 'Barrio Alameda de Osuna',
    city: 'Madrid',
    state: 'Madrid',
    country: 'ES',
    postcode: '28042',
    phone: '+34635096588',
  },
  {
    name: 'Mona',
    fragment: `${fragmentName}.ong_3`,
    description_sections: ['description_1'],
    image: 'mona.webp',
    link: 'description_link',
    firstname: 'Cristina',
    lastname: 'Valsera',
    email: 'c.valsera@fundacionmona.org',
    address1: 'Carretera de Riudellots a Cassà, km1',
    address2: '',
    city: 'Riudellots de la Selva',
    state: 'Girona',
    country: 'ES',
    postcode: '17457',
    phone: '972477618',
  },
]
</script>
