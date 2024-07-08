export default {
  root: {
    class: [
      'relative',

      '[&>[data-pc-name=inputicon]]:absolute',
      '[&>[data-pc-name=inputicon]]:top-[45%]',
      '[&>[data-pc-name=inputicon]]:-mt-2',
      '[&>[data-pc-name=inputicon]]:text-green-tertiary/60  ',

      '[&>[data-pc-name=inputicon]:first-child]:left-3',
      '[&>[data-pc-name=inputicon]:last-child]:right-3',

      '[&>[data-pc-name=inputtext]:first-child]:pr-10',
      '[&>[data-pc-name=inputtext]:last-child]:pl-10',
    ],
  },
}
