<script setup lang="ts">
const { t } = useI18n()
const mediosItems = [
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.periodico'),
    cover: 'periodico.webp',
    altCover: 'Logo periodico',
    styles: 'p-0 h-[40px] lg:w-[210px] lg:h-[90px]',
    link: 'https://www.elperiodico.com/es/consumo/20240624/distribuidora-fruta-fea-talkual-amplia-infraestructura-103752739',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.rtve'),
    cover: 'rtve.webp',
    altCover: 'Logo RTVE',
    styles: 'p-0 w-[125px] h-[40px] lg:w-[145px] lg:h-[90px]',
    styleText: 'lg:px-0 xl:px-28 !mt-0',
    link: 'https://www.rtve.es/noticias/20230312/comer-bien-tirar-menos-viaje-productos-danados-para-evitar-desperdicio-alimentario/2431100.shtml',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.tv3'),
    cover: 'tv3.webp',
    width: 140,
    height: 97,
    altCover: 'Logo TV3',
    styles: 'px-3 lg:px-0 w-[145px] h-[90px]',
    styleText: 'lg:px-12',
    link: 'https://www.ccma.cat/3cat/90-kg-de-menjar-per-persona-a-les-escombraries/video/6185727/',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.lasexta'),
    cover: 'lasexta.webp',
    width: 90,
    height: 120,
    altCover: 'Logo LaSexta',
    styles: 'px-3 lg:px-0',
    link: 'https://www.lasexta.com/noticias/sociedad/ahorrar-comprando-fruta-fea-empresa-lleida-rescata-piezas-que-tirarian-grandes-superficies_2022110563669a68c7ecd00001bfd687.html',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.lavanguardia'),
    cover: 'lavanguardia.webp',
    width: 145,
    height: 25,
    altCover: 'Logo La Vanguardia',
    styles: 'px-3 lg:px-0 lg:mt-10',
    styleText: 'lg:px-12',
    link: 'https://www.lasexta.com/noticias/sociedad/ahorrar-comprando-fruta-fea-empresa-lleida-rescata-piezas-que-tirarian-grandes-superficies_2022110563669a68c7ecd00001bfd687.html',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.segre'),
    cover: 'segre.webp',
    width: 100,
    height: 30,
    altCover: 'Logo Segre',
    styles: 'px-3 lg:px-0 lg:mt-10',
    styleText: 'lg:px-12',
    link: 'https://www.segre.com/es/vint-dos/240421/nueva-aplicacion-talkual-despilfarro-alimentario_416850.html',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.elpuntavui'),
    cover: 'elpuntavui.webp',
    width: 145,
    height: 15,
    altCover: 'Logo elpuntavui',
    styles: 'px-3 my-10 lg:px-0',
    styleText: 'lg:px-12',
    link: 'https://www.elpuntavui.cat/societat/article/5-societat/2207998-una-empresa-de-bellpuig-rescata-del-malbaratament-mes-de-775-000-quilos-de-fruites-i-verdures-imperfectes.html',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.antena3'),
    cover: 'antena3.webp',
    width: 140,
    height: 110,
    altCover: 'Logo antena3',
    styles: 'px-3 lg:px-0',
    styleText: 'lg:px-12',
    link: 'https://www.antena3.com/noticias/economia/como-donde-comprar-frutas-verduras-calidad-mas-baratas-porque-son-feas_2024070666894545301df70001f363d8.html',
  },
  {
    id: useId(),
    title: t('newsroom.multimedia.medios.elpais'),
    cover: 'elpais.webp',
    width: 140,
    height: 25,
    altCover: 'Logo elpais',
    styles: 'px-3 lg:px-0 lg:my-10',
    position: 'col-span-2 lg:col-span-1',
    styleText: 'lg:px-12',
    link: 'https://elpais.com/gastronomia/el-comidista/2020/11/03/articulo/1604404426_298605.html',
  },
]
</script>

<template>
  <LightNewsRoomSection :title="$t('newsroom.multimedia.medios.title')">
    <div class="grid grid-cols-2 gap-y-8 gap-x-4 justify-items-center py-6 lg:grid-cols-3 xl:px-72">
      <div
        v-for="item in mediosItems"
        :key="item.id"
        :class="['font-solina-extended-book font-light text-base grid grid-cols-1 justify-items-center', item?.position]"
      >
        <a :href="item.link">
          <NuxtImg
            :class="[item.styles]"
            :src="`/images/newsroom/medios/${item.cover}`"
            :alt="item.altCover"
            :width="item.width"
            :height="item.height"
            :placeholder="[item.width, item.height]"
            fit="fill"
          />
        </a>
        <p :class="['mt-5', item?.styleText]">
          {{ item.title }}
        </p>
      </div>
    </div>
  </LightNewsRoomSection>
</template>
