import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserState } from "context/AuthContext";
import { clearUser } from "@lib/utils/user";
import Layout from "components/Layout";


export default function Logout() {

    const user = useUserState()
    const router = useRouter()

    useEffect(() => {
        if(!user) {
            router.push("/");
        }
        clearUser()
        router.push("/");
    }, [user, router])

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-full max-w-md">
                    <div className="card shadow bg-gray-800 m-2">
                        <div className="card-body">
                            <div className="card-title">Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}