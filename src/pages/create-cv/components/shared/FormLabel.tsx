export function FormLabel({ children, className }: { children: string; className?: string }) {
  return <label className={`text-foreground text-sm font-medium ${className}`}>{children}</label>;
}
