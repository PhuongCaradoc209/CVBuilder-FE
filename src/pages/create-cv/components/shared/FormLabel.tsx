export function FormLabel({ children, className }: { children: string; className?: string }) {
  return (
    <label className={`text-foreground group-data-[invalid=true]/field:text-destructive text-sm font-medium ${className}`}>
      {children}
    </label>
  );
}
