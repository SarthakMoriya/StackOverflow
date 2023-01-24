import Stripe from 'stripe'
const stripe = new Stripe("sk_test_51MRccSSBHS26neoyD9rRLQaZA0NA9Md2xndOfdTYE71RxTJpi93n2xYN3FopTvXlbb8gaRY0FDibPyesPXysvUid006YWvjw2D")
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

