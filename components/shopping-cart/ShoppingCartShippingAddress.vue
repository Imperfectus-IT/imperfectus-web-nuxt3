<script setup lang="ts">
import { createEmpty as createEmptyShippingAddress } from '@/composables/shopping-cart/domain/ShippingAddress.ts'
import { useValidateShippingForm } from '~/composables/shopping-cart/domain/useValidateShippingForm.ts'

const props = defineProps<{
  displayErrors: boolean
}>()

const { shoppingCart } = useShoppingCartState()
const cleanData = () => shoppingCart.value.shippingAddress = createEmptyShippingAddress()
const { errors, validateSchema } = useValidateShippingForm()
const { loadGoogleMaps } = useGoogleMaps()

onMounted(async () => {
  validateSchema(shoppingCart.value.shippingAddress)
  await loadGoogleMaps()
  const inputElement = document.querySelector<HTMLInputElement>('#shippingAddress')
  if (inputElement) {
    const autocomplete = new google.maps.places.Autocomplete(inputElement, {
      types: ['address'],
      componentRestrictions: { country: 'es' },
    })
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      fillItWithGoogleMapsPlaceData(place)
    })
  }
})

watch(shoppingCart, () => {
  validateSchema(shoppingCart.value.shippingAddress)
}, { deep: true })

const fillItWithGoogleMapsPlaceData = (place: google.maps.places.PlaceResult) => {
  const postalCode = place?.address_components?.filter(component =>
    component.types.includes('postal_code'),
  )[0]?.short_name

  const address = place?.address_components?.filter(component =>
    component.types.includes('route'),
  )[0]?.short_name

  const streetNumber = place?.address_components?.filter(component =>
    component.types.includes('street_number'),
  )[0]?.short_name

  const city = place?.address_components?.filter(component =>
    component.types.includes('locality'),
  )[0]?.short_name

  const state = place?.address_components?.filter(component =>
    component.types.includes('administrative_area_level_2'),
  )[0]?.long_name

  shoppingCart.value.shippingAddress.shippingAddress = address || ''
  if (streetNumber) {
    shoppingCart.value.shippingAddress.shippingAddress += ' ' + streetNumber
  }
  shoppingCart.value.shippingAddress.shippingPostCode = postalCode || ''
  shoppingCart.value.shippingAddress.shippingCity = city || ''
  shoppingCart.value.shippingAddress.shippingState = state || ''
}

defineExpose({ errors })
</script>

<template>
  <div class="text-center lg:col-span-2 font-recoleta-regular text-[40px]">
    {{ $t('order.steps.stepShipping.title') }}
  </div>
  <div class="lg:col-span-2 lg:flex lg:flex-row lg:justify-end hidden">
    <Button
      outlined
      :label="$t('orderMeta.cleanData')"
      :pt="{
        root: 'border-[1px] px-4 py-0.5 rounded-md my-4',
        label: 'text-xs',
      }"
      @click.prevent="cleanData"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.firstname') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.shippingFirstName"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingFirstName?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.lastname') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.shippingLastName"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingLastName?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.email') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.shippingEmail"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingEmail?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.phone') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.shippingPhone"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingPhone?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.company') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.company"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.address1') }}
    </span>
    <InputText
      id="shippingAddress"
      v-model="shoppingCart.shippingAddress.shippingAddress"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingAddress?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.address2') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.shippingAddress2"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.postalCode') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.shippingPostCode"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingPostCode?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.city') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.shippingCity"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingCity?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.state') }}
    </span>
    <InputText
      v-model="shoppingCart.shippingAddress.shippingState"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingState?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.country') }}
    </span>
    <Dropdown
      v-model="shoppingCart.shippingAddress.shippingCountry"
      :pt="{ root: 'text-[16px] bg-transparent border-[1px] rounded-lg w-full mb-4 mt-2 py-1 flex' }"
      :options="[{ label: 'España', value: 'ES' }]"
      option-value="value"
      option-label="label"
    />
    <span
      v-if="displayErrors"
      class="text-red-primary"
    >{{ errors?.shippingCountry?._errors[0] }}</span>
  </div>
  <div>
    <span class="font-bold text-[14px]">
      {{ $t('orderMeta.shipping_fields.notes') }}
    </span>
    <Textarea
      v-model="shoppingCart.shippingAddress.shippingNotes"
      auto-resize
      rows="3"
      cols="30"
      class="mt-2 rounded-lg w-full mb-4 lg:mb-0"
      :pt="{
        root: 'text-[16px] bg-transparent border-[1px] px-4 py-3 rounded-lg w-full mb-4',
      }"
    />
  </div>
</template>
