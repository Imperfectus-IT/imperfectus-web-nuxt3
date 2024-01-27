
<template>
  <div class="flex items-center justify-center">
    <Card>
      <template #header>
        <img
          alt="user header"
          src="https://res.cloudinary.com/talkual/image/upload/v1686833239/Caixa_S_1_ad68acddfa.webp"
        >
      </template>
      <template #title>
        Caja pequeña
      </template>
      <template #content>
        <p>
          Entre 6-7 kg de fruta y/o verdura de temporada. Ideal para 1-2 personas.
        </p>
      </template>
      <template #footer>
        <Button
          icon="pi pi-check"
          label="Save"
        />
        <Button
          icon="pi pi-times"
          label="Cancel"
          severity="secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
</template>
