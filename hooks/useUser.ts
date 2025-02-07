"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserType } from "@/types";

export function useUser() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (status === "authenticated") {
        try {
          const response = await fetch("/api/user");
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUser();
  }, [status]);

  return { user, loading, session };
}
