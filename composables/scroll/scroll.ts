export const useScroll = () => {
  const scrollToById = (id: string, offset: number | null = null): void => {
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight
        = document.getElementsByClassName('navbar')[0]?.clientHeight || 0
      let top = element.getBoundingClientRect().top
      if (!offset) {
        offset = navbarHeight + 24
      }

      top = top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    else {
      console.warn(`Element with id: '${id}' not found`)
    }
  }

  return { scrollToById }
}
