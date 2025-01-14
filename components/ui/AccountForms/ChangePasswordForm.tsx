'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function ChangePasswordForm() {
  return (
    <Card
      title="Your Password"
      description="Let's go"
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">You will do what you will do</p>
          <Link href="/signin/update_password">Change Password</Link>
        </div>
      }
    >
      Niente
    </Card>
  );
}
