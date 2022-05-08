const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// process stripe payments => /api/payment/process

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: req.body.amount,
    curreny: "pkr",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    client_Secret: paymentIntent.client_Secret,
  });
});
