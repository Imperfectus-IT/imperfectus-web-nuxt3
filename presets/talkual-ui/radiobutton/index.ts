export default {
    root: {
        class: [
            'relative',

            // Flexbox & Alignment
            'inline-flex',
            'align-bottom',

            // Size
            'w-[1rem] h-[1rem]',

            // Misc
            'cursor-pointer',
            'select-none'
        ]
    },
    box: ({ props }) => ({
        class: [
            // Flexbox
            'flex justify-center items-center',

            // Size
            'w-[1rem] h-[1rem]',

            // Shape
            'border',
            'rounded-full',

            // Transition
            'transition duration-200 ease-in-out',

            // Colors
            {
                'text-green-tertiary': props.value !== props.modelValue && props.value !== undefined,
                'bg-none': props.value !== props.modelValue && props.value !== undefined,
                'border-green-tertiary': props.value !== props.modelValue || props.value == props.modelValue && props.value !== undefined && !props.invalid,
                'bg-transparent': props.value == props.modelValue && props.value !== undefined
            },
            // Invalid State
            { 'border-red-primary': props.invalid },

            // States
            {
                'peer-hover:border-green-tertiary': !props.disabled && !props.invalid,
                'peer-hover:border-green-tertiary-emphasis peer-hover:bg-green-tertiary-emphasis': !props.disabled && props.value == props.modelValue && props.value !== undefined,
                'peer-focus-visible:border-green-tertiary peer-focus-visible:ring-2 peer-focus-visible:ring-none': !props.disabled,
                'opacity-60 cursor-default': props.disabled
            }
        ]
    }),
    input: {
        class: [
            'peer',

            // Size
            'w-full ',
            'h-full',

            // Position
            'absolute',
            'top-0 left-0',
            'z-10',

            // Spacing
            'p-0',
            'm-0',

            // Shape
            'opacity-0',
            'rounded-md',
            'outline-none',
            'border border-green-tertiary',

            // Misc
            'appearance-none',
            'cursor-pointer'
        ]
    },
    icon: ({ props }) => ({
        class: [
            'block',

            // Shape
            'rounded-full',

            // Size
            'w-[0.4375rem] h-[0.4375rem]',

            // Colors
            'bg-green-primary',

            // Conditions
            {
                'backface-hidden scale-10 invisible': props.value !== props.modelValue,
                'transform visible scale-[1.1]': props.value == props.modelValue
            },

            // Transition
            'transition duration-200'
        ]
    })
};
