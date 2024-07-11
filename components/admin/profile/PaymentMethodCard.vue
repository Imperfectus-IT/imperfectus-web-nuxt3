<script setup lang="ts">
import type { Payment } from '~/composables/payment/types/Payment.ts'

const {
  isDialogOpen,
  openDialog,
  closeDialog,
} = useDialogService()

const { canDeletePayment } = useDeletePaymentValidator()
const { payments: paymentMethods } = useGetAllPaymentsHandler()
const { handleDeletePayment } = useDeletePaymentHandler()

const handleAddPayment = async (submitForm: any) => {
  await submitForm()
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
        ref="redsys"
        class="mt-6 w-1/4"
        :order="null"
        :is-button-outlined="true"
        @redirect="handleAddPayment"
      >
        {{ $t("profile.payment.addButton") }}
      </RedsysPaymentForm>
    </Panel>
  </div>
</template>
