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
    <form
      onSubmit={(e) => handleRequest(e, SignOut, router)}
      className="flex flex-row gap-1 items-center"
    >
      <input type="hidden" name="pathName" value={usePathname()} />
      <Button type="submit" hierarchy="tertiary_color" size="sm" icon_only="no">
        <LogOutIcon />
        <span>Abmelden</span>
      </Button>
    </form>
  ) : (
    <Link href="/signin" className="h-full">
      <Button hierarchy="tertiary_color" size="sm" icon_only="no">
        <LogInIcon />
        <span>Anmelden</span>
      </Button>
    </Link>
  );
}
