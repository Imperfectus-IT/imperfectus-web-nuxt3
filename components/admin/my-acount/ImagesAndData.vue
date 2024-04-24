<template>
  <div class="font-solina-extended-book m-6">
    <div class="flex flex-row">
      <NuxtImg
        src="images/admin/my-acount/mi-cuenta-1.webp"
        alt="mi-cuenta-1"
        format="webp"
        loading="lazy"
        width="150"
        height="150"
      />
      <p class="w-1/2 p-3 text-[18px] font-recoleta-medium text-center my-auto">
        {{ $t("profile.my_acount.info_1", { kgs: "1.500.000" }) }}
      </p>
    </div>

    <div class="flex flex-row mt-6">
      <NuxtImg
        src="images/admin/my-acount/mi-cuenta-2.webp"
        alt="mi-cuenta-1"
        format="webp"
        loading="lazy"
        width="150"
        height="150"
      />
      <!-- TODO User Kgs must be calculated! -->
      <p class="w-1/2 p-3 text-[18px] font-recoleta-medium text-center my-auto">
        {{ $t("profile.my_acount.info_2", { kgs: "25" }) }}
      </p>
    </div>
  </div>
</template>
