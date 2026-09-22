import type { Hook } from "@hono/zod-openapi"

// biome-ignore lint/suspicious/noExplicitAny: shared across apps with different env types
export const validationHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        error: "Validation failed",
        message: result.error.issues.map((i) => i.message).join(", "),
      },
      400,
    )
  }
}
