// i believe we're working with the stripe api

// rules of billing
// 1. we are bad at security
    // never accept raw credit card numbers
    // never store credit card numbers
    // always use an outside payment processor
// all good advice.

// 2. Billing is hard
    // possible to avoid monthly payments/multiple plans?
    // fraud and chargebacks are a pain.

// so how do we avoid taking raw cc numbers?
// ah.
// user clicks add credits. we request a form from stripe
// stripe sends back a token representing the charge, we send our token back
// (this stage is just to check in with us before actually charging)
// api confirms that the charge was successful (or not)
// and we go from there

npm install --save react-stripe-checkout

// environment variables!
// pretty cool, can be defined directly in the shell, or in .env files
// these files will be selectively loaded based on names and environments
// all built in to react
.env
.env.local
.env.development, .env.test, .env.production
// not sure how the server checks if it's a prod environment, though

// .env files look like this
REACT_APP_STRIPE_KEY=pk_test_VyMmpLaU8fEJ91OFywiWEMGW
// oh yeah, all .env variables have to start with REACT_APP_

// Ah! server knows environment via a node setting.
// process.env.NODE_ENV

class Payments extends Component {
    render() {
        return(
            <StripeCheckout
            amount={}
            token={token => console.log(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            />
        );
    }
}
// defaults to usd, in cents, so $5
// token is the FUNCTION YOU RUN ON TOKEN RESPONSE
// stripekey is obvious