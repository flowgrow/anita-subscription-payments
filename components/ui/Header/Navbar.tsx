'use client';

import { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import SignInOutLink from './SignInOutLink';
import Logo from './Logo_mit_Blur.png';
import { User } from '@supabase/supabase-js';
import { Button } from '../button';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full p-4 sm:p-8 relative z-10">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="m-auto bg-bg-primary p-8 pl-spacing-10 rounded-xl border-solid border-border-tertiary border flex flex-row items-center justify-between w-[100%] shrink-0 h-20 max-w-7xl relative shadow-xs">
        <Link href="/" className="shrink-0 h-8 relative">
          <Image className="w-[80px]" src={Logo} alt="Logo" />
        </Link>
        <div className="md:flex hidden flex-row gap-1 items-stretch justify-end shrink-0 relative">
          <Button variant="default" asChild>
            <Link href="/extension">Browser-Extension</Link>
          </Button>
          <Button variant="outline" asChild>
            {user && <Link href="/account">Dashboard</Link>}
          </Button>
          <SignInOutLink user={user} />
        </div>
        <button
          className="md:hidden appearance-none border-none bg-transparent cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <motion.path
              d="M3 7.5H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              variants={{
                open: { rotate: 45, y: 4.5 },
                closed: { rotate: 0, y: 0 }
              }}
              transition={{ duration: 0.2 }}
              animate={open ? 'open' : 'closed'}
            />
            <motion.path
              d="M3 16.5H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              variants={{
                open: { rotate: -45, y: -4.5 },
                closed: { rotate: 0, y: 0 }
              }}
              transition={{ duration: 0.2 }}
              animate={open ? 'open' : 'closed'}
            />
          </svg>
        </button>
        <AnimatePresence>
          <motion.div
            className="-z-10 m-auto bg-bg-primary p-8 gap-4 rounded-xl border-solid border-border-tertiary border flex flex-col items-stretch justify-between w-[100%] shrink-0 max-w-7xl absolute top-[105%] left-0 shadow-lg"
            transition={{ duration: 0.2 }}
            variants={{
              open: { display: 'flex', opacity: 1, y: 0 },
              closed: { display: 'none', opacity: 0, y: -20 }
            }}
            initial="closed"
            animate={open ? 'open' : 'closed'}
            onClick={() => setOpen(false)}
          >
            <Button variant="default" asChild>
              <Link href="/extension">Browser-Extension</Link>
            </Button>
            <Button variant="outline" asChild>
              {user && <Link href="/account">Dashboard</Link>}
            </Button>
            <SignInOutLink user={user} />
          </motion.div>
        </AnimatePresence>
      </div>
    </nav>
  );
}
