type EmptyStateProps = {
  title: string;
  body: string;
};

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className="empty-clip" role="status">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

type ErrorBannerProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="wipe" onClick={onRetry}>
          Reload
        </button>
      ) : null}
    </div>
  );
}
