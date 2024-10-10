import type { BlogPost } from '~/composables/blog/domain/Blog.ts'

export const useBlogPostsState = () => {
  const posts: Ref<BlogPost[]> = useState('posts', () => [])

  return {
    posts,
  }
}
