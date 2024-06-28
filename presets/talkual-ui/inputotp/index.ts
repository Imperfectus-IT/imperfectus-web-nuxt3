export default {
  root: {
    class: [
      // Alignment
      'flex items-center justify-center',
      'gap-7',
    ],
  },
  input: {
    root: ({ props, context, parent }) => ({
      class: [
        // Font
        'font-recoleta-extended-book leading-none',

        // Flex & Alignment
        { 'flex-1 w-[1%]': parent.instance.$name == 'InputGroup' },
        'text-center',

        // Spacing
        'm-0',
        {
          'p-3': props.size == null,
        },

        // Size
        'w-10',
        'h-10',

        // Shape
        { 'rounded-md': parent.instance.$name !== 'InputGroup' },
        { 'first:rounded-l-md rounded-none last:rounded-r-md': parent.instance.$name == 'InputGroup' },
        { 'border-0 border-y border-l last:border-r': parent.instance.$name == 'InputGroup' },
        { 'first:ml-0 ml-[-1px]': parent.instance.$name == 'InputGroup' && !props.showButtons },

        // Colors
        'text-green-tertiary',
        'placeholder:text-green-tertiary',
        'bg-transparent',
        'border',
        { 'border-green-secondary': !props.invalid },

        // Invalid State
        'invalid:focus:ring-red-primary',
        'invalid:hover:border-red-primary',
        { 'border-red-primary': props.invalid },

        // States
        {
          'hover:border-green-tertiary': !context.disabled && !props.invalid,
          'focus:outline-none focus:outline-offset-0 focus:ring-none focus:z-10': !context.disabled,
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled,
        },

        // Filled State *for FloatLabel
        { filled: parent.instance?.$name == 'FloatLabel' && context.filled },

        // Misc
        'appearance-none',
        'transition-colors duration-200',
      ],
    }),
  },
}
