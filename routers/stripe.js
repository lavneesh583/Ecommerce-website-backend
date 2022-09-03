const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.token,
            amount: req.body.amount,
            currency: "usd"
        },
        (stripeErr, StripeRes) => {
            if(stripeErr)
            {
                res.status(500).json(stripeErr);
            }
            else
            {
                res.status(200).json(StripeRes);f
            }
        }
    )
})
