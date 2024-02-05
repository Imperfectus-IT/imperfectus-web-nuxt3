export default {
  root: ({ props: e }) => ({
    class: [
      "inline-flex relative",
      {
        "opacity-60 select-none pointer-events-none cursor-default": e.disabled,
      },
    ],
  }),
  input: {
    class: ["rounded-xl"],
  },
  panel: {
    class: [
      "p-5 rounded-xl",
      "border-0",
      "shadow-md rounded-md",
      "bg-green-tertiary",
      "text-green-primary",
    ],
  },
  meter: {
    class: [
      "overflow-hidden",
      "relative",
      "border-0 rounded-xl",
      "h-3",
      "mb-2",
      "bg-beige-primary/50",
    ],
  },
  meterlabel: ({ instance: e }) => {
    let r, t, o;
    return {
      class: [
        "h-full",
        {
          "bg-red-primary":
            ((r = e == null ? void 0 : e.meter) == null
              ? void 0
              : r.strength) == "weak",
          "bg-orange-secondary":
            ((t = e == null ? void 0 : e.meter) == null
              ? void 0
              : t.strength) == "medium",
          "bg-green-secondary":
            ((o = e == null ? void 0 : e.meter) == null
              ? void 0
              : o.strength) == "strong",
        },
        "transition-all duration-1000 ease-in-out",
      ],
    };
  },
  showicon: {
    class: ["absolute top-1/2 right-3 -mt-2", "text-green-tertiary"],
  },
  hideicon: {
    class: ["absolute top-1/2 right-3 -mt-2", "text-green-tertiary"],
  },
  transition: {
    enterFromClass: "opacity-0 scale-y-[0.8]",
    enterActiveClass:
      "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
    leaveActiveClass: "transition-opacity duration-100 ease-linear",
    leaveToClass: "opacity-0",
  },
};
