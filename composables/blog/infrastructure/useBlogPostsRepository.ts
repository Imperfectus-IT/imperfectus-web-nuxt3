export const useBlogPostsRepository = () => {
  const client = useStrapiClient()
  const findBlogPosts = async () => {
    // @TODO recover language from user
    const language = 'es'
    const blogPosts = await client(`/utils/posts-blog?language=${language}`, {
      method: 'GET',
    })
    return blogPosts.map((blogPost: any) => useBlogPostsFactory(blogPost))
  }

  return {
    findBlogPosts,
  }
}
