import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const demoSessionKey = "buildwatch-demo-session";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  /^https:\/\/[^\s/]+\.supabase\.co\/?$/.test(supabaseUrl) &&
  !supabaseUrl.includes("your-project") &&
  !supabaseAnonKey.includes("your-anon-key"),
);

function readDemoSession() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(demoSessionKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeDemoSession(session: Record<string, unknown> | null) {
  if (typeof window === "undefined") return;

  try {
    if (!session) {
      window.localStorage.removeItem(demoSessionKey);
      return;
    }
    window.localStorage.setItem(demoSessionKey, JSON.stringify(session));
  } catch {
    // Ignore localStorage issues in private browsing or locked environments.
  }
}

export function createDemoClient() {
  return {
    auth: {
      async signInWithPassword({ email, password }: { email: string; password: string }) {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password || password.length < 6) {
          return {
            data: { user: null, session: null },
            error: { message: "Invalid Id and Password, Please Try Again!" },
          };
        }

        const user = {
          id: "demo-user",
          email: normalizedEmail,
          user_metadata: {
            full_name: normalizedEmail.split("@")[0] || "Demo User",
          },
        };

        const session = {
          access_token: "demo-access-token",
          refresh_token: "demo-refresh-token",
          user,
        };

        writeDemoSession({ user, session });
        return { data: { user, session }, error: null };
      },

      async signUp({ email, password, options }: { email: string; password: string; options?: { data?: Record<string, unknown> } }) {
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password || password.length < 6) {
          return {
            data: { user: null, session: null },
            error: { message: "Please complete all fields and use a password with at least 6 characters." },
          };
        }

        const user = {
          id: `demo-${Date.now()}`,
          email: normalizedEmail,
          user_metadata: options?.data ?? {},
        };

        writeDemoSession({ user, session: null });
        return { data: { user, session: null }, error: null };
      },

      async signOut() {
        writeDemoSession(null);
        return { error: null };
      },

      async getUser() {
        const session = readDemoSession();
        return {
          data: { user: session?.user ?? null },
          error: null,
        };
      },

      async resetPasswordForEmail() {
        return { data: null, error: null };
      },

      async signInWithOtp() {
        return { data: null, error: null };
      },

      async verifyOtp() {
        return { data: null, error: null };
      },

      async updateUser() {
        return { data: { user: readDemoSession()?.user ?? null }, error: null };
      },
    },
  } as any;
}

export function createClient() {
  if (!isSupabaseConfigured) {
    return createDemoClient();
  }

  return createBrowserClient(
    supabaseUrl || "https://placeholder.supabase.co",
    supabaseAnonKey || "placeholder-anon-key",
  );
}

export function getDemoSession() {
  return readDemoSession();
}
