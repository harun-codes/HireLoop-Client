import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,

    /**
     * Mirrors `user.additionalFields` from lib/auth.ts so the client's
     * types (and runtime behavior) know about the custom `role` field.
     */
    plugins: [
        inferAdditionalFields({
            user: {
                role: {
                    type: "string",
                    required: false,
                    defaultValue: "seeker",
                },
            },
        }),
    ],
})

export const { signIn, signUp, useSession } = createAuthClient()
