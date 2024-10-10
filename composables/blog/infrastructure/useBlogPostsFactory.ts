export const useBlogPostsFactory = (blogPost: any): BlogPost => {
  return {
    title: blogPost.title,
    imageUrl: blogPost.imageUrl,
    link: blogPost.link,
  }
}
