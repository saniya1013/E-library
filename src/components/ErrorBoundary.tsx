import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let message = "Something went wrong.";
      try {
        const firestoreError = JSON.parse(this.state.error?.message || "");
        if (firestoreError.error && firestoreError.error.includes("insufficient permissions")) {
          message = "You don't have permission to perform this action. Please check your account settings.";
        }
      } catch (e) {
        // Not a firestore error or invalid JSON
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-paper">
          <div className="max-w-md w-full p-8 rounded-2xl bg-white border border-black/5 shadow-xl text-center flex flex-col gap-6">
            <div className="text-4xl font-serif font-medium text-red-500">Oops!</div>
            <p className="text-ink/60 leading-relaxed">{message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-accent transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
