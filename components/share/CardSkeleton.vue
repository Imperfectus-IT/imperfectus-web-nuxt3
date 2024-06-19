<template>
  <div class="rounded border border-green-primary dark:border-red-primary p-6  dark:bg-surface-900">
    <div class="flex mb-4">
      <Skeleton
        shape="circle"
        size="4rem"
        class="mr-2 bg-green-tertiary"
      />
      <div>
        <Skeleton
          width="10rem"
          class="mb-2 bg-green-tertiary"
        />
        <Skeleton
          width="5rem"
          class="mb-2 bg-green-tertiary"
        />
        <Skeleton
          height=".5rem bg-green-tertiary"
          class="bg-green-tertiary"
        />
      </div>
    </div>
    <Skeleton
      width="100%"
      height="150px"
      class="bg-green-tertiary"
    />
    <div class="flex justify-between mt-4 ">
      <Skeleton
        width="4rem"
        height="2rem"
        class="bg-green-tertiary"
      />

      <Skeleton
        class="bg-green-tertiary"
        width="4rem"
        height="2rem"
      />
    </div>
  </div>
</template>
