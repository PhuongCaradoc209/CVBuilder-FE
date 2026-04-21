'use client';

import { format, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface AppDatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
}

export function AppDatePicker({ value, onChange, placeholder = 'Pick a date', className }: AppDatePickerProps) {
  // Convert ISO string to Date object for the Calendar component
  const date = React.useMemo(() => {
    if (!value) return undefined;
    try {
      return typeof value === 'string' ? parseISO(value) : value;
    } catch (e) {
      console.error('Invalid date value:', value);
      return undefined;
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'border-border bg-muted text-foreground hover:bg-muted/70 h-12 w-full justify-start rounded-xl border px-4 font-normal shadow-none transition-colors',
            !date && 'text-muted-foreground',
            className,
          )}>
          <CalendarIcon className='mr-2 h-4 w-4 opacity-70' />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='border-border bg-popover w-auto rounded-xl p-0 shadow-lg' align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onChange(selectedDate.toISOString());
            } else {
              onChange('');
            }
          }}
          initialFocus
          className='rounded-xl'
        />
      </PopoverContent>
    </Popover>
  );
}
