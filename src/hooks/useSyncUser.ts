"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useSyncUser() {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.hub.createUser);

  useEffect(() => {
    if (isLoaded && user) {
      createUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName || "",
        imageUrl: user.imageUrl,
      }).catch(err => console.error("Sync user failed:", err));
    }
  }, [isLoaded, user, createUser]);
}
