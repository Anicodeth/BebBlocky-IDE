import Head from "next/head";

import TopBar from "@/components/topbar";
import { useAuthContext } from "@/components/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import usePayment, { UserPaymentData, subscriptionPlans } from "@/services/usePayment";
import { useState } from "react";
import SubscriptionCard from "@/components/subscription-card";
import useUserSubscription from "@/services/useUserSubscription";

export const monthlySubscriptionPlans = {
  1000: subscriptionPlans[1000],
  2500: subscriptionPlans[2500],
  5000: subscriptionPlans[5000]
};

export const yearlySubscriptionPlans = {
  10_000: subscriptionPlans[10_000],
  25_000: subscriptionPlans[25_000],
  50_000: subscriptionPlans[50_000]
};

export default function UpgradePage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { isLoading, isSuccess, checkoutUrl,  makePayment } = usePayment();
  const [ checkedOut, setCheckedOut ] = useState(false);
  const { userData, isLoading: userDataLoading } = useUserSubscription();


  const onBuyClick = (price: string) => {
    if (user == null)
      return
    const paymentData: UserPaymentData = {
      first_name: user.displayName?.split(" ")[0] || "First Name",
      last_name: user.displayName?.split(" ")[1] || "Last Name",
      amount: parseInt(price),
      email: user.email || 'email@email.com',
      return_url: "https://beb-blocky-ide-kxez.vercel.app" + "/upgrade"
    }
    makePayment(paymentData);
  } 

  if (isSuccess && !checkedOut) {
    setCheckedOut(true);
    console.log(checkoutUrl);
    router.push(checkoutUrl);
  }

  if (isLoading) return <p className="text-center text-dark-ebony font-semibold text-2xl">Payment is being processed, you'll be redirected to Chapa once we are done...</p>
  if (userDataLoading) return <p className="text-center text-dark-ebony font-semibold text-2xl">Getting your data...</p>
    return (
        <>
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
                        You can upgrade your subscription plan at any time for additional features.
                    </p>
                </div>
                <Tabs defaultValue="monthly" className="mb-20">
                    <TabsList className="grid grid-cols-2 justify-center lg:mx-[400px] text-white bg-apple rounded-3xl">
                        <TabsTrigger className="px-12 rounded-3xl data-[state=active]:text-apple" value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger className="px-12 rounded-3xl data-[state=active]:text-apple" value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="monthly">
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-center mx-5 mt-10 w-fit place-items-center">
                            {Object.entries(monthlySubscriptionPlans).map(([price, planName]) => <SubscriptionCard onAction={onBuyClick} price={price} isPremium={price === "2500"} name={planName ? planName : ""} isOwened={planName == userData?.subscription} isMonthly={true} isVerified={userData?.verified!} expiry_date={userData?.expiry_date!} /> )}                                                   </div>
                    </TabsContent>
                    <TabsContent value="yearly">
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-center mx-5 mt-10 w-fit place-items-center">
                            {Object.entries(yearlySubscriptionPlans).map(([price, planName]) => <SubscriptionCard onAction={onBuyClick} price={price} isPremium={price === "25000"} name={planName ? planName : ""} isOwened={planName == userData?.subscription} isMonthly={false} isVerified={userData?.verified!} expiry_date={userData?.expiry_date!} /> )}                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </>
    );
}
