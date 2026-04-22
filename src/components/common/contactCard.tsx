import type { InfoResponse } from '@/services/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { IdentificationCardIcon } from '@phosphor-icons/react';

interface ContactCardProps {
  user: InfoResponse;
}

export function ContactCard({ user }: ContactCardProps) {
  return (
    <Card className='border-none shadow-md'>
      <CardHeader className='flex gap-2'>
        <IdentificationCardIcon size={26} className='text-primary mt-0.5' />

        <CardTitle className='text-lg font-bold'>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div>
          <p className='text-muted-foreground text-xs font-semibold'>PHONE</p>
          <p className='font-semibold text-neutral-800'>{user.phone}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs font-semibold'>EMAIL</p>
          <p className='font-semibold text-neutral-800'>{user.email}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs font-semibold'>WEBSITE</p>
          <p className='text-primary font-semibold'>{user.website || 'Not provided'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
