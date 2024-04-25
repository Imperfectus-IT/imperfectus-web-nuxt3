export default {
  root: ({ props, context, parent }) => ({
    class: [
      // Spacing
      "m-0",
      {
        "px-4 py-4": props.size == "large",
        "px-2 py-2": props.size == "small",
        "p-3 h-[45px]": props.size == null,
      },

      // Shape
      {
        "first:rounded-l-lg rounded-none last:rounded-r-lg":
          parent.instance.$name == "InputGroup",
      },
      {
        "border-0 border-y border-l last:border-r":
          parent.instance.$name == "InputGroup",
      },
      {
        "first:ml-0 ml-[-1px]":
          parent.instance.$name == "InputGroup" && !props.showButtons,
      },

      // Colors
      "text-green-tertiary",
      "placeholder:text-green-tertiary placeholder:opacity-50",
      "bg-transparent",
      "border",
      {
        "border-green-tertiary": !props.invalid,
        "border-red-primary": props.invalid,
      },

      // Invalid State
      'invalid:focus:ring-red-primary',
      'invalid:hover:border-red-primary',
      { 'border-red-primary': props.invalid },

      // States
      {
        'hover:border-green-tertiary bg-transparent': !context.disabled && !props.invalid,
        'focus:outline-none focus:outline-offset-0 focus:ring-none focus:bg-transparent focus:z-10': !context.disabled,
        'opacity-60 select-none pointer-events-none cursor-default bg-transparent': context.disabled
      },

      // Misc
      "appearance-none",
      "transition-colors duration-200",
    ],
  }),
};
