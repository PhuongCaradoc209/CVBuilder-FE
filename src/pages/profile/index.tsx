import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/common/profileCard';
import { ContactCard } from '@/components/common/contactCard';
import { BasicInfoCard } from '@/components/common/basicInfoCard';
import { SecurityCard } from '@/components/common/securityCard';
import { SignOutIcon, Spinner } from '@phosphor-icons/react';
import { EditIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ProfileUpdateForm } from './components/ProfileUpdateForm';

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userService.getProfile,
    select: (data: any) => data?.user,
  });

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    toast.success('Logged out successfully!');
    window.location.href = '/login';
  };

  // 5. GIAO DIỆN (RENDER)
  return (
    <div>
      {isLoading ? (
        <div className='flex min-h-[50vh] items-center justify-center'>
          <Spinner className='animate-spin' size={48} color='#F5824A' />
        </div>
      ) : (
        <div className='space-y-8 px-6 pt-6 pb-6'>
          <div>
            <h1 className='text-4xl font-bold'>Profile & Settings</h1>
            <p className='text-muted-foreground'>Manage your professional presence and account security</p>
          </div>

          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-4'>
              <ProfileCard user={data} />
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='text-md mt-4 w-full border-none bg-white p-6 font-semibold text-blue-500 shadow-md hover:bg-blue-50 hover:text-blue-600'>
                    <EditIcon size={36} />
                    Update Profile
                  </Button>
                </DialogTrigger>

                <DialogContent className='max-h-[90vh] overflow-y-auto overscroll-none pb-0 sm:max-w-5xl'>
                  <DialogHeader>
                    <DialogTitle className='text-xl font-bold text-orange-400'>Update Profile</DialogTitle>
                    <DialogDescription>Change your personal information here. Click save when done.</DialogDescription>
                  </DialogHeader>

                  <ProfileUpdateForm data={data} onSuccess={() => setIsOpen(false)} />
                </DialogContent>
              </Dialog>

              <Button
                variant='outline'
                onClick={handleLogout}
                className='text-md mt-4 w-full border-none bg-white p-6 font-semibold text-red-700 shadow-md hover:bg-red-50 hover:text-red-800'>
                <SignOutIcon size={36} />
                Logout
              </Button>
            </div>

            {/* CÁC COMPONENT BÊN PHẢI */}
            <div className='col-span-8 space-y-6'>
              <div className='grid grid-cols-2 gap-6'>
                <ContactCard user={data} />
                <BasicInfoCard user={data} />
              </div>
              <SecurityCard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
