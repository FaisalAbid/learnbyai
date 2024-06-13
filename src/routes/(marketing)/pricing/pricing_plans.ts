export const defaultPlanId = "free"

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "A free plan to get you started!",
    price: "$0",
    priceIntervalName: "per month",
    stripe_price_id: null,
    features: ["MIT Licence", "Fast Performance", "Stripe Integration"],
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "With a ",
    price: "$100",
    priceIntervalName: "per month",
    stripe_price_id: "price_1PR13lGtXYeoRWVlPdiYpmq3",
    stripe_product_id: "prod_QHaERTNN2hQWBu",
    features: [
      "100 articles"
    ],
  }
]