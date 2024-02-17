export const useRedirectPaths = () => {
  const localePath = useLocalePath();

  const redirectPaths = {
    ADMIN: localePath("admin"),
    ORDER: localePath("order"),
    GIFT_CARD_PAYMENT: localePath("gift-card-gift-card-payment"),
  };

  return { redirectPaths };
};
