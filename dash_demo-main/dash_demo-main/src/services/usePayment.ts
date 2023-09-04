import { useAuthContext } from "@/components/AuthContext"
import firebase_app from "@/lib/firebaseClient"
import axios from "axios"
import { subscribe } from "diagnostics_channel"
import { FirebaseApp } from "firebase/app"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { nanoid } from "nanoid"
import { useState } from "react"

interface PaymentData {
  first_name: string
  last_name: string
  email: string
  amount: number
  currency: string
  tx_ref: string
  callback_url: string
  return_url: string
  "customization[title]": string
  "customization[description]": string
}

export interface UserPaymentData {
  first_name: string
  last_name: string
  email: string
  amount: number
  return_url: string
}

interface CheckoutWrapper {
  checkout_url: string
}

export interface ChapaResponse {
  message: string
  status: "success" | "failed"
  data: CheckoutWrapper
}

export const subscriptionPlans: { [key: number]: string }  = {
  0: "Free",
  1000: "Standard",
  2_500: "Gold",
  5_000: "Premium",
  10_000: "Standard Yearly",
  25_000: "Gold Yearly",
  50_000: "Premium Yearly"
}

const usePayment = () => {
  const { user } = useAuthContext();
  const [ isLoading, setLoading ] = useState(false);
  const [ isSuccess, setSuccess ] = useState(false);
  const [ checkoutUrl, setCheckoutUrl ] = useState("");

  const makePayment = async (paymentData: UserPaymentData) => {
    setLoading(true)
    setSuccess(false)
    setCheckoutUrl("")

    const realPaymentData: PaymentData = {
      ...paymentData,
      currency: "ETB",
      tx_ref: "TX-" + nanoid(),
      callback_url: "", // The call backurl here
      "customization[title]": "Beblocky, Inc.",
      "customization[description]": "BeBlocky subscription."
    }

    axios.post("/api/chapa-payment/", realPaymentData)
      .then(async (res) => {
        if (!user) {
          return;
        }

        setSuccess(true);
        setCheckoutUrl(res.data.response.data.checkout_url); 

        // Save the payment in the "UserSubscriptions" collection
        const firestore = getFirestore(firebase_app as FirebaseApp);
        const userSubscriptionsRef = doc(firestore, "UserSubscriptions", user.uid);
        await setDoc(userSubscriptionsRef, {
          uid: user.uid,
          subscription: subscriptionPlans[paymentData.amount],
          tx_ref: realPaymentData.tx_ref,
          email: paymentData.email,
          verified: false,
          expiry_date: subscriptionPlans[paymentData.amount]!.includes("Yearly") ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
      })
      .catch((error: Error) => {})
      .finally(() => {
        console.log('here');
        setLoading(false);
      })
  }

  return { isLoading, isSuccess, checkoutUrl, makePayment }
}

export default usePayment
