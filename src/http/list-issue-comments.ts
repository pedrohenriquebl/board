import { setTimeout } from "node:timers/promises";
import { CommentsListResponseSchema } from "@/api/routes/list-issue-comments";
import { clientEnv } from "@/env";

interface ListIssuesCommentsParams {
  issueId: string;
}

export async function listIssueComments({ issueId }: ListIssuesCommentsParams) {
  const url = new URL(
    `/api/issues/${issueId}/comments`,
    clientEnv.NEXT_PUBLIC_API_URL,
  );

  await setTimeout(1000);

  const response = await fetch(url);
  const data = await response.json();

  return CommentsListResponseSchema.parse(data);
}
