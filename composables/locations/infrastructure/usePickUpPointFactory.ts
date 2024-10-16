export const usePickUpPointFactory = () => {
  const seurPickUpPoint = (pickUpPoint): PickUpPoint => {
    return {
      id: pickUpPoint.id,
      company: ALL_COVERAGES.SEUR.label,
      name: pickUpPoint.name,
      address: pickUpPoint.address,
      city: capitalizeFirstLetter(pickUpPoint.city),
      postcode: pickUpPoint.postcode,
      defaultSchedule: pickUpPoint.defaultSchedule,
      summerSchedule: pickUpPoint.summerSchedule,
    }
  }

  const correosPickUpPoint = (pickUpPoint): PickUpPoint => {
    return {
      id: pickUpPoint.id,
      company: ALL_COVERAGES.CORREOSEXPRESS.label,
      name: pickUpPoint.name,
      address: pickUpPoint.address,
      city: capitalizeFirstLetter(pickUpPoint.city),
      postcode: pickUpPoint.postcode,
      defaultSchedule: pickUpPoint.defaultSchedule,
      summerSchedule: pickUpPoint.summerSchedule,
    }
  }
  return {
    seurPickUpPoint,
    correosPickUpPoint,
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
