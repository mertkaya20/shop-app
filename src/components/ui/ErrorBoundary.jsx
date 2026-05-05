import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <span className="text-red-400 text-2xl">!</span>
            </div>
            <p className="text-zinc-700 font-semibold">Something went wrong</p>
            <p className="text-zinc-400 text-sm mt-1">
              Please refresh the page and try again.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
