<template>
  <div class="flex items-center justify-center p-5">
    <Card>
      <template #header>
        <img
          class="rounded-t-lg border-b-[1px] border-green-tertiary"
          alt="user header"
          src="https://res.cloudinary.com/talkual/image/upload/v1686833239/Caixa_S_1_ad68acddfa.webp"
        />
      </template>
      <template #title> Caja pequeña </template>
      <template #content>
        <p>
          Entre 6-7 kg de fruta y/o verdura de temporada. Ideal para 1-2
          personas.
        </p>
      </template>
      <template #footer>
        <Button class="w-full" label="Comprar" severity="secondary" />
      </template>
    </Card>
  </div>
</template>
