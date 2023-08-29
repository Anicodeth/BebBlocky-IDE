import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import nookies from "nookies";
import { getFirestore, getDoc, collection, getDocs, doc } from "firebase/firestore";
import TopBar from "@/components/topbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import admin from "@/lib/firebaseAdmin";
import firebase_app from "@/lib/firebaseClient";
import type { Student, User } from "@/lib/shape";
import { useAuthContext } from "@/components/AuthContext";
import ChildrenGrid from "@/components/children-grid";
import PerformanceCards from "@/components/performance-cards";

interface Props {
    _is_parent?: boolean;
    credit?: string;
    students?: Student[];
}

export default function ProgressPage({ _is_parent, credit, students }: Props) {
    const { user } = useAuthContext();
    return (
        <>
            <Head>
                <title>BeBlocky Dashboard</title>
                <meta name="description" content="Welcome to BeBlocky Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-5 mb-5 lg:container grid items-center gap-4">
                <TopBar name={user?.displayName as string} />
                <Tabs defaultValue="child">
                    <TabsList className="grid grid-cols-2 justify-center lg:mx-[300px] text-white bg-apple rounded-3xl mb-5">
                        <TabsTrigger className="px-10 rounded-3xl font-bold data-[state=active]:text-apple" value="child">Child</TabsTrigger>
                        <TabsTrigger className="px-10 rounded-3xl font-bold data-[state=active]:text-apple" value="children">Children</TabsTrigger>
                    </TabsList>
                    <TabsContent value="child"><ChildrenGrid students={students || []} children={undefined} /></TabsContent>
                    <TabsContent value="children"><PerformanceCards students={students} credit={credit} /></TabsContent>
                </Tabs>
            </div >
        </>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const cookies = nookies.get(ctx);
        const token = await admin.auth().verifyIdToken(cookies.token || "");

        if (!token) {
            return {
                redirect: {
                    destination: "/register",
                    permanent: false,
                },
            };
        }
        const { uid } = token;
        const db = firebase_app ? getFirestore(firebase_app) : undefined;
        if (db) {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const user = userSnap.data() as User;
                if (user.role === "parent") {
                    const studentsRef = collection(db, "School", uid, "Classes", "Class A", "Students");
                    const studentsSnap = await getDocs(studentsRef);
                    const students = studentsSnap.docs.map((doc:any) =>
                        ({ ...doc.data() } as Student)
                    );
                    return {
                        props: {
                            students,
                            credit: user.credit || "0",
                            is_parent: true,
                        },
                    };
                }
            }
        }
    } catch (error) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the register page
        ctx.res.writeHead(302, { Location: '/register' });
        ctx.res.end();

        // `as never` prevents inference issues
        // with InferGetServerSidePropsType.
        // The props returned here don't matter because we've
        // already redirected the user.
        return { props: {} as never };
    }
}