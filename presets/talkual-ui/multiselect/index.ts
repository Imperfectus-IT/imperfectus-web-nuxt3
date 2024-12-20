export default {
  root: ({ props, state }) => ({
    class: [
      // Display and Position
      'inline-flex',
      'relative',

      // Shape
      'w-full ',
      'rounded-md',

      // Color and Background
      'bg-transparent',
      'border-b-[1px] border-green-tertiary',

      // Transitions
      'transition-all',
      'duration-200',

      // States
      'hover:border-green-tertiary focus:border-green-tertiary',
      {
        'outline-none outline-offset-0 ring-o': state.focused,
      },

      // Misc
      'cursor-pointer',
      'select-none',
      {
        'opacity-60': props.disabled,
        'pointer-events-none': props.disabled,
        'cursor-default': props.disabled,
      },
    ],
  }),
  labelContainer: {
    class: 'overflow-hidden flex flex-auto cursor-pointer ',
  },
  label: ({ props }) => ({
    class: [
      'leading-none text-base',
      'block',

      // Spacing
      {
        'p-3': props.display !== 'chip',
        'py-3 px-3': props.display === 'chip' && !props?.modelValue?.length,
        'py-1.5 px-3':
          props.display === 'chip' && props?.modelValue?.length > 0,
      },

      // Color
      'text-green-tertiary',
      'placeholder:text-green-tertiary/80',

      // Transitions
      'transition duration-200',

      // Misc
      'overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis',
    ],
  }),
  token: {
    class: [
      // Flex
      'inline-flex items-center',

      // Spacings
      'py-1.5 px-3 mr-2',

      // Shape
      'rounded-[1.14rem]',

      // Colors
      'border border-green-tertiary bg-transparent',
      'text-green-tertiary',

      // Misc
      'cursor-default',
    ],
  },
  removeTokenIcon: {
    class: [
      // Shape
      'rounded-md leading-6',

      // Spacing
      'ml-2',

      // Size
      'w-4 h-4',

      // Transition
      'transition duration-200 ease-in-out',

      // Misc
      'cursor-pointer',
    ],
  },
  trigger: {
    class: [
      // Flexbox
      'flex items-center justify-center',
      'shrink-0',

      // Color and Background
      'bg-transparent',
      'text-green-tertiary',

      // Size
      'w-12',

      // Shape
      'rounded-tr-md',
      'rounded-br-md',
    ],
  },
  panel: {
    class: [
      // Position
      'absolute top-0 left-0 w-full lg:w-1/2',

      // Shape
      'border-0',
      'rounded-md',
      'shadow-none',

      // Color
      'bg-beige-primary',
      'text-green-tertiary',
      'border-[1px] border-green-tertiary',
    ],
  },
  header: {
    class: [
      'flex items-center justify-between',
      // Spacing
      'py-3 px-5',
      'm-0',

      // Shape
      'border-b',
      'rounded-tl-md',
      'rounded-tr-md',

      // Color
      'text-green-tertiary',
      'bg-beige-primary',
      'border-none',
    ],
  },
  headerCheckboxContainer: {
    class: [
      'relative',

      // Alignment
      'inline-flex',
      'align-bottom',

      // Size
      'w-6',
      'h-6',

      // Misc
      'cursor-pointer',
      'select-none',
    ],
  },
  headerCheckbox: {
    root: {
      class: [
        'relative',

        // Alignment
        'inline-flex',
        'align-bottom',

        // Size
        'w-6',
        'h-6',

        // Spacing
        'mr-2',

        // Misc
        'cursor-pointer',
        'select-none',
      ],
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        'flex',
        'items-center',
        'justify-center',

        // Size
        'w-6',
        'h-6',

        // Shape
        'rounded-md',
        'border-2',

        // Colors
        {
          'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900':
            !context.checked,
          'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400':
            context.checked,
        },

        // States
        {
          'peer-hover:border-primary-500 dark:peer-hover:border-primary-400':
            !props.disabled && !context.checked,
          'peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300':
            !props.disabled && context.checked,
          'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20':
            !props.disabled,
          'cursor-default opacity-60': props.disabled,
        },

        // Transitions
        'transition-colors',
        'duration-200',
      ],
    }),
    input: {
      class: [
        'peer',

        // Size
        'w-full ',
        'h-full',

        // Position
        'absolute',
        'top-0 left-0',
        'z-10',

        // Spacing
        'p-0',
        'm-0',

        // Shape
        'opacity-0',
        'rounded-md',
        'outline-none',
        'border-none',

        // Misc
        'appareance-none',
        'cursor-pointer',
      ],
    },
    icon: {
      class: [
        // Font
        'text-base leading-none',

        // Size
        'w-4',
        'h-4',

        // Colors
        'text-green-tertiary',

        // Transitions
        'transition-all',
        'duration-200',
      ],
    },
  },
  itemCheckbox: {
    root: {
      class: [
        'relative',

        // Alignment
        'inline-flex',
        'align-bottom',

        // Size
        'w-6',
        'h-6',

        // Spacing
        'mr-2',

        // Misc
        'cursor-pointer',
        'select-none',
      ],
    },
    box: ({ props, context }) => ({
      class: [
        // Alignment
        'flex',
        'items-center',
        'justify-center',

        // Size
        'w-6',
        'h-6',

        // Shape
        'rounded-md',
        'border-2',

        // Colors
        'border-green-tertiary bg-transparent',

        // States
        {
          'peer-hover:border-green-tertiary':
            !props.disabled && !context.checked,
          'peer-hover:bg-transparent peer-hover:border-green-tertiary':
            !props.disabled && context.checked,
          'peer-focus-visible:border-green-tertiary peer-focus-visible:ring-2 peer-focus-visible:ring-0':
            !props.disabled,
          'cursor-default opacity-60': props.disabled,
        },

        // Transitions
        'transition-colors',
        'duration-200',
      ],
    }),
    input: {
      class: [
        'peer',

        // Size
        'w-full ',
        'h-full',

        // Position
        'absolute',
        'top-0 left-0',
        'z-10',

        // Spacing
        'p-0',
        'm-0',

        // Shape
        'opacity-0',
        'rounded-md',
        'outline-none',
        'border-2 border-green-tertiary',

        // Misc
        'appareance-none',
        'cursor-pointer',
      ],
    },
    icon: {
      class: [
        // Font
        'text-base leading-none',

        // Size
        'w-4',
        'h-4',

        // Colors
        'text-green-tertiary',

        // Transitions
        'transition-all',
        'duration-200',
      ],
    },
  },
  closeButton: {
    class: [
      'relative',

      // Flexbox and Alignment
      'flex items-center justify-center',

      // Size and Spacing
      'mr-2',
      'last:mr-0',
      'w-8 h-8',

      // Shape
      'border-0',
      'rounded-full',

      // Colors
      'text-green-tertiary',
      'bg-transparent',

      // Transitions
      'transition duration-200 ease-in-out',

      // Misc
      'overflow-hidden',
    ],
  },
  closeButtonIcon: {
    class: 'w-4 h-4 inline-block',
  },
  wrapper: {
    class: [
      // Sizing
      'max-h-[200px]',

      // Misc
      'overflow-auto',
    ],
  },
  list: {
    class: 'py-3 list-none m-0',
  },
  item: () => ({
    class: [
      // Font
      'font-normal text-base',
      'leading-none',

      // Flexbox
      'flex items-center',

      // Position
      'relative',

      // Shape
      'border-0',
      'rounded-none',

      // Spacing
      'm-0',
      'py-3 px-5',

      // Color
      'text-green-tertiary bg-transparent',

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
      'p-3 px-5',

      // Color
      'text-green-tertiary',
      'bg-transparent',

      // Misc
      'cursor-auto',
    ],
  },
  filtercontainer: {
    class: 'relative w-full mx-2',
  },
  filterinput: {
    class: [
      // Font
      'font-solina-extended-book',
      'leading-none',

      // Sizing
      'pr-7 py-3 px-3',
      '-mr-7',
      'w-full',

      // Color
      'text-green-tertiary',
      'bg-transparent',
      'border-green-tertiary',
      'placeholder:text-green-tertiary/80',

      // Shape
      'border',
      'rounded-xl',
      'appearance-none',

      // Transitions
      'transition',
      'duration-200',

      // States
      'hover:border-primary-500 dark:hover:border-primary-300',
      'focus:ring focus:outline-none focus:outline-offset-0',
      'focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

      // Misc
      'appearance-none',
    ],
  },
  filtericon: {
    class: ['absolute', 'top-1/2 right-4', '-mt-2'],
  },
  clearicon: {
    class: [
      // Color
      'text-surface-500',

      // Position
      'absolute',
      'top-1/2',
      'right-12',

      // Spacing
      '-mt-2',
    ],
  },
  emptymessage: {
    class: [
      // Font
      'leading-none',

      // Spacing
      'py-3 px-5',

      // Color
      'text-surface-800 dark:text-white/80',
      'bg-transparent',
    ],
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass:
      'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0',
  },
}
