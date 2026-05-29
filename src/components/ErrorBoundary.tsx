import { Component, ReactNode } from "react";

interface State { error: Error | null }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: unknown) {
    // eslint-disable-next-line no-console
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", display: "grid", placeItems: "center", padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Something broke loading the app.</h1>
            <p style={{ opacity: 0.75, marginBottom: 16 }}>
              If you're deploying this site outside Lovable (Vercel / Bolt / Netlify), make sure these
              environment variables are set in the deployment dashboard, then redeploy:
            </p>
            <pre style={{ textAlign: "left", background: "#161616", padding: 16, borderRadius: 8, fontSize: 12, overflowX: "auto" }}>
VITE_SUPABASE_URL=...{"\n"}
VITE_SUPABASE_PUBLISHABLE_KEY=...{"\n"}
VITE_SUPABASE_PROJECT_ID=...
            </pre>
            <p style={{ marginTop: 16, fontSize: 12, opacity: 0.6 }}>{String(this.state.error.message)}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}