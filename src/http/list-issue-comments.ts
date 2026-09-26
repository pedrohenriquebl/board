import { cacheLife, cacheTag } from "next/cache";
import { CommentsListResponseSchema } from "@/api/routes/list-issue-comments";
import { clientEnv } from "@/env";

interface ListIssuesCommentsParams {
  issueId: string;
}

export async function listIssueComments({ issueId }: ListIssuesCommentsParams) {
  "use cache";

  cacheLife("minutes");
  cacheTag(`issue-comments-${issueId}`);

  const url = new URL(
    `/api/issues/${issueId}/comments`,
    clientEnv.NEXT_PUBLIC_API_URL,
  );

  const response = await fetch(url);
  const data = await response.json();

  return CommentsListResponseSchema.parse(data);
}
