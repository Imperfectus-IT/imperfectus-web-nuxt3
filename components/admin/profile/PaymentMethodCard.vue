<script setup lang="ts">
import type { Payment } from '~/composables/payment/domain/Payment.ts'
import type RedsysPaymentForm from '~/components/share/RedsysPaymentForm.vue'

const {
  isDialogOpen,
  openDialog,
  closeDialog,
} = useDialogService()

const { canDeletePayment } = useDeletePaymentValidator()
const { payments: paymentMethods } = useGetAllPaymentsHandler()
const { handleDeletePayment } = useDeletePaymentHandler()
const redsysForm = ref<InstanceType<typeof RedsysPaymentForm> | null>(null)

const handleAddPayment = async () => {
  await redsysForm.value?.submit()
}
</script>

<template>
  <div>
    <Toast />
    <Panel
      :header="$t('pages.admin.subscription.adminSubscriptionPaymentTitle')"
      :pt="{
        title: 'font-recoleta-medium text-xl font-medium leading-5',
      }"
    >
      <Divider class="lg:invisible" />
      <div
        v-for="item in paymentMethods"
        :key="item.id"
        class="flex flex-col gap-3 mb-5"
      >
        <p class="font-solina-extended-book text-sm">
          {{ $t('adminSubscriptionPayment.cardNumber') }}: {{ item.cardNumber }}
        </p>
        <p class="font-solina-extended-book text-sm">
          {{ $t('adminSubscriptionPayment.cardBrand') }}: {{ item.cardBrand }}
        </p>
        <p class="font-solina-extended-book text-sm">
          {{ $t('adminSubscriptionPayment.expiryDate') }}: {{ item.expiryMonth }}/{{ item.expiryYear }}
        </p>
        <div
          v-if="canDeletePayment(paymentMethods)"
          class="flex gap-8 mb-5"
        >
          <span
            class="underline underline-offset-2 cursor-pointer"
            @click.prevent="openDialog"
          >
            {{ $t("adminSubscriptionItems.remove") }}
          </span>
        </div>
        <LazyDeletePaymentMethodDialog
          v-if="isDialogOpen"
          :visible="isDialogOpen"
          @hide="closeDialog"
          @delete="handleDeletePayment(item.id)"
        />
      </div>
      <Divider class="invisible lg:visible !my-0 " />
      <RedsysPaymentForm
        ref="redsysForm"
        class="mt-6 w-full lg:w-1/5 text-[14px]"
        :is-button-outlined="true"
      />
      <Button
        :label="$t('adminSubscriptionPayment.addPaymentMethod')"
        class="lg:w-1/4"
        outlined
        @click.prevent="handleAddPayment"
      />
    </Panel>
  </div>
</template>
