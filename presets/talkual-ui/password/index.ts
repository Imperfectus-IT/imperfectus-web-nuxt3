export default {
  root: ({ props }) => ({
    class: [
      "inline-flex relative",
      {
        "opacity-60 select-none pointer-events-none cursor-default": props.disabled
      },
      { "[&>input]:pr-10": props.toggleMask }
    ]
  }),
  panel: {
    class: [
      // Spacing
      "p-5",

      // Shape
      "border-0",
      "shadow-md rounded-md",

      // Colors
      "bg-green-tertiary",
      "text-green-primary"
    ]
  },
  meter: {
    class: [
      // Position and Overflow
      "overflow-hidden",
      "relative",

      // Shape and Size
      "border-0",
      "h-3",

      // Spacing
      "mb-2",

      // Colors
      "beige-primary/50"
    ]
  },
  meterlabel: ({ instance }) => ({
    class: [
      // Size
      "h-full",

      // Colors
      {
        "bg-red-primary": instance?.meter?.strength == "weak",
        "bg-orange-secondary": instance?.meter?.strength == "medium",
        "bg-green-secondary": instance?.meter?.strength == "strong"
      },

      // Transitions
      "transition-all duration-1000 ease-in-out"
    ]
  }),
  showicon: {
    class: ["absolute top-1/2 right-3 -mt-2 z-10", "text-green-tertiary"]
  },
  hideicon: {
    class: ["absolute top-1/2 right-3 -mt-2 z-10", "green-tertiary"]
  },
  input: {
    root: ({ props, context, parent }) => ({
      class: [
        // Font
        "font-recoleta leading-none rounded-xl",

        // Flex
        { "flex-1 w-[1%]": parent.instance.$name == "InputGroup" },

        // Spacing
        "m-0",
        {
          "px-4 py-4": props.size == "large",
          "px-2 py-2": props.size == "small",
          "p-3": props.size == null
        },
        "w-full",

        // Shape
        { "rounded-md": parent.instance.$name !== "InputGroup" },
        { "first:rounded-l-md rounded-none last:rounded-r-md": parent.instance.$name == "InputGroup" },
        { "border-0 border-y border-l last:border-r": parent.instance.$name == "InputGroup" },
        { "first:ml-0 -ml-px": parent.instance.$name == "InputGroup" && !props.showButtons },

        // Colors
        "text-green-tertiary",
        "placeholder:text-green-tertiary/50",
        "bg-transparent",
        "border",
        { "border-green-tertiary": !parent.props.invalid },

        // Invalid State
        { "border-red-primary": parent.props.invalid },

        // States
        {
          "hover:border-primary-500 dark:hover:border-primary-400": !context.disabled && !parent.props.invalid,
          "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50 focus:z-10": !context.disabled,
          "opacity-60 select-none pointer-events-none cursor-default": context.disabled
        },

        // Misc
        "appearance-none",
        "transition-colors duration-200"
      ]
    })
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0"
  }
};