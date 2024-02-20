export default {
  root: ({ props }) => ({
    class: [
      "relative",

      // Flex & Alignment
      "flex items-center",
      "gap-2",

      // Misc
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ],
  }),
  cancelitem: ({ context }) => ({
    class: [
      // Flex & Alignment
      "inline-flex items-center",

      //State
      {
        "outline-none ring ring-green-tertiary": context.focused,
      },

      // Misc
      "cursor-pointer",
    ],
  }),
  cancelicon: {
    class: [
      // Size
      "w-5 h-5",

      // Color
      "text-red-primary",

      // State
      "hover:text-red-primary",

      // Transition
      "transition duration-200 ease-in",
    ],
  },
  item: ({ props, context }) => ({
    class: [
      // Flex & Alignment
      "inline-flex items-center",

      // State
      {
        "outline-none ring-none": context.focused,
      },

      // Misc
      {
        "cursor-pointer": !props.readonly,
        "cursor-default": props.readonly,
      },
    ],
  }),
  officon: ({ props }) => ({
    class: [
      // Size
      "w-5 h-5",

      // Color
      "text-green-tertiary",

      // State
      { "hover:text-green-tertiary": !props.readonly },

      // Transition
      "transition duration-200 ease-in",
    ],
  }),
  onicon: ({ props }) => ({
    class: [
      // Size
      "w-5 h-5",

      // Color
      "text-yellow-primary",

      // State
      { "hover:text-yellow-primary": !props.readonly },

      // Transition
      "transition duration-200 ease-in",
    ],
  }),
};
