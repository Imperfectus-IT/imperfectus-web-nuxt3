export default {
  root: ({ props }) => ({
    class: [
      {
        'rounded-lg border': !props.toggleable,
        'border-0': props.toggleable,
      },
    ],
  }),
  header: ({ props, state }) => ({
    class: [
      'flex items-center justify-between',

      // Colors
      'text-green-tertiary',
      'bg-transparent',
      'pt-4 pb-2 px-4',
      {
        'border rounded-tl-lg rounded-tr-lg': props.toggleable,
      },
      {
        'border-b border-green-tertiary': state.d_collapsed,
      },
      {
        '!p-2': !props.header,
      },
    ],
  }),
  title: {
    class: 'font-recoleta-semibold text-xl font-medium leading-5',
  },
  toggler: {
    class: [
      // Alignments
      'inline-flex items-center justify-center',
      'relative',

      // Sized
      'w-8 h-8',
      'm-0 p-0',

      // Shape
      'border border-green-tertiary rounded-full',

      // Color
      'bg-green-primary',
      'text-green-tertiary text-[1.5rem]',

      // Transitions
      'transition-all duration-200 ease-in-out',

      // Misc
      'overflow-hidden no-underline',
      'cursor-pointer',
    ],
  },
  togglerIcon: {
    class: 'inline-block',
  },
  content: ({ props }) => ({
    class: [
      {
        'border border-t-0 last:rounded-br-lg last:rounded-bl-lg': props.toggleable,
      },
      // Spacing
      'px-4 pb-3',

      // Color
      'bg-transparent',
      'text-tertiary solina-extended-book text-xs lg:text-base font-light leading-5',
    ],
  }),
  footer: {
    class: [
      // Spacing
      'py-3 p-5',

      // Shape
      'border border-t-0 rounded-br-lg rounded-bl-lg',

      // Color
      'border-green-tertiary',
      'bg-transparent',
      'text-green-tertiary',
    ],
  },
  transition: {
    enterFromClass: 'max-h-0',
    enterActiveClass: 'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
    enterToClass: 'max-h-[1000px]',
    leaveFromClass: 'max-h-[1000px]',
    leaveActiveClass: 'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
    leaveToClass: 'max-h-0',
  },
}
