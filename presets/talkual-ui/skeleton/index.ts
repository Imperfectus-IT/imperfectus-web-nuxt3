export default {
    root: ({ props }) => ({
        class: [
            'overflow-hidden',
            {
                'animate-pulse': props.animation !== 'none'
            },

            // Round
            { 'rounded-full': props.shape === 'circle', 'rounded-lg': props.shape !== 'circle' },

            // Colors
            'bg-gray-primary'
        ]
    })
};
