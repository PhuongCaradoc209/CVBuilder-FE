import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PasswordIcon, ShieldCheckeredIcon } from '@phosphor-icons/react';

interface SecurityInfo {
  passwordLastChanged: string;
}

interface SecurityCardProps {
  user: SecurityInfo;
}

export function SecurityCard({ user }: SecurityCardProps) {
  return (
    <Card className='border-none p-4 shadow-md'>
      <CardHeader className='space-y-1'>
        <div className='flex items-center gap-2'>
          <ShieldCheckeredIcon size={26} weight='fill' className='text-primary mt-0.5' />
          <CardTitle className='text-lg font-bold'>Password & Security</CardTitle>
        </div>
        <CardDescription className='-mt-2 ml-1'>Last changed {user.passwordLastChanged}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex items-center justify-between gap-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-6'>
          <div className='flex items-center gap-3'>
            <PasswordIcon size={36} weight='fill' className='rounded-md bg-gray-200 p-1.5 text-gray-500' />
            <div>
              <p className='font-bold text-slate-800'>Account Password</p>
              <p className='text-muted-foreground text-sm'>Click to update your current password</p>
            </div>
          </div>

          <Button className='rounded-lg border-slate-200 px-5 font-bold'>Change Password</Button>
        </div>
      </CardContent>
    </Card>
  );
}
