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

export default function UpgradePage() {
    const { user } = useAuthContext();
    const router = useRouter();

    async function onUpgrade() {
        const response = await fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user?.email,
                name: user?.displayName,
                id: user?.uid,
                amount: 1000,
            }),
        });
        const url = await response.json().then((data) => data.response.data.checkout_url);
        router.push(url);
    }
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
                        You can Upgrade to membership for additional features.
                    </p>
                </div>
                <Tabs defaultValue="monthly">
                    <TabsList className="grid grid-cols-2 justify-center lg:mx-[400px] text-white bg-apple rounded-3xl">
                        <TabsTrigger className="px-12 rounded-3xl data-[state=active]:text-apple" value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger className="px-12 rounded-3xl data-[state=active]:text-apple" value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="monthly">
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-center mx-5 mt-10 w-fit place-items-center">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-dark-ebony">Basic</CardTitle>
                                    <CardDescription>
                                        <p className="text-3xl font-bold mb-4">
                                            <span className="text-5xl text-dark-ebony">$10</span><span className="text-dark-ebony">/Month</span>
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-dark-ebony mx-10 -mt-6">You can Upgrade to membership for additional features.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="border-ecstasy text-ecstasy border-2 w-full font-semibold" onClick={onUpgrade}>
                                        Try Now
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card className="bg-gradient-to-b from-apple to-atlantis text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Premium</CardTitle>
                                    <CardDescription>
                                        <p className="text-3xl font-bold mb-4">
                                            <span className="text-5xl text-white">$50</span><span className="text-white">/Month</span>
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white mx-10 -mt-6">You can Upgrade to membership for additional features.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="border-ecstasy text-ecstasy border-2 w-full font-semibold">
                                        Try Now
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-dark-ebony">Standard</CardTitle>
                                    <CardDescription>
                                        <p className="text-3xl font-bold mb-4">
                                            <span className="text-5xl text-dark-ebony">$25</span><span className="text-dark-ebony">/Month</span>
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-dark-ebony mx-10 -mt-6">You can Upgrade to membership for additional features.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="border-ecstasy text-ecstasy border-2 w-full font-semibold">
                                        Try Now
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="yearly">
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-center mx-5 mt-10 w-fit place-items-center">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-dark-ebony">Basic</CardTitle>
                                    <CardDescription>
                                        <p className="text-3xl font-bold mb-4">
                                            <span className="text-5xl text-dark-ebony">$100</span><span className="text-dark-ebony">/Year</span>
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-dark-ebony mx-10 -mt-6">You can Upgrade to membership for additional features.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="border-ecstasy text-ecstasy border-2 w-full font-semibold">
                                        Try Now
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card className="bg-gradient-to-b from-apple to-atlantis text-white">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Premium</CardTitle>
                                    <CardDescription>
                                        <p className="text-3xl font-bold mb-4">
                                            <span className="text-5xl text-white">$500</span><span className="text-white">/Year</span>
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white mx-10 -mt-6">You can Upgrade to membership for additional features.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="border-ecstasy text-ecstasy border-2 w-full font-semibold">
                                        Try Now
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-dark-ebony">Standard</CardTitle>
                                    <CardDescription>
                                        <p className="text-3xl font-bold mb-4">
                                            <span className="text-5xl text-dark-ebony">$250</span><span className="text-dark-ebony">/Year</span>
                                        </p>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-dark-ebony mx-10 -mt-6">You can Upgrade to membership for additional features.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="border-ecstasy text-ecstasy border-2 w-full font-semibold">
                                        Try Now
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
        </>
    );
}