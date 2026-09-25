"use client"

import { useQuery } from "@tanstack/react-query"
import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from "lucide-react"
import { useMemo } from "react"
import type z from "zod"
import type { IssuesListResponseSchema } from "@/api/routes/list-issues"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import LikeButton from "@/components/like-button"
import { Section } from "@/components/sections"
import { getIssueInteractions } from "@/http/get-issue-interaction"

interface BoardContentProps {
    issues: z.infer<typeof IssuesListResponseSchema>
}

export function BoardContent({ issues }: BoardContentProps) {
    const allIssuesIds = [
        ...issues.backlog.map((issue) => issue.id),
        ...issues.todo.map((issue) => issue.id),
        ...issues.in_progress.map((issue) => issue.id),
        ...issues.done.map((issue) => issue.id),
    ]

    const { data: interacationsData, isLoading: isLoadingInteractions } = useQuery({
        queryKey: ['issue-likes', allIssuesIds.sort().join(',')],
        queryFn: () => getIssueInteractions({ issueIds: allIssuesIds }),
    })

    const interactions = useMemo(() => {
        if (!interacationsData) {
            return new Map<string, { likesCount: number; isLiked: boolean }>()
        }

        return new Map<string, { likesCount: number; isLiked: boolean }>(interacationsData.interactions.map(interaction => [
            interaction.issueId, {
                likesCount: interaction.likesCount,
                isLiked: interaction.isLiked
            }
        ]))

    }, [interacationsData])

    return (
        <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
            <Section.Root>
                {/* Header */}
                <Section.Header>
                    <Section.Title>
                        <ArchiveIcon className="size-3" />
                        Backlog
                    </Section.Title>

                    <Section.IssueCount>{issues.backlog.length}</Section.IssueCount>
                </Section.Header>
                <Section.Content>
                    {issues.backlog.length === 0 ? (
                        <div className="flex items-center justify-center py-8 text-center">
                            <p className="text-sm text-navy-300">
                                No issues matching your filters
                            </p>
                        </div>
                    ) : (
                        issues.backlog.map((issue) => {
                            const interaction = interactions.get(issue.id)

                            return (
                                <Card.Root key={issue.id} href={`/issues/${issue.id}`}>
                                    <Card.Header>
                                        <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                                        <Card.Title>{issue.title}</Card.Title>
                                    </Card.Header>
                                    <Card.Footer>
                                        <LikeButton
                                            issueId={issue.id}
                                            initialLikes={interaction?.likesCount ?? 0}
                                            initialLiked={interaction?.isLiked ?? false}
                                        />
                                        <Button>
                                            <MessageCircleIcon className="size-3" />
                                            <span className="text-sm">{issue.comments}</span>
                                        </Button>
                                    </Card.Footer>
                                </Card.Root>
                            )
                        })
                    )}
                </Section.Content>
            </Section.Root>

            <Section.Root>
                {/* Header */}
                <Section.Header>
                    <Section.Title>
                        <ArchiveIcon className="size-3" />
                        To-do
                    </Section.Title>

                    <Section.IssueCount>{issues.todo.length}</Section.IssueCount>
                </Section.Header>
                <Section.Content>
                    {issues.todo.length === 0 ? (
                        <div className="flex items-center justify-center py-8 text-center">
                            <p className="text-sm text-navy-300">
                                No issues matching your filters
                            </p>
                        </div>
                    ) : (
                        issues.todo.map((issue) => {
                            const interaction = interactions.get(issue.id)

                            return (
                                <Card.Root key={issue.id} href={`/issues/${issue.id}`}>
                                    <Card.Header>
                                        <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                                        <Card.Title>{issue.title}</Card.Title>
                                    </Card.Header>
                                    <Card.Footer>
                                        <LikeButton
                                            issueId={issue.id}
                                            initialLikes={interaction?.likesCount ?? 0}
                                            initialLiked={interaction?.isLiked ?? false}
                                        />
                                        <Button>
                                            <MessageCircleIcon className="size-3" />
                                            <span className="text-sm">{issue.comments}</span>
                                        </Button>
                                    </Card.Footer>
                                </Card.Root>
                            )

                        })
                    )}
                </Section.Content>
            </Section.Root>

            <Section.Root>
                {/* Header */}
                <Section.Header>
                    <Section.Title>
                        <ArchiveIcon className="size-3" />
                        In Progress
                    </Section.Title>

                    <Section.IssueCount>{issues.in_progress.length}</Section.IssueCount>
                </Section.Header>
                <Section.Content>
                    {issues.in_progress.length === 0 ? (
                        <div className="flex items-center justify-center py-8 text-center">
                            <p className="text-sm text-navy-300">
                                No issues matching your filters
                            </p>
                        </div>
                    ) : (
                        issues.in_progress.map((issue) => {
                            const interaction = interactions.get(issue.id)

                            return (
                                <Card.Root key={issue.id} href={`/issues/${issue.id}`}>
                                    <Card.Header>
                                        <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                                        <Card.Title>{issue.title}</Card.Title>
                                    </Card.Header>
                                    <Card.Footer>
                                        <LikeButton
                                            issueId={issue.id}
                                            initialLikes={interaction?.likesCount ?? 0}
                                            initialLiked={interaction?.isLiked ?? false}
                                        />
                                        <Button>
                                            <MessageCircleIcon className="size-3" />
                                            <span className="text-sm">{issue.comments}</span>
                                        </Button>
                                    </Card.Footer>
                                </Card.Root>
                            )
                        })
                    )}
                </Section.Content>
            </Section.Root>

            <Section.Root>
                {/* Header */}
                <Section.Header>
                    <Section.Title>
                        <ArchiveIcon className="size-3" />
                        Done
                    </Section.Title>

                    <Section.IssueCount>{issues.done.length}</Section.IssueCount>
                </Section.Header>
                <Section.Content>
                    {issues.done.length === 0 ? (
                        <div className="flex items-center justify-center py-8 text-center">
                            <p className="text-sm text-navy-300">
                                No issues matching your filters
                            </p>
                        </div>
                    ) : (
                        issues.done.map((issue) => {
                            const interaction = interactions.get(issue.id)

                            return (
                                <Card.Root key={issue.id} href={`/issues/${issue.id}`}>
                                    <Card.Header>
                                        <Card.Number>ISS-{issue.issueNumber}</Card.Number>
                                        <Card.Title>{issue.title}</Card.Title>
                                    </Card.Header>
                                    <Card.Footer>
                                        <LikeButton
                                            issueId={issue.id}
                                            initialLikes={interaction?.likesCount ?? 0}
                                            initialLiked={interaction?.isLiked ?? false}
                                        />
                                        <Button>
                                            <MessageCircleIcon className="size-3" />
                                            <span className="text-sm">{issue.comments}</span>
                                        </Button>
                                    </Card.Footer>
                                </Card.Root>
                            )
                        })
                    )}
                </Section.Content>
            </Section.Root>
        </main>
    )
}