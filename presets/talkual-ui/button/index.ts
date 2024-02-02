export default {
  root: ({ props, context }) => ({
    class: [
      "relative",

      // Alignments
      "items-center inline-flex text-center align-bottom justify-center",

      // Sizes & Spacing
      "leading-[normal]",
      {
        "px-4 py-3 min-h-[42px]": props.size === null && props.label !== null,
        "text-sm py-2 px-3": props.size === "small",
        "text-xl py-3 px-4": props.size === "large",
      },
      {
        "w-12 p-0 py-3": props.label == null,
      },

      // Shapes
      "shadow-none drop-shadow-none border border-green-tertiary ring-0 focus:ring-0 focus:visible:ring-0",
      { "rounded-lg": !props.rounded, "rounded-full": props.rounded },

      // Link Button
      { "bg-transparent border-none": props.link },

      // Primary Button
      {
        "bg-green-primary hover:bg-green-tertiary hover:text-green-primary focus:bg-green-tertiary focus:text-green-primary":
          !props.link &&
          props.severity === null &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Secondary Button
      {
        "bg-green-tertiary text-green-primary hover:bg-green-primary hover:text-green-tertiary focus:bg-green-tertiary focus:text-green-primary":
          props.severity === "secondary" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },

      // Outlined Button
      {
        "hover:bg-green-tertiary hover:text-white focus:bg-green-tertiary focus:text-green-primary":
          props.outlined && !props.plain,
      },

      // Raised Button
      { "border-none": props.raised },

      // Success Button
      {
        "bg-orange-primary hover:bg-green-tertiary hover:text-orange-primary":
          props.severity === "success" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Warning Button
      {
        "bg-orange-secondary hover:bg-green-tertiary hover:text-orange-secondary":
          props.severity === "warning" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },

      // Disabled
      { "opacity-60 pointer-events-none cursor-default": context.disabled },
    ],
  }),
  label: ({ props }) => ({
    class: [
      "duration-200",
      "text-base font-light",
      {
        "hover:underline": props.link,
      },
      { "flex-1": props.label !== null, "invisible w-0": props.label == null },
    ],
  }),
  icon: ({ props }) => ({
    class: [
      "mx-0",

      {
        "mr-2": props.iconPos == "left" && props.label != null,
        "ml-2 order-1": props.iconPos == "right" && props.label != null,
        "mb-2": props.iconPos == "top" && props.label != null,
        "mt-2": props.iconPos == "bottom" && props.label != null,
      },
    ],
  }),
  loadingicon: ({ props }) => ({
    class: [
      "h-4 w-4",
      "mx-0",
      {
        "mr-2": props.iconPos == "left" && props.label != null,
        "ml-2 order-1": props.iconPos == "right" && props.label != null,
        "mb-2": props.iconPos == "top" && props.label != null,
        "mt-2": props.iconPos == "bottom" && props.label != null,
      },
      "animate-spin",
    ],
  }),
  badge: ({ props }) => ({
    class: [
      {
        "ml-2 w-4 h-4 leading-none flex items-center justify-center":
          props.badge,
      },
    ],
  }),
};
