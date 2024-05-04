export default {
  root: {
    class: [
      // Sizing and Shape
      'min-w-[12rem]',
      'rounded-md',
      // Spacing
      'py-2',
      // Colors
      'bg-green-tertiary',
      'text-green-quaternary',
      'border border-green-tertiary',
    ],
  },
  menu: {
    class: [
      // Spacings and Shape
      'list-none',
      'm-0',
      'p-0',
      'outline-none',
    ],
  },
  content: ({ context }) => ({
    class: [
      // Shape
      'rounded-none',
      // Colors
      'text-green-quaternary',
      {
        'bg-green-tertiary text-green-primary': context.focused,
      },
      // Transitions
      'transition-shadow',
      'duration-200',
      // States
      'hover:text-green-primary',
      'hover:bg-green-tertiary',
    ],
  }),
  action: {
    class: [
      'relative',
      // Flexbox

      'flex',
      'items-center',

      // Spacing
      'py-3',
      'px-5',

      // Color
      'text-green-quaternary',

      // Misc
      'no-underline',
      'overflow-hidden',
      'cursor-pointer',
      'select-none',
    ],
  },
  icon: {
    class: [
      // Spacing
      'mr-2',

      // Color
      'text-green-quaternary',
    ],
  },
  label: {
    class: ['leading-none'],
  },
  submenuheader: {
    class: [
      // Font
      'font-bold',
      // Spacing
      'm-0',
      'py-3 px-5',
      // Shape
      'rounded-tl-none',
      'rounded-tr-none',
      // Colors
      'bg-green-tertiary',
      'text-green-quaternary',
    ],
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0',
  },
}
