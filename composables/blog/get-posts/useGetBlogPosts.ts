export const useGetBlogPosts = () => {
  const { findBlogPosts } = useBlogPostsRepository()
  const { blogPosts } = useBlogPostsState()
  const executeGetAllBlogPosts = async () => {
    blogPosts.value = await findBlogPosts()
  }

  return {
    executeGetAllBlogPosts,
  }
}
