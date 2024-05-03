<template>
  <div class="rounded-lg border border-gray-primary shadow-lg mb-4 p-8">
    <div class="flex mb-4">
      <Skeleton
        shape="circle"
        size="4rem"
        class="mr-2"
      />
      <div>
        <Skeleton
          width="10rem"
          class="mb-2"
        />
        <Skeleton
          width="5rem"
          class="mb-2"
        />
        <Skeleton height=".5rem" />
      </div>
    </div>
    <Skeleton
      width="100%"
      height="150px"
    />
    <div class="flex justify-between mt-4">
      <Skeleton
        width="4rem"
        height="2rem"
      />
      <Skeleton
        width="4rem"
        height="2rem"
      />
    </div>
  </div>
</template>
