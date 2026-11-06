import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db("hireloop-db");


export const auth = betterAuth({
     
  database: mongodbAdapter(db, {
    client,
  }),
    emailAndPassword: { 
    enabled: true, 
  }, 
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "seeker",
        allowedValues: ["seeker", "recruiter", "admin"],
      },
    },
  },
  socialProviders: {
        google: { // [!code highlight]
            clientId: process.env.GOOGLE_CLIENT_ID as string, // [!code highlight]
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // [!code highlight]
        }, // [!code highlight]
    },
});