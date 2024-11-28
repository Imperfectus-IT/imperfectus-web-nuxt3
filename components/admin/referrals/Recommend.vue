<template>
  <Panel
    :pt="{
      content: 'flex flex-col gap-4 py-4 px-5',
      header: 'hidden',
    }"
    class="lg:w-1/2 lg:h-3/4 lg:my-auto"
  >
    <h4 class="font-solina-extended-medium text-[20px] leading-8">
      {{ $t('referrals.recommend.title') }}
    </h4>
    <div class="flex flex-col">
      <InputGroup class="my-2 lg:w-full flex flex-row">
        <InputText
          class="w-3/4 rounded-l-xl max-h-[42px] lg:w-3/4"
          :value="userCode"
        />
        <Button
          :label="$t('referrals.recommend.button')"
          :pt="{
            label: ' text-[16px] lg:text-[18px]',
            root: 'max-h-[42px] font-solina-extended-book text-[14px] px-4 bg-green-primary border-[1px] border-green-tertiary rounded-r-lg  hover:bg-green-tertiary hover:text-green-primary focus:bg-green-tertiary focus:text-green-primary',
          }"
          @click="copyToClipboard"
        />
      </InputGroup>
      <div class="flex flex-row gap-2 w-1/3">
        <a
          target="_blank"
          :href="`${whatsappLink}text=${$t('referrals.recommend.body_message', { coupon: userCode })}`"
          title="whatsapp"
        >
          <NuxtImg
            src="/icons/referrals/whatsapp.webp"
            alt="whatsapp_icon"
            format="webp"
            loading="lazy"
            class="w-[30px] h-[30px]"
          />
        </a>
        <a :href="emailLink">
          <NuxtImg
            src="/icons/referrals/email.webp"
            alt="email_icon"
            format="webp"
            loading="lazy"
            class="w-[30px] h-[30px] cursor-pointer"
          />
        </a>
        <NuxtImg
          src="/icons/referrals/copy-to-clipboard.webp"
          alt="copy_icon"
          format="webp"
          loading="lazy"
          class="w-[30px] h-[30px] cursor-pointer"
          @click="copyToClipboard"
        />
      </div>
    </div>
    <p class="text-[16px]">
      {{ $t('referrals.recommend.description') }}
    </p>
  </Panel>
  <Toast />
</template>

<script setup lang="ts">
const toast = useToast()
const { t } = useI18n()
const { successToast, errorToast } = useToastService()
const { isAndroid, isIos } = useDevice()
const props = defineProps<{
  userCode: string
}>()
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.userCode)
    successToast(toast, t('referrals.recommend.toasts.successToast.title'), t('referrals.recommend.toasts.successToast.description'))
  }
  catch (error) {
    errorToast(toast, t('referrals.recommend.toasts.errorToast.title'), t('referrals.recommend.toasts.errorToast.description'))
  }
}
const whatsappLink = computed(() => isIos || isAndroid ? 'https://api.whatsapp.com/send?' : 'https://web.whatsapp.com/send?')
const emailLink = computed(() => `mailto:?subject=${t('referrals.recommend.subject_message')}&body=${t('referrals.recommend.body_message', { coupon: props.userCode })}`)
</script>
