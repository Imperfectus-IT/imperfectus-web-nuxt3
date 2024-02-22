export default {
    panel: {
        class: 'mb-1'
    },
    headercontent: ({ context, instance }) => ({
        class: [
            // Spacing
            'py-1',

            // Color
            'text-green-quaternary text-xl lg:2xl',
            { 'text-green-quaternary': context.active },

            // Transition
            'transition duration-100 ease-in-out',
            'transition-shadow duration-100'
        ]
    }),
    headeraction: {
        class: [
            'relative',

            // Font
            'font-bold',
            'leading-none',

            // Flex & Alignments
            'flex items-center',

            // Spacing
            'p-5',

            // Misc
            'select-none cursor-pointer no-underline'
        ]
    },
    headerlabel: {
        class: 'leading-none text-xl'
    },
    headerIcon: {
        class: 'mr-2'
    },
    submenuicon: {
        class: 'mr-2'
    },
    menucontent: {
        class: [
            // Spacing
            'py-2',

            // Color
            'text-green-quaternary',
        ]
    },
    menu: {
        class: ['outline-none', 'm-0 p-0 list-none']
    },
    menuitem: {
        class: ['pl-2 py-2']
    },
    content: {
        class: [
            // Color
            'text-green-quaternary text-xl lg:2xl',

            // Transition
            'transition-shadow duration-100'
        ]
    },
    action: ({ context }) => ({
        class: [
            'relative',

            // Font
            'leading-none',

            // Flex & Alignments
            'flex items-center',

            // Spacing
            'py-3 px-5',

            // Misc
            'cursor-pointer no-underline',
            'select-none overflow-hidden'
        ]
    }),
    icon: {
        class: 'mr-2'
    },
    submenu: {
        class: 'p-0 pl-4 m-0 list-none'
    },
    transition: {
        enterFromClass: 'max-h-0',
        enterActiveClass: 'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0.42,0,0.58,1)]',
        enterToClass: 'max-h-[1000px]',
        leaveFromClass: 'max-h-[1000px]',
        leaveActiveClass: 'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
        leaveToClass: 'max-h-0'
    }
};
