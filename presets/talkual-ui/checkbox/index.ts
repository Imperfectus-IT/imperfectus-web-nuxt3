export default {
  root: {
    class: [
      "relative",

      // Alignment
      "inline-flex",
      "align-bottom",

      // Size
      "w-6",
      "h-6",

      // Misc
      "cursor-pointer",
      "select-none",
    ],
  },
  box: ({ props, context }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",

      // Size
      "w-6",
      "h-6",

      // Shape
      "border-2",

      // Colors
      {
        "border-green-tertiary bg-transparent": !context.checked,
        "border-green-tertiary bg-green-tertiary": context.checked,
      },

      // States
      {
        "peer-hover:border-green-tertiary": !props.disabled && !context.checked,
        "peer-hover:bg-green-tertiary peer-hover:border-green-tertiary":
          !props.disabled && context.checked,
        "peer-focus-visible:border-green-tertiary peer-focus-visible:ring-2 peer-focus-visible:ring-green-tertiary/20":
          !props.disabled,
        "cursor-default opacity-30": props.disabled,
      },

      // Transitions
      "transition-colors",
      "duration-200",
    ],
  }),
  input: {
    class: [
      "peer",

      // Size
      "w-full ",
      "h-full",

      // Position
      "absolute",
      "top-0 left-0",
      "z-10",

      // Spacing
      "p-0",
      "m-0",

      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border-2 border-green-tertiary",

      // Misc
      "appareance-none",
      "cursor-pointer",
    ],
  },
  icon: {
    class: [
      // Font
      "text-base leading-none",

      // Size
      "w-4",
      "h-4",

      // Colors
      "text-green-primary",

      // Transitions
      "transition-all",
      "duration-200",
    ],
  },
};
