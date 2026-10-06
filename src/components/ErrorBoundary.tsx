import { Component, type ReactNode, type ErrorInfo } from "react";
import { toast } from "sonner";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("YMA ErrorBoundary:", error, errorInfo.componentStack);
    toast.error("A rendering error occurred. Please try reloading.", {
      duration: 5000,
    });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-amber-400">!</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Something Went Wrong</h1>
            <p className="text-slate-400 mb-2">
              {this.state.error?.message || "An unexpected error occurred while rendering this page."}
            </p>
            <p className="text-slate-500 text-sm mb-6">
              Our team has been notified. Please try reloading the page.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-900/30"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}