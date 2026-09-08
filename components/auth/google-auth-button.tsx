type GoogleAuthButtonProps = {
  label: string;
};

export function GoogleAuthButton({ label }: GoogleAuthButtonProps) {
  return (
    <button
      className="flex h-12 w-full items-center justify-center gap-3 rounded-sm border border-border bg-white px-5 text-sm font-extrabold text-foreground transition hover:border-primary hover:text-primary"
      type="button"
    >
      <span className="grid size-6 place-items-center rounded-full border border-border text-xs font-extrabold text-primary">
        G
      </span>
      <span>{label}</span>
    </button>
  );
}
