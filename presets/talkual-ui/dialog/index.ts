export default {
  root: ({ state: e }) => ({
    class: [
      "bg-green-tertiary opacity-95",
      "rounded-lg",
      "border-0",
      "ring-0",
      "max-h-[90vh]",
      "w-[90vw]",
      "m-0",
      "transform",
      "scale-100",
      {
        "transition-none": e.maximized,
        "transform-none": e.maximized,
        "!w-screen": e.maximized,
        "!h-screen": e.maximized,
        "!max-h-full": e.maximized,
        "!top-0": e.maximized,
        "!left-0": e.maximized,
      },
    ],
  }),
  header: {
    class: [
      "flex items-center justify-between",
      "shrink-0",
      "p-6",
      "border-t-0",
      "rounded-tl-lg",
      "rounded-tr-lg",
      "text-green-primary",
    ],
  },
  title: {
    class: ["font-semibold text-base"],
  },
  icons: {
    class: ["flex items-center"],
  },
  closeButton: {
    class: [
      "relative",
      "flex items-center justify-center",
      "mr-2",
      "last:mr-0",
      "w-8 h-8",
      "border-0",
      "rounded-full",
      "text-green-quaternary",
      "bg-transparent",
      "transition duration-200 ease-in-out",
      "hover:text-surface-700 dark:hover:text-white/80",
      "hover:bg-surface-100 dark:hover:bg-surface-800/80",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      "overflow-hidden",
    ],
  },
  maximizablebutton: {
    class: [
      "relative",
      "flex items-center justify-center",
      "mr-2",
      "last:mr-0",
      "w-8 h-8",
      "border-0",
      "rounded-full",
      "text-green-quaternary",
      "bg-transparent",
      "transition duration-200 ease-in-out",
      "focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset",
      "focus:ring-primary-400/50 dark:focus:ring-primary-300/50",
      "overflow-hidden",
    ],
  },
  closeButtonIcon: {
    class: ["inline-block", "w-4", "h-4"],
  },
  maximizableicon: {
    class: ["inline-block", "w-4", "h-4"],
  },
  content: ({ state: e, instance: r }) => ({
    class: [
      "px-6",
      "pb-8",
      "pt-0",
      {
        grow: e.maximized,
        "rounded-bl-lg": !r.$slots.footer,
        "rounded-br-lg": !r.$slots.footer,
      },
      "text-green-quaternary",
      "tex-xs font-light leading-7",
      "overflow-y-auto",
    ],
  }),
  footer: {
    class: [
      "flex items-center justify-center",
      "shrink-0",
      "text-right",
      "gap-2",
      "px-6",
      "pb-7",
    ],
  },
  mask: ({ props: e }) => ({
    class: [
      "transition-all",
      "duration-200",
      { "p-5": !e.position == "full" },
      {
        "has-[.mask-active]:bg-transparent bg-black/40": e.modal,
        "has-[.mask-active]:backdrop-blur-none backdrop-blur-sm": e.modal,
      },
    ],
  }),
  transition: ({ props: e }) =>
    e.position === "top"
      ? {
          enterFromClass:
            "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0 mask-active",
          enterActiveClass: "transition-all duration-100 ease-out",
          leaveActiveClass: "transition-all duration-100 ease-out",
          leaveToClass:
            "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0 mask-active",
        }
      : e.position === "bottom"
        ? {
            enterFromClass: "opacity-0 scale-75 translate-y-full mask-active",
            enterActiveClass: "transition-all duration-100 ease-out",
            leaveActiveClass: "transition-all duration-100 ease-out",
            leaveToClass:
              "opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0 mask-active",
          }
        : e.position === "left" ||
            e.position === "topleft" ||
            e.position === "bottomleft"
          ? {
              enterFromClass:
                "opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0 mask-active",
              enterActiveClass: "transition-all duration-100 ease-out",
              leaveActiveClass: "transition-all duration-100 ease-out",
              leaveToClass:
                "opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0 mask-active",
            }
          : e.position === "right" ||
              e.position === "topright" ||
              e.position === "bottomright"
            ? {
                enterFromClass:
                  "opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0 mask-active",
                enterActiveClass: "transition-all duration-100 ease-out",
                leaveActiveClass: "transition-all duration-100 ease-out",
                leaveToClass:
                  "opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0 mask-active",
              }
            : {
                enterFromClass: "opacity-0 scale-75 mask-active",
                enterActiveClass: "transition-all duration-100 ease-out",
                leaveActiveClass: "transition-all duration-100 ease-out",
                leaveToClass: "opacity-0 scale-75 mask-active",
              },
};
