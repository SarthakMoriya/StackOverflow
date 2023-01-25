import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export const handlePayment = async (req, res) => {
    let { amount, id } = req.body;

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "INR",
            description: "!0 wala pack",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)

        res.status(200).json({
            message: "Payment Successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
}

