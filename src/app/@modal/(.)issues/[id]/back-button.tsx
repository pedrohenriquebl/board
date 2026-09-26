"use client"

import { MoveLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            type="button"
            className="flex items-center gap-2 cursor-pointer to-navy-200 hover:to-navy-100"
        >
            <MoveLeftIcon className="size-4" />
            <span className="text-xs">Back to board</span>
        </button>
    )
}