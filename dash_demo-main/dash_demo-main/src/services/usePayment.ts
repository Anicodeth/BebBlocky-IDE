import { useAuthContext } from "@/components/AuthContext"
import firebase_app from "@/lib/firebaseClient"
import axios from "axios"
import { FirebaseApp } from "firebase/app"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
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

const plans = {
  0: "Free",
  10: "Standard",
  25: "Gold",
  50: "Premium",
  100: "StandardYearly",
  250: "GoldYearly",
  5000: "PremiumYearly"
}

function usePayment() {
  const { user } = useAuthContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<string>("/");
  const [isInitialzed, setInitialized] = useState<boolean>(false);
  const [isPending, setPending] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [txRef, setTxRef] = useState<string>("");

  const db = getFirestore(firebase_app as FirebaseApp);

  if (user !== null) {
    const userRef = doc(db, 'users', user?.uid);

    getDoc(userRef).then((res) => {
      if (res.exists()) {
        const userData = res.data();
        setTxRef(userData.pendingPayment.tx_ref);
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }

  const makePayment = async (userPaymentData: UserPaymentData) => {
    setPending(true);
    const tx_ref = `TX-${nanoid().toUpperCase()}`;

    const paymentData: PaymentData = {
      ...userPaymentData,
      currency: "USD",
      tx_ref: tx_ref,
      callback_url: `https://localhost:3000/api/verify/`,
      "customization[title]": "BeBlocky, Inc.",
      "customization[description]": "You and upto one child can use this subscription."
    }

    setLoading(true);

    await axios.post<ChapaResponse>('/api/chapa-payment', paymentData)
      .then(async (res: any) => {
        setLoading(false);
        console.log(res.data);
        setData(res.data.response.data.checkout_url);
        setInitialized(true);

        const db = getFirestore(firebase_app as FirebaseApp);
        console.log('here');
        await setDoc(doc(db, 'chapa-payments', paymentData.tx_ref), {
          id: user?.uid,
          amount: paymentData.amount,
          ref: paymentData.tx_ref,
          email: paymentData.email,
          name: `${paymentData.first_name} ${paymentData.last_name}`,
          verified: false,
        });

        if (user != null) {
          const userRef = doc(db, "users", user.uid);
          await setDoc(userRef, {
            pendingPaymentAmount: paymentData.amount,
            pendingPaymentRef: paymentData.tx_ref,
            userPackage: paymentData.amount
          });
        }
      })
      .catch((error: Error) => {
        console.log(error);
        setLoading(false);
        setInitialized(false);
        setError(error.message);
      })
  }

  const verifyPayment = async (userTxRef: string) => {
    if (user === null) return;

    setLoading(true);
    axios.get(`/api/verify/${userTxRef}`)
      .then(async (_) => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((error: Error) => {
        setLoading(false);
        setError(error.message);
      })
  }

  return {
    makePayment,
    isLoading,
    error,
    data,
    isInitialzed,
    isSuccess,
    isPending,
    verifyPayment,
    txRef,
  }
}

export default usePayment
