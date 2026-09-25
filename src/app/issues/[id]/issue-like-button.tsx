"use client"

import { useQuery } from "@tanstack/react-query";
import LikeButton from "@/components/like-button";
import { Skeleton } from "@/components/skeleton";
import { getIssueInteractions } from "@/http/get-issue-interaction";

interface IssueLikeButtonProps {
    issueId: string
}

export default function IssueLikeButton({ issueId }: IssueLikeButtonProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['issue-likes', issueId],
        queryFn: () => getIssueInteractions({ issueIds: [issueId] }),
    })

    if (isLoading) {
        return (
            <Skeleton className="h-7 w-16" />
        )
    }

    const interactions = data?.interactions[0]

    return (
        <LikeButton
            issueId={issueId}
            initialLikes={interactions?.likesCount ?? 0}
            initialLiked={interactions?.isLiked ?? false}
        />
    )
}