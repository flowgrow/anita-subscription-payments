import Link from 'next/link';

import Logo from './anita.png';

export default function Footer() {
  return (
    <div className="w-full p-xl md:p-3xl">
      <div className="flex flex-col gap-xl items-center justify-end shrink-0 max-w-7xl m-auto relative overflow-hidden">
        <div
          className="bg-gray-dark-mode-800 rounded-xl py-4xl px-3xl md:py-7xl md:px-6xl flex flex-col md:flex-row gap-5xl md:gap-2.5 items-start justify-start self-stretch shrink-0 relative overflow-hidden"
          style={{
            boxShadow: `var(
          --shadows-shadow-xs-box-shadow,
          0px 1px 2px 0px rgba(16, 24, 40, 0.05)
        )`
          }}
        >
          <div className="pr-10xl flex flex-col items-start justify-between self-stretch flex-1 relative gap-2">
            <img
              className="shrink-0 w-[67px] h-8 relative object-cover"
              src={Logo.src}
            />
            <div className="text-white text-left text-sm leading-sm relative self-stretch">
              Wir freuen uns jeden Tag eine besser lesbare Welt für euch alle zu
              kreieren. Mit Herz und Hirn in Wien für mehr Accessibility
              entwickelt.
            </div>
          </div>
          <div className="flex flex-col gap-2.5 items-start justify-start flex-1 max-w-[260px] relative">
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <div className="text-utility-brand-500 text-left text-sm leading-sm font-semibold relative">
                  Anita
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/neuigkeiten"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  Neuigkeiten
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/tutorials"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  Tutorials
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="/"
                  className="text-white text-left text-sm leading-sm relative"
                >
                  Preise
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/changelog"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  Changelog
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/support"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  Support
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/anita-sans"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  Anita Sans
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 items-start justify-start flex-1 max-w-[260px] relative">
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/informationen"
                  className="text-brand-500 text-left text-sm leading-sm font-semibold relative"
                >
                  Informationen
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-start justify-start self-stretch shrink-0 relative">
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/impressum"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  Impressum
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/barrierefreiheit"
                  className="text-white text-left text-sm leading-sm relative"
                >
                  Barrierefreiheit
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/datenschutz"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  Informationen
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/datenschutz"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  Datenschutz
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/agb"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
                >
                  AGB
                </Link>
              </div>
              <div className="flex flex-row gap-sm items-center justify-center shrink-0 relative overflow-hidden">
                <Link
                  href="https://anita.vision/cookies"
                  className="text-gray-light-mode-200 text-left text-sm leading-sm relative"
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
