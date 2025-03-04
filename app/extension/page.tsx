import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default async function Extension() {
  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold  sm:text-center sm:text-6xl">
            Browser-Extension
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-muted-foreground sm:text-center sm:text-2xl">
            Lade unsere Browser-Extension herunter und erstelle dein
            Anita-Konto.
          </p>
        </div>
      </div>
      <div className="flex flex-col py-2 sm:py-12 px-4 sm:px-16 gap-8 w-full max-w-3xl m-auto sm:bg-white rounded-lg sm:shadow-lg">
        <p>
          Während der Beta Phase sind wir noch nicht fertig mit der Entwicklung
          der Browser-Extension und deshalb nicht in den offiziellen
          Browser-Stores zu finden.
        </p>
        <p>
          Du kannst die Browser-Extension aber trotzdem hier herunterladen und
          installieren.
        </p>

        <Link href="/Anita-Beta.zip" download target="_blank">
          <div className="bg-bg-primary hover:bg-[#fcfcfc] flex flex-row items-center justify-between rounded-xl border-solid border-border-secondary border p-xl relative overflow-hidden">
            <div className="flex flex-row gap-lg items-center justify-center right-12 left-4 top-4">
              <div className="shrink-0 w-10 h-10 relative">
                <svg
                  width="32"
                  height="40"
                  viewBox="0 0 32 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H20L32 12V36C32 38.2091 30.2091 40 28 40H4C1.79086 40 0 38.2091 0 36V4Z"
                    fill="#dedede"
                  />
                  <path
                    opacity="0.3"
                    d="M20 0L32 12H24C21.7909 12 20 10.2091 20 8V0Z"
                    fill="white"
                  />
                </svg>

                <div className="text-fg-white text-center text-[9px] font-bold absolute right-[10%] left-[10%] w-[80%] bottom-[15%] top-[57.5%] h-[27.5%]">
                  ZIP
                </div>
              </div>
              <div className="flex flex-col gap-xs items-start justify-start flex-1 relative">
                <div className="flex flex-col gap-0 items-start justify-start self-stretch shrink-0 relative">
                  <div className="text-text-secondary-(700) text-left font-text-sm-medium-font-family text-text-sm-medium-font-size leading-text-sm-medium-line-height font-text-sm-medium-font-weight relative self-stretch overflow-hidden">
                    Anita-Beta.zip
                  </div>
                  <div className="text-text-tertiary-(600) text-left font-text-sm-regular-font-family text-text-sm-regular-font-size leading-text-sm-regular-line-height font-text-sm-regular-font-weight relative self-stretch overflow-hidden">
                    2,4 MB
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-0 items-center justify-center">
              <Button variant="outline" className="pointer-events-none">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.66665 18.9493C3.25966 18.0075 2.33331 16.4036 2.33331 14.5833C2.33331 11.8492 4.42341 9.60317 7.09301 9.35593C7.6391 6.03415 10.5236 3.5 14 3.5C17.4764 3.5 20.3609 6.03415 20.9069 9.35593C23.5766 9.60317 25.6666 11.8492 25.6666 14.5833C25.6666 16.4036 24.7403 18.0075 23.3333 18.9493M9.33331 19.8333L14 24.5M14 24.5L18.6666 19.8333M14 24.5V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </Link>

        <p>
          Nachdem du die Datei heruntergeladen hast, kannst du sie in einen
          Ordner deiner Wahl entpacken. Als nächstes öffne Chrome um die
          Browser-Extension zu installieren.
        </p>

        <ol className="max-w-md space-y-1 text-gray-500 text-left list-decimal leading-md flex flex-col align-start gap-2 pl-4 w-[90%] ">
          <li className=" text-gray-900">
            Öffne die Extension-Seite in Chrome:{' '}
            <code className="bg-bg-secondary-solid inline-block font-mono text-sm leading-sm px-2 py-1 text-white rounded-md">
              chrome://extensions
            </code>
          </li>
          <li className=" text-gray-900">
            Aktiviere den{' '}
            <code className="bg-bg-secondary-solid inline-block font-mono text-sm leading-sm px-2 py-1 text-white rounded-md">
              Entwicklermodus
            </code>
          </li>
          <li className=" text-gray-900">
            Klicke auf{' '}
            <code className="bg-bg-secondary-solid inline-block font-mono text-sm leading-sm px-2 py-1 text-white rounded-md">
              Entpackte Erweiterung laden
            </code>
          </li>
          <li className=" text-gray-900">
            Wähle den Ordner aus, in dem du die Datei entpackt hast und
            installiere Anita.
          </li>
        </ol>

        <Image
          className="m-auto rounded-lg shadow-lg"
          src="/install-extension.jpg"
          alt="Anita Extension"
          width={800}
          height={557}
        />
      </div>
    </section>
  );
}
