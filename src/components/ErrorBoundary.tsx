import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

/**
 * Catches render errors in child trees so the whole app does not go blank.
 * Keep copy minimal here — i18n may not be available if the failure is upstream.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          role="alert"
          className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center gap-4 px-6 py-16 text-center font-sans text-dk-ink"
        >
          <h1 className="font-serif text-2xl font-bold text-dk-green-900">Something went wrong</h1>
          <p className="text-sm text-dk-ink-2">
            {this.state.error.message || 'An unexpected error occurred. You can try reloading the page.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="rounded-xl bg-dk-green-800 px-5 py-2.5 text-sm font-semibold text-white shadow-dk-sm transition hover:brightness-110"
              onClick={this.handleRetry}
            >
              Try again
            </button>
            <button
              type="button"
              className="rounded-xl border border-dk-line bg-white px-5 py-2.5 text-sm font-semibold text-dk-ink transition hover:border-dk-green-700"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
