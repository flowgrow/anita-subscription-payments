import Link from 'next/link';

import Logo from './anita.png';

export default function Footer() {
  return (
    <div className="w-full p-xl md:p-3xl">
      <div className="flex flex-col gap-xl items-center justify-end shrink-0 max-w-7xl m-auto relative overflow-hidden">
        <div className="bg-gray-dark-mode-800 rounded-xl shadow-xs py-4xl px-3xl lg:py-7xl lg:px-6xl flex flex-row flex-wrap lg:flex-nowrap gap-5xl lg:gap-2.5 items-start justify-start self-stretch shrink-0 relative overflow-hidden">
          <div className="w-full lg:w-[500px] lg:pr-10xl shrink-0 flex flex-col items-start justify-between self-stretch relative gap-2">
            <img
              className="shrink-0 w-[67px] h-8 relative object-cover"
              src={Logo.src}
            />
            <div className="text-white text-left text-md leading-md relative self-stretch">
              Wir freuen uns jeden Tag eine besser lesbare Welt für euch alle zu
              kreieren. Mit Herz und Hirn in Wien für mehr Accessibility
              entwickelt.
            </div>
          </div>
          <div className="flex flex-col gap-2.5 items-start justify-start flex-1 max-w-[260px] relative">
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <div className="text-utility-brand-500 text-left text-md leading-md font-semibold relative">
                  Anita
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/neuigkeiten"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Neuigkeiten
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/tutorials"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Tutorials
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/changelog"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Changelog
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/support"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Support
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/anita-sans"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Anita Sans
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 items-start justify-start flex-1 max-w-[260px] relative">
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <div className="text-utility-brand-500 text-left text-md leading-md font-semibold relative">
                  Applikation
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="/account"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Kontoeinstellungen
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="/signin"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Anmelden
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="/extension"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Extension
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="/extension"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Download
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="/"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Preise
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 items-start justify-start flex-1 max-w-[260px] relative">
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/informationen"
                  className="text-brand-500 text-left text-md leading-md font-semibold relative"
                >
                  Informationen
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/impressum"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Impressum
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/barrierefreiheit"
                  className="text-white text-left text-md leading-md relative"
                >
                  Barrierefreiheit
                </Link>
              </div>

              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/datenschutz"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Datenschutz
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/agb"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  AGB
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/cookies"
                  className="text-gray-light-mode-200 text-left text-md leading-md relative font-normal"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-text-tertiary-(600) text-left text-xs leading-xs relative">
          <span>
            Anita ist eine Marke von{' '}
            <Link href="https://fabiandraxl.com/" target="_blank">
              Bureau Fabian Draxl.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
