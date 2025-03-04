'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { Button } from '../button';
import { LogOutIcon, LogInIcon } from 'lucide-react';
interface SignInOutLinkProps {
  user?: User | null;
}

export default function SignInOutLink({ user }: SignInOutLinkProps) {
  const router = useRouter();

  return user ? (
    <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
      <input type="hidden" name="pathName" value={usePathname()} />
      <Button variant="outline" type="submit" className="w-full h-full">
        <span className="sm:sr-only">Abmelden</span>
        <LogOutIcon size={20} />
      </Button>
    </form>
  ) : (
    <Button variant="outline" asChild>
      <Link href="/signin" className="h-full">
        Anmelden
        <LogInIcon size={20} />
      </Link>
    </Button>
  );
}
