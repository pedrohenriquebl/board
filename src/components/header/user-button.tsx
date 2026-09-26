"use client"

import { LoaderIcon, LogInIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function UserButton() {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession();

    async function handleSignIn() {
        await authClient.signIn.social({
            provider: 'github',
            callbackURL: "/"
        })
    }

    async function handleSignOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                }
            }
        })
    }

    return (
        <>
            {isPending ? (
                <div className="size-8 rounded-full bg-navy-700 border-navy-500 flex items-center justify-center">
                    <LoaderIcon className="size-3.5 text-navy-200 animate-spin" />
                </div>
            ) : session?.user ? (
                <button
                    onClick={handleSignOut}
                    type="button"
                    className="cursor-pointer size-8 rounded-full overflow-hidden"
                >
                    <Image
                        src={session.user.image ?? ''}
                        alt={session.user.name}
                        width={32}
                        height={32}
                        className="size-8 rounded-full"
                    />
                </button>
            ) : (
                <button
                    onClick={handleSignIn}
                    type="button"
                    className="cursor-pointer size-8 rounded-full bg-navy-700 border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                    <LogInIcon className="size-3.5 text-navy-200" />
                </button>
            )}
        </>
    )
}