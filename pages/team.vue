<template>
  <div>
    <Header 
      class="h-[50vh]"
      :title="t('team.header.title')"
      :description="t('team.header.description') + t('team.header.description.break')"
      :background-desktop="'/images/about/team/header.jpg'"
      :background-mobile="'/images/about/team/header-mobile.jpg'"
    />
    <div class="lg:w-9/12 mx-auto">
      <h4 class="my-14 ml-5 font-solina-condensed-bold uppercase font-bold text-[18px]">{{ t('team.header.title') }}</h4>
      <div class="lg:grid lg:grid-cols-4 lg:gap-y-8 lg:gap-x-8">
        <TeamMember 
          v-for="({ name, position, images }, index) in team"   
          :key="index" 
          class="mb-6"
          :name="name"
          :position="position"  :images="images" 
          />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { TeamMember } from "@/components/about/team/types/TeamMember";

const { t } = useI18n();

const client = useStrapiClient();
const team = ref<TeamMember[]>([]);

const getTeamInfo = async () => {
  team.value = await client<TeamMember[]>('/options/team-members');
};

onMounted(async () => {
  await getTeamInfo();  
});

defineI18nRoute({
  paths: {
    ca: "/equip/",
    es: "/equipo/",
  },
});

</script>