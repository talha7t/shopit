const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// const dotenv = require("dotenv");
// dotenv.config(); // allows us to have dot env file with our variables

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51IGjKnB61ZghkRKKVZSTxOqo2yWuoWEvs5V9ehR0QjcvV3XEsFeTsOy6dap02Lid3smr15htF7Gv73aPcCN3UKyH00TMf8u97u"
);

// process stripe payments => /api/payment/process

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "pkr",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    client_secret: paymentIntent.client_secret,
  });
});

// Send Stripe Api key => /api/stripeapi

exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
