import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface Props {
  price: string
  isPremium: boolean
  name: string
  onAction: (price: string) => void
  isOwened: boolean
  isMonthly: boolean
  isVerified: boolean
}
const SubscriptionCard = ({ price, isPremium, name, onAction, isOwened, isMonthly, isVerified }: Props) => {
  return <Card
    key={price}
    className={`${isPremium ? "bg-gradient-to-b from-apple to-atlantis text-white" : ""} ${isOwened ? "bg-blue-300": ""}`}
  >
    <CardHeader>
      <CardTitle className={isPremium ? "text-2xl font-bold" : "text-2xl font-bold text-dark-ebony"}>
       { `${name} ${ isOwened ? "(Your Plan)" : "" }` }
      </CardTitle>
      <CardDescription>
        <p className={isPremium ? "text-3xl font-bold mb-4" : "text-3xl font-bold text-dark-ebony"}>
          <span className={isPremium ? "text-white pe-2" : "text-dark-ebony pe-2"}>ETB</span>
          <span className={isPremium ? "text-5xl text-white" : "text-5xl text-dark-ebony"}>
            { price.slice(0, -3) + "," + price.slice(-3) }
          </span>
          <span className={isPremium ? "text-white" : "text-dark-ebony"}>{ isMonthly ? "/Month" : "/Year" }</span>
        </p>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className={isPremium ? "text-white mx-10 -mt-6" : ""}>
        You can Upgrade to membership for additional features.
      </p>
    </CardContent>
    <CardFooter>
      <Button
        variant="outline"
        className="border-ecstasy text-ecstasy border-2 w-full font-semibold"
        onClick={() => onAction(price)}
        disabled={isOwened && isVerified}
      >
        { isOwened && isVerified ? "Enjoy your plan!" : isOwened ? "Pay now!" : "Buy Now!" }
      </Button>
    </CardFooter>
  </Card>
}

export default SubscriptionCard
