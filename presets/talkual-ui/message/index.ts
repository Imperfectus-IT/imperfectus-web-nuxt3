export default {
  root: ({ props }) => ({
    class: [
      // Spacing and Shape
      'my-4 mx-0',
      'rounded-md',
      'border-solid border-0 border-l-[6px]',

      // Colors
      {
        'bg-blue-100/70 dark:bg-blue-500/20': props.severity == 'info',
        'bg-green-quaternary/80': props.severity == 'success',
        'bg-orange-100/80': props.severity == 'warn',
        'bg-red-primary/80': props.severity == 'error',
      },
      {
        'border-blue-500 dark:border-blue-400': props.severity == 'info',
        'border-green-quaternary': props.severity == 'success',
        'border-orange-500 dark:border-orange-400': props.severity == 'warn',
        'border-red-primary': props.severity == 'error',
      },
      'text-green-tertiary/80',
    ],
  }),
  wrapper: {
    class: [
      // Flexbox
      'flex items-center',

      // Spacing
      'py-5 px-7',
    ],
  },
  icon: {
    class: [
      // Sizing and Spacing
      'w-6 h-6',
      'text-lg leading-none mr-2 shrink-0',
    ],
  },
  text: {
    class: [
      // Font and Text
      'text-base leading-none',
      'font-medium',
    ],
  },
  button: {
    class: [
      // Flexbox
      'flex items-center justify-center',

      // Size
      'w-8 h-8',

      // Spacing and Misc
      'ml-auto  relative',

      // Shape
      'rounded-full',

      // Colors
      'bg-transparent',

      // Transitions
      'transition duration-200 ease-in-out',

      // States
      'hover:bg-surface-0/50 dark:hover:bg-surface-0/10',

      // Misc
      'overflow-hidden',
    ],
  },
  transition: {
    enterFromClass: 'opacity-0',
    enterActiveClass: 'transition-opacity duration-300',
    leaveFromClass: 'max-h-40',
    leaveActiveClass: 'overflow-hidden transition-all duration-300 ease-in',
    leaveToClass: 'max-h-0 opacity-0 !m-0',
  },
}
