type OAuthButtonProps = {
  label: string;
};

export function OAuthButton({ label }: OAuthButtonProps) {
  return (
    <button
      className="flex h-12 w-full items-center justify-center rounded-sm border border-border bg-white px-5 text-sm font-extrabold text-foreground transition hover:border-primary hover:text-primary"
      type="button"
    >
      {label}
    </button>
  );
}
