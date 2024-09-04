import type { BlogPost } from '~/composables/blog/types/BlogTypes.ts'

export const useBlogPostsState = () => {
  const blogPosts: Ref<BlogPost[]> = useState('blogPosts', () => [])

  return {
    blogPosts,
  }
}
