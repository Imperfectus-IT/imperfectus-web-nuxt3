export default {
  root: {
    class: [
      'relative',
      'font-solina-extended-medium font-normal',

      // Flexbox
      'flex',
      'items-center',

      // Spacing
      'py-2 px-6',

      // Shape
      'rounded-md',

      // Color
      'bg-green-transparent',
      'border-none',
    ],
  },
  menu: ({ props }) => ({
    class: [
      // Flexbox
      'sm:flex',
      'items-center gap-5',
      'flex-wrap',
      'flex-col sm:flex-row',
      { hidden: !props?.mobileActive, flex: props?.mobileActive },

      // Position
      'absolute sm:relative',
      'top-full left-0',
      'sm:top-auto sm:left-auto',

      // Size
      'w-full sm:w-auto',

      // Spacing
      'm-0',
      'py-1 sm:py-0 sm:p-0',
      'list-none',

      // Shape
      'shadow-none',
      'border-0',

      // Color
      'bg-transparent',

      // Misc
      'outline-none',
      'text-normal uppercase',
    ],
  }),
  menuitem: {
    class: 'sm:relative sm:w-auto w-full static my-3',
  },
  content: ({ props, context }) => ({
    class: [
      // Shape
      { 'rounded-lg': props.root },

      //  Colors
      'text-green-tertiary bg-transparent',

      // Hover States
      {
        'hover:bg-transparent': !context.active,
        'hover:bg-transparent text-green-tertiary': context.active,
      },

      // Transitions
      'transition-all',
      'duration-200',
    ],
  }),
  action: ({ context }) => ({
    class: [
      'relative',

      // Flexbox
      'flex',
      'items-center',

      // Spacing
      'py-2',
      'px-3',

      // Size
      {
        'pl-9 sm:pl-5': context.level === 1,
        'pl-14 sm:pl-5': context.level === 2,
      },
      'leading-none',

      // Misc
      'select-none',
      'cursor-pointer',
      'no-underline ',
      'overflow-hidden',
      '!text-normal',
    ],
  }),
  icon: {
    class: 'mr-2',
  },
  submenuicon: ({ props }) => ({
    class: [
      {
        'ml-auto sm:ml-2': props.root,
        'ml-auto': !props.root,
      },
      'text-green-tertiary w-6 h-6',
    ],
  }),
  submenu: ({ props }) => ({
    class: [
      // Size
      'w-full sm:w-60',

      // Spacing
      'px-4',
      'm-0',
      'list-none',

      // Shape
      'shadow-none',
      'border-0',

      // Position
      'static sm:absolute',
      'z-10',
      { 'sm:absolute sm:left-full sm:top-0': props.level > 1 },

      // Color
      'bg-green-quaternary',
      'rounded-lg',
      'text-sm normal-case',
    ],
  }),
  separator: {
    class: 'border-t border-green-quaternary my-1',
  },
  button: {
    class: [
      // Flexbox
      'flex sm:hidden',
      'items-center justify-center',

      // Size
      'w-8',
      'h-8',

      // Shape
      'rounded-full',
      // Color
      'text-green-quaternary',

      // Transitions
      'transition duration-200 ease-in-out',

      // Misc
      'cursor-pointer',
      'no-underline',
    ],
  },
  end: {
    class: 'ml-auto self-center',
  },
}
