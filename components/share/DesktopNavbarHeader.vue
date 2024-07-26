<script setup lang="ts">
import TalkualLogoDark from '~/assets/images/svg/talkual-logo-dark.svg'

const { t } = useI18n()
const localePath = useLocalePath()
const { visible, toggleVisible } = useVisibleSidebar()

const items = ref([
  {
    label: t('layout.navbar.menu'),
    command: () => {
      toggleVisible()
    },
  },
  {
    label: t('layout.navbar.boxes'),
    items: [
      {
        label: t('layout.navbar.boxes.boxes'),
        url: 'boxes',
      },
      {
        label: t('layout.navbar.boxes.special'),
        url: 'special',
      },
    ],
  },
  {
    label: t('layout.navbar.boxes.companies'),
    url: 'companies',
  },
])
</script>

<template>
  <section>
    <Toolbar class="!p-0 bg-transparent border-none gap-x-2 lg:h-[69px]">
      <template #start>
        <div class="flex flex-row px-8 gap-5 font-bold">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="cursor-pointer"
            @click="item.command"
          >
            <NuxtLinkLocale
              v-if="!item.items"
              :to="item.url"
              class="uppercase"
            >
              {{ item.label }}
            </NuxtLinkLocale>
            <div v-else>
              <Dropdown
                :pt="{
                  root: 'flex flex-row',
                  input: 'w-full',
                  label: 'text-uppercase',
                  trigger: 'pl-1 my-auto',
                }"
                placeholder="CAJAS"
                :options="item.items"
              >
                <template #option="slotProps">
                  <NuxtLinkLocale :to="slotProps.option.url">
                    {{ slotProps.option.label }}
                  </NuxtLinkLocale>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>

        <!--        <Menubar :model="items" /> -->
      </template>
      <template #center>
        <NuxtLink to="/">
          <TalkualLogoDark
            class="w-[156] h-7"
            :font-controlled="false"
          />
        </NuxtLink>
      </template>
      <template #end>
        <div class="flex items-center justify-center gap-x-5 pr-8">
          <NuxtLink :to="localePath({ name: 'order' })">
            <Button
              :label="$t('homeTitle.order')"
              raised
            />
          </NuxtLink>
          <NuxtLink :to="localePath({ name: 'admin' })">
            <Button
              :label="$t('layout.navbar.account')"
              icon="mdi mdi-account"
              icon-pos="right"
              link
              :pt="{
                label: { class: 'font-solina-extended-medium font-normal' },
                icon: { class: 'text-lg ml-2 order-1' },
              }"
            />
          </NuxtLink>
          <TKLocalesSwitcher
            class="flex"
            :separator="true"
          />
        </div>
      </template>
    </Toolbar>
    <AppSidebar
      v-model:visible="visible"
      @hide="toggleVisible"
    />
  </section>
</template>
