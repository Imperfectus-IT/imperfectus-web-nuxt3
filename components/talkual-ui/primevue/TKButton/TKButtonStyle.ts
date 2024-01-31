export default {
  root: ({ props }) => ({
    class: [
      "relative",

      // Alignments
      "items-center inline-flex text-center align-bottom justify-center",

      // Sizes & Spacing
      "leading-[normal]",
      {
        "px-4 py-3": props.size === null && props.label !== null,
        "text-sm py-2 px-3": props.size === "small",
        "text-xl py-3 px-4": props.size === "large",
      },
      {
        "w-12 p-0 py-3": props.label === null,
      },

      // Link Button
      { "text-green-primary bg-transparent border-transparent": props.link },

      // Primary Button
      {
        "text-white":
          !props.link &&
          props.severity === null &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        "bg-green-primary":
          !props.severity && !props.text && !props.outlined && !props.plain,
        "border-none":
          props.severity === null &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      // Primary Text Button
      {
        "text-primary-500 dark:text-primary-400":
          props.text && props.severity === null && !props.plain,
      },
    ],
  }),
};
