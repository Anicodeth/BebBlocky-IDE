import Head from "next/head";

import TopBar from "@/components/topbar";
import { useAuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import usePayment, { UserPaymentData } from "@/services/usePayment";
import firebase_app from "@/lib/firebaseClient";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import useGetUser from "@/services/useGetUser";
import { verify } from "crypto";
const monthlyPlans = [
    10,
    25,
    50
  ]

  const yearlyPlans = [
    100,
    250,
    500
  ]

export default function UpgradePage() {
    const { user } = useAuthContext();
    const router = useRouter();
    const { data: checkout_url, error, makePayment, isLoading, isSuccess, isPending, isInitialzed, verifyPayment } = usePayment();
    const { userData, isLoading: userDataLoading, error: userDataError, getUserData, requested: userDataReqeusted, hasPaid, txRef, userPackage } = useGetUser(user!);

  const onBuyClick = (price: number) => {
if (user !== null)
  {
    const paymentData: UserPaymentData = {
    first_name: user.displayName?.split(" ")[0] || "First Name",
    last_name: user.displayName?.split(" ")[1] || "Last Name",
      amount: price,
      email: user.email || "email@email.com",
      return_url: "http://localhost:3000" + "/upgrade"
    }
    makePayment(paymentData);
  }
  }

  const onInitialize = () => {
    router.push(checkout_url);
  }

  if (!userDataReqeusted) {
    getUserData();
  }

  if (userDataLoading) return <p>Getting your data...</p> 
  if (isLoading) return <p>Payment is being processed, you'll be redirected to Chapa once we are done...</p>
{ isInitialzed && onInitialize() }
    return (
        <>
      { error && <p>{error}</p> }
            <Head>
                <title>BeBlocky Dashboard</title>
                <meta name="description" content="Welcome to BeBlocky Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="ml-8 grid items-center gap-4 pb-4 pt-2 md:py-5 text-dark-ebony">
                <TopBar name={user?.displayName as string} />
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Best Plans for you</h1>
                    <p>
                        You can Upgrade your membership for additional features.
                    </p>
                </div>
                <Tabs defaultValue="monthly">
                    <TabsList className="grid grid-cols-2 justify-center lg:mx-[400px] text-white bg-apple rounded-3xl">
                        <TabsTrigger className="px-12 rounded-3xl data-[state=active]:text-apple" value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger className="px-12 rounded-3xl data-[state=active]:text-apple" value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="monthly">
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-center mx-5 mt-10 w-fit place-items-center">
                            { monthlyPlans.map(price => <><Card key={price} className={price == 25 ? "bg-gradient-to-b from-apple to-atlantis text-white" : ""}>
                                <CardHeader>
                                    <CardTitle className={price == 25 ? "text-2xl font-bold" : "text-2xl font-bold text-dark-ebony"}>Premium</CardTitle>
                                    <CardDescription>
                                        <p className={ price == 25 ? "text-3xl font-bold mb-4" : "text-3xl font-bold text-dark-ebony"}>
                                            <span className={price == 25 ? "text-5xl text-white" : "text-5xl text-dark-ebony"}>${price}</span><span className={price == 25 ? "text-white" : "text-dark-ebony"}>/Month</span>
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className={price == 25 ? "text-white mx-10 -mt-6" : ""}>You can Upgrade to membership for additional features.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="border-ecstasy text-ecstasy border-2 w-full font-semibold" onClick={() => onBuyClick(price)}>
                                        Try Now
                                    </Button>
                                </CardFooter>
                            </Card></>) }
                                                   </div>
                    </TabsContent>
                    <TabsContent value="yearly">
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-center mx-5 mt-10 w-fit place-items-center">
                            { yearlyPlans.map(price => <><Card key={price} className={price == 250 ? "bg-gradient-to-b from-apple to-atlantis text-white" : ""}>
                                <CardHeader>
                                    <CardTitle className={price == 250 ? "text-2xl font-bold" : "text-2xl font-bold text-dark-ebony"}>Premium</CardTitle>
                                    <CardDescription>
                                        <p className={ price == 250 ? "text-3xl font-bold mb-4" : "text-3xl font-bold text-dark-ebony"}>
                                            <span className={price == 250 ? "text-5xl text-white" : "text-5xl text-dark-ebony"}>${price}</span><span className={price == 250 ? "text-white" : "text-dark-ebony"}>/Month</span>
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className={price == 250 ? "text-white mx-10 -mt-6" : ""}>You can Upgrade to membership for additional features.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="border-ecstasy text-ecstasy border-2 w-full font-semibold" onClick={() => onBuyClick(price)}>
                                        Try Now
                                    </Button>
                                </CardFooter>
                            </Card></>) }                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </>
    );
}
