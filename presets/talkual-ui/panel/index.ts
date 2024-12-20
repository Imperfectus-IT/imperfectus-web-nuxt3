export default {
  root: ({ props }) => ({
    class: [
      {
        'rounded-lg border py-2': !props.toggleable,
        'border-0 ': props.toggleable,
      },
    ],
  }),
  header: ({ props, state }) => ({
    class: [
      'flex items-center justify-between',

      // Colors
      'text-green-tertiary',
      'bg-transparent',
      'py-2 px-6',
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
    class: 'font-recoleta-semibold text-xl font-medium leading-5 whitespace-nowrap -ml-2',
  },
  toggler: {
    class: [
      // Alignments
      'inline-flex items-center justify-end -mr-2',
      'relative',

      // Sized
      'w-8 h-8',
      'm-0 p-0',

      // Shape
      '',

      // Color
      'bg-transparent',
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
      'px-5 pb-3 h-full',

      // Color
      'bg-transparent',
      'flex flex-col text-tertiary solina-extended-book text-xs lg:text-base font-light leading-5',
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
