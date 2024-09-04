export const usePublicReviewsRepository = () => {
  const client = useStrapiClient()
  const findPublicReviews = async () => {
    // @TODO get user language before calling the endpoint
    const language = 'ca'
    const reviews = await client(`/utils/reviews?lang=${language}`, {
      method: 'GET',
    })
    return reviews.map((review: any) => usePublicReviewsFactory(review))
  }
  return {
    findPublicReviews,
  }
}
