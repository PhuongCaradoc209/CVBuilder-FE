import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { InfoResponse } from '@/services/types';
import { IdentificationBadgeIcon } from '@phosphor-icons/react';

interface BasicInfoCardProps {
  user: InfoResponse;
}

export function BasicInfoCard({ user }: BasicInfoCardProps) {
  const dateOnly = user.birthday ? user.birthday.split('T')[0] : '';
  return (
    <Card className='border-none shadow-md'>
      <CardHeader className='flex gap-1.5'>
        <IdentificationBadgeIcon size={26} className='text-primary mt-0.5' />
        <CardTitle className='text-lg font-bold'>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div>
          <p className='text-muted-foreground text-xs font-semibold'>BIRTHDAY</p>
          <p className='font-semibold text-neutral-800'>{dateOnly}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs font-semibold'>GENDER</p>
          <p className='font-semibold text-neutral-800'>{user.gender}</p>
        </div>
      </CardContent>
    </Card>
  );
}
