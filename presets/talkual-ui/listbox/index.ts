export default {
  root: ({ props }) => ({
    class: [
      // Sizing and Shape
      'min-w-[12rem]',
      'rounded-md',

      // Colors
      'bg-beige-primary',
      'text-green-tertiary',
      'border',
      { 'border-transparent': !props.invalid },

      // Invalid State
      { 'border-red-primary': props.invalid },
    ],
  }),
  wrapper: {
    class: [
      // Overflow
      'overflow-auto',
    ],
  },
  list: {
    class: 'py-3 list-none m-0 outline-none',
  },
  item: ({ context }) => ({
    class: [
      // Font
      'font-normal',
      'leading-none',

      // Position
      'relative',

      // Shape
      'border-0',
      'rounded-none',

      // Spacing
      'm-0',
      'py-3',

      // Colors
      {
        'text-green-tertiary': !context.focused && !context.selected,
        'bg-transparent': context.focused && !context.selected || context.selected,
        'text-green-tertiary/80': context.focused && !context.selected,

        'text-green-tertiary-highlight-inverse': context.selected,
      },

      // States
      { 'hover:bg-transparent': !context.focused && !context.selected },
      { 'hover:bg-transparent-highlight-hover': context.selected },
      'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-none',

      // Transitions
      'transition-shadow',
      'duration-200',

      // Misc
      'cursor-pointer',
      'overflow-hidden',
      'whitespace-nowrap',
    ],
  }),
  itemgroup: {
    class: [
      // Font
      'font-bold',

      // Spacing
      'm-0',
      'py-3 px-5',

      // Color
      'text-green-tertiary',
      'bg-beige-primary',

      // Misc
      'cursor-auto',
    ],
  },
  header: {
    class: [
      // Spacing
      'py-3',
      'm-0',

      // Shape
      'rounded-tl-md',
      'rounded-tr-md',

      // Color
      'text-surface-700 dark:text-white/80',
      'bg-surface-100 dark:bg-surface-800',
      'border-surface-300 dark:border-surface-600',
    ],
  },
  filtercontainer: {
    class: 'relative',
  },
  filterinput: {
    class: [
      // Font
      'leading-none',

      // Sizing
      'pr-7 py-3 px-3',
      '-mr-7',
      'w-full',

      // Color
      'text-green-tertiary',
      'bg-beige-primary',
      'border-green-tertiary',

      // Shape
      'border',
      'rounded-lg',
      'appearance-none',

      // Transitions
      'transition',
      'duration-200',

      // States
      'hover:border-primary',
      'focus:ring-none focus:outline-none focus:outline-offset-0',

      // Misc
      'appearance-none',
    ],
  },
  filtericon: {
    class: ['absolute', 'top-1/2 right-3', '-mt-2', 'text-green-tertiary/50'],
  },
  emptymessage: {
    class: [
      // Font
      'leading-none',

      // Spacing
      'py-3 px-5',

      // Color
      'text-green-tertiary',
      'bg-transparent',
    ],
  },
}
