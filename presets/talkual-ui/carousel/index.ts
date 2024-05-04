export default {
  root: {
    class: [
      // Flexbox
      'flex flex-col',
    ],
  },
  content: {
    class: [
      // Flexbox & Overflow
      'flex flex-col overflow-auto',
    ],
  },
  container: ({ props }) => ({
    class: [
      // Flexbox
      'flex',

      // Orientation
      {
        'flex-row': props.orientation !== 'vertical',
        'flex-col': props.orientation == 'vertical',
      },
    ],
  }),
  previousbutton: {
    class: [
      // Flexbox & Alignment
      'flex justify-center items-center self-center',

      // Sizing & Overflow
      'overflow-hidden w-[30px] h-[25px]',

      // Spacing
      'mx-2',

      // Shape
      'rounded-full',

      // Border & Background
      'border-0 bg-green-tertiary',

      // Color
      'text-green-primary',

      // Transitions
      'transition duration-200 ease-in-out',
    ],
  },
  nextbutton: {
    class: [
      // Flexbox & Alignment
      'flex justify-center items-center self-center',

      // Sizing & Overflow
      'overflow-hidden w-[30px] h-[25px]',

      // Spacing
      'mx-2',

      // Shape
      'rounded-full',

      // Border & Background
      'border-0 bg-green-tertiary',

      // Color
      'text-green-primary',

      // Transitions
      'transition duration-200 ease-in-out',
    ],
  },
  itemscontent: {
    class: [
      // Overflow & Width
      'overflow-hidden w-full',
    ],
  },
  itemscontainer: ({ props }) => ({
    class: [
      // Flexbox
      'flex',

      // Orientation & Sizing
      {
        'flex-row': props.orientation !== 'vertical',
        'flex-col h-full': props.orientation == 'vertical',
      },
    ],
  }),
  item: () => ({
    class: [
      // Flexbox
      'flex shrink-0 grow gap-3',

      // Width
      'w-full h-full',
    ],
  }),
  indicators: {
    class: [
      // Position
      ' inset-x-0 bottom-8 relative',
      // Flexbox & Alignment
      'flex flex-row justify-center flex-wrap',
    ],
  },
  indicator: {
    class: [
      // Spacing
      'mr-2 mb-2',
    ],
  },
  indicatorbutton: ({ context }) => ({
    class: [
      // Sizing & Shape
      'w-2.5 h-2.5 rounded-full',

      // Transitions
      'transition duration-200',

      // Focus Styles
      'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-green-primary ',

      // Color & Background
      {
        'bg-white hover:white': !context.highlighted,
        'bg-green-primary hover:bg-green-primary': context.highlighted,
      },
    ],
  }),
}
