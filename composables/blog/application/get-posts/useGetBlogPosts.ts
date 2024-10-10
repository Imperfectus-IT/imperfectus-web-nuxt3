export const useGetBlogPosts = () => {
  const { findBlogPosts } = useBlogPostsRepository()
  const { posts } = useBlogPostsState()
  const executeGetAllBlogPosts = async () => {
    posts.value = await findBlogPosts()
  }

  return {
    executeGetAllBlogPosts,
  }
}
