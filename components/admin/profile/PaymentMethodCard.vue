<script setup lang="ts">
const {
  isDialogOpen,
  openDialog,
  closeDialog
} = useDialogService();

const { canDeletePayment } = useDeletePaymentValidator();
const { payments: paymentMethods } = useGetAllPaymentsHandler();
const { handleDeletePayment } = useDeletePaymentHandler();
</script>

<template>
  <div>
    <Toast />
    <Panel :header="$t('pages.admin.subscription.adminSubscriptionPaymentTitle')">
      <Divider/>
      <div v-for="item in paymentMethods" :key="item.id" class="flex flex-col gap-3 mb-5">
        <p class="font-solina-extended-book text-sm">
          {{ $t('adminSubscriptionPayment.cardNumber') }}: {{ item.cardNumber }}
        </p>
        <p class="font-solina-extended-book text-sm">
          {{ $t('adminSubscriptionPayment.cardBrand') }}: {{ item.cardBrand }}
        </p>
        <p class="font-solina-extended-book text-sm">
          {{ $t('adminSubscriptionPayment.expiryDate') }}: {{ item.expiryMonth }}/{{ item.expiryYear }}
        </p>
        <div v-if="canDeletePayment(paymentMethods)" class="flex gap-8 mb-5">
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
      <Button
          class="h-[3.125rem]" :label="$t('adminSubscriptionPayment.addPaymentMethod')"
          :pt="{ label: 'text-sm' }" outlined
      />
    </Panel>
  </div>
</template>
