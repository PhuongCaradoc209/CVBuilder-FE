import { cn } from '@/lib/utils';
import { forwardRef, useEffect, useRef } from 'react';

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
}

export const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ className, value, onChange, maxHeight = 500, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const resizeTextarea = () => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;

        // Handle scroll visibility
        if (textarea.scrollHeight > maxHeight) {
          textarea.style.overflowY = 'auto';
        } else {
          textarea.style.overflowY = 'hidden';
        }
      }
    };

    useEffect(() => {
      resizeTextarea();
    }, [value]);

    return (
      <textarea
        {...props}
        value={value}
        onChange={(e) => {
          resizeTextarea();
          onChange?.(e);
        }}
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          'resize-none overflow-hidden transition-[height] duration-100',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
          className
        )}
      />
    );
  },
);

AutoResizeTextarea.displayName = 'AutoResizeTextarea';
