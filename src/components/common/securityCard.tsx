import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PasswordIcon, ShieldCheckeredIcon } from '@phosphor-icons/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import InputField from './inputField';
import { useState } from 'react';
import { toast } from 'sonner';
import { userService } from '@/services/user.service';
import { useMutation } from '@tanstack/react-query';
export function SecurityCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const changePassword = useMutation({
    mutationFn: (data: any) => userService.changeUserPassword(data),
    onSuccess: () => {
      toast.success('Password updated successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update password.');
    },
  });

  const handleChangePassword = () => {
    // Validate form data
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirm password do not match!');
      return;
    }
    changePassword.mutate({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <Card className='border-none p-4 shadow-md'>
      <CardHeader className='space-y-1'>
        <div className='flex items-center gap-2'>
          <ShieldCheckeredIcon size={26} weight='fill' className='text-primary mt-0.5' />
          <CardTitle className='text-lg font-bold'>Password & Security</CardTitle>
        </div>
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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Nút để mở Dialog */}
            <DialogTrigger asChild>
              <Button className='rounded-lg border-slate-200 px-5 font-bold'>Change Password</Button>
            </DialogTrigger>

            {/* Nội dung bên trong Dialog */}
            <DialogContent className='pb-0'>
              <DialogHeader>
                <DialogTitle className='text-xl font-bold text-orange-400'>Update Password</DialogTitle>
                <DialogDescription>Change your password here. Click save when done.</DialogDescription>
              </DialogHeader>
              <div className='flex flex-col gap-4'>
                <InputField
                  id='oldPassword'
                  label='Current Password'
                  placeholder='Enter your current password'
                  type='password'
                  className='rounded-lg focus:ring-orange-400'
                  onChange={(e: any) => setFormData({ ...formData, currentPassword: e.target.value })}
                />
                <InputField
                  id='newPassword'
                  label='New Password'
                  placeholder='Enter your new password'
                  type='password'
                  className='rounded-lg focus:ring-orange-400'
                  onChange={(e: any) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <InputField
                  id='confirmPassword'
                  label='Confirm New Password'
                  placeholder='Confirm your new password'
                  type='password'
                  className='rounded-lg focus:ring-orange-400'
                  onChange={(e: any) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
              <div className='sticky bottom-0 z-1 flex w-full justify-center bg-[#f8fafe] py-4'>
                <Button
                  onClick={handleChangePassword}
                  type='button'
                  variant='outline'
                  className='w-fit border-orange-500 bg-orange-50 font-semibold text-orange-400 hover:bg-orange-200'>
                  Update
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
