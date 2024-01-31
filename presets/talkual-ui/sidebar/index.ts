export default {
  root: ({ props }) => ({
    class: [
      // Flexbox
      "flex flex-col",

      // Position
      "relative",
      {
        "!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0":
          props.position == "full",
      },

      // Size
      {
        "h-full w-full lg:w-2/4":
          props.position == "left" || props.position == "right",
        "h-auto w-full": props.position == "top" || props.position == "bottom",
      },

      // Shape
      "border-0",
      "shadow-lg",

      // Colors
      "bg-green-tertiary",
      "text-green-quaternary",

      // Transitions
      "transition-transform",
      "duration-300",

      // Misc
      "pointer-events-auto",
    ],
  }),
  header: {
    class: [
      // Flexbox and Alignment
      "flex items-center justify-between lg:justify-end",
      "shrink-0",

      // Spacing
      "px-[30px] lg:px-24 py-5 lg:pt-8",

      // Colors
      "bg-green-tertiary",
      "text-green-quaternary",
    ],
  },
  title: {
    class: ["font-bold text-lg"],
  },
  icons: {
    class: ["flex items-center"],
  },
  closeButton: {
    class: [
      "relative",

      // Flexbox and Alignment
      "flex items-center justify-center lg:justify-end",

      // Size and Spacing
      "w-8 h-8",

      // Shape
      "border-0",

      // Colors
      "text-green-quaternary",
      "bg-transparent",

      // Transitions
      "transition duration-200 ease-in-out",

      // Misc
      "overflow-hidden",
    ],
  },
  closeButtonIcon: {
    class: [
      // Display
      "inline-block",

      // Size
      "text-2xl",
    ],
  },
  content: {
    class: [
      // Spacing and Size
      "p-8 lg:p-24",
      "pt-0",
      "h-full",
      "w-full",
      "text-[1.625rem] lg:text-[2.125rem]",

      // Growth and Overflow
      "grow",
      "overflow-y-auto",
    ],
  },
  mask: ({ props }) => ({
    class: [
      // Transitions
      "transition-all",
      "duration-300",
      { "p-5": !props.position == "full" },

      // Background and Effects
      {
        "has-[.mask-active]:bg-transparent bg-black/40": props.modal,
        "has-[.mask-active]:backdrop-blur-none backdrop-blur-sm": props.modal,
      },
    ],
  }),
  transition: ({ props }) => {
    return props.position === "top"
      ? {
          enterFromClass:
            "translate-x-0 -translate-y-full translate-z-0 mask-active",
          leaveToClass:
            "translate-x-0 -translate-y-full translate-z-0 mask-active",
        }
      : props.position === "bottom"
        ? {
            enterFromClass:
              "translate-x-0 translate-y-full translate-z-0 mask-active",
            leaveToClass:
              "translate-x-0 translate-y-full translate-z-0 mask-active",
          }
        : props.position === "left"
          ? {
              enterFromClass:
                "-translate-x-full translate-y-0 translate-z-0 mask-active",
              leaveToClass:
                "-translate-x-full translate-y-0 translate-z-0 mask-active",
            }
          : props.position === "right"
            ? {
                enterFromClass:
                  "translate-x-full translate-y-0 translate-z-0 mask-active",
                leaveToClass:
                  "translate-x-full translate-y-0 translate-z-0 mask-active",
              }
            : {
                enterFromClass: "opacity-0 mask-active",
                enterActiveClass: "transition-opacity duration-400 ease-in",
                leaveActiveClass: "transition-opacity duration-400 ease-in",
                leaveToClass: "opacity-0 mask-active",
              };
  },
};
