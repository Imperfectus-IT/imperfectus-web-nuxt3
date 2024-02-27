<template>
    <div>
        <Header 
        class="h-[50vh]"
        :title="t('team.header.title')"
        :description="t('team.header.description') + t('team.header.description.break')"
        :background-desktop="'/images/about/team/header-mobile.jpg'"
        />
        <div
            v-for="({ name, position, images }, index) in team"
            :key="index"
            class="flex flex-col items-center justify-center mt-12"
        >
          
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const client = useStrapiClient();
const team = ref<ITeamMember[]>([]);
const currentImage = ref<number>(1);

onMounted(async () => {
  team.value = await client<ITeamMember[]>('/options/team-members');  
});

defineI18nRoute({
  paths: {
    ca: "/equip/",
    es: "/equipo/",
  },
});


interface ITeamMember {
  name: string;
  position: string;
  images: string[];
}
</script>