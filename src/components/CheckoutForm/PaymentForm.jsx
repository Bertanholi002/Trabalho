import React from 'react'
import {Typography, Button, Divider} from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

import Review from './Checkout/Review'

const stripePromise = loadStripe (process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken,shippingData, backStep, onCaptureCheckout, nextStep, timeout}) => {
    const handleSubmit = async (event, elements) => {
        event.preventDefault();
     

        console.log(shippingData)

        

    
              timeout();
            nextStep();
          };
    return (
        <div>
            <>
            <Review checkoutToken={checkoutToken}/>
            <Divider />
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Escolha seu pagamento</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) => handleSubmit(e, elements)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined"onClick={backStep}>Voltar</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pagar {checkoutToken.live.subtotal.formatted_with_symbol}
                                    </Button>

                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
            </>
        </div>
    )
}

export default PaymentForm

