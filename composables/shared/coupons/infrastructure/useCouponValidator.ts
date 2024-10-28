// export const useCouponValidator = () => {
//   const validationMessage: Ref<ValidationMessage> = ref({
//     status: null,
//     message: null,
//   })
//   const { shoppingCart } = useShoppingCartState()
//   const user = useStrapiUser()
//   const { executeFindUserCoupon } = useFindUserCoupon()
//   const { t } = useI18n()
//
//   const setValidationMessage = (status: MessageStatus, message: string) => {
//     validationMessage.value.status = status
//     validationMessage.value.message = message
//   }
//
//   const hasCouponLoggedUser = (coupon: Coupon): boolean => {
//     return coupon.users.length === 0 || coupon.users.some(user => user.id === user.id)
//   }
//
//   const validateCoupon = async (coupon: Coupon) => {
//     if (user.value?.id) {
//       await validateUserCoupon(coupon)
//     }
//     ensureCouponIsValidForLocation(coupon)
//     ensureCouponValidForItems(coupon)
//     setValidationMessage(SUCCESS_MESSAGE_STATUS, t('orderCoupon.successMessage'))
//   }
//
//   const ensureCouponIsValidForLocation = (coupon: Coupon) => {
//     if (!isCouponValidForLocation(coupon)) {
//       setValidationMessage(ERROR_MESSAGE_STATUS, t('orderCoupon.wrongPostalCode', { postcode: coupon.postcode }))
//       return
//     }
//   }
//
//   const isCouponValidForLocation = (coupon: Coupon): boolean => {
//     return !coupon?.locations?.length || coupon?.locations?.some(location => location.postcode === Number(shoppingCart.value.shippingAddress?.postalCode))
//   }
//
//   const ensureCouponValidForItems = (coupon: Coupon) => {
//     if (!isCouponValidForItems(coupon)) {
//       setValidationMessage(ERROR_MESSAGE_STATUS, t('orderCoupon.wrongSKU.BOX'))
//       return
//     }
//   }
//
//   const isCouponValidForItems = (coupon: Coupon): boolean => {
//     return !coupon?.products?.length || coupon?.products?.some(product => shoppingCart.value.items.some(item => item.product === product.id))
//   }
//
//   const validateUserCoupon = async (coupon: Coupon) => {
//     const userCouponQuery = { coupon: coupon.id, user: user.value?.id }
//     const userCoupon = await executeFindUserCoupon(userCouponQuery)
//     await ensureCouponValidForUsers(userCoupon, coupon)
//   }
//
//   const ensureCouponValidForUsers = async (userCoupon: UserCoupon, coupon: Coupon) => {
//     if (!isCouponValidForUser(userCoupon, coupon)) {
//       const timesUsed = !userCoupon ? 0 : userCoupon.times_used
//       setValidationMessage(ERROR_MESSAGE_STATUS, t('orderCoupon.errorLimit', { num: timesUsed }))
//       return
//     }
//   }
//
//   const isCouponValidForUser = (userCoupon: UserCoupon, coupon: Coupon): boolean => {
//     return !userCoupon || !coupon.maxOrdersPerUser || isCouponLimitNotExceeded(userCoupon, coupon)
//   }
//
//   const isCouponLimitNotExceeded = (userCoupon: UserCoupon, coupon: Coupon): boolean => {
//     return userCoupon.times_used < coupon.maxOrdersPerUser
//   }
//
//   return {
//     validateCoupon,
//     validationMessage,
//     setValidationMessage,
//   }
// }
