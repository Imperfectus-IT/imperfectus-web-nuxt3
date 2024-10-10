import { useGetBlogPosts } from '~/composables/blog/application/get-posts/useGetBlogPosts.ts'

export const useGetBlogPostsHandler = () => {
  const { executeGetAllBlogPosts } = useGetBlogPosts()
  onMounted(async () => {
    await executeGetAllBlogPosts()
  })
}
