import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

export default function Layout({ children, type }) {
  if (type === "home") {
    return (
      <>
        <Head>
          <title>Royalust</title>

          <meta name="description" content="Video for all" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-screen bg-black bg-center bg-no-repeat bg-cover">
          <nav className="flex justify-between items-center lg:pt-16 md:pt-16 pt-8 lg:px-32 px-4">
            <div className="flex pt-3">
              <Link href="/" className="cursor-pointer">
                <p className="font-medium ml-2 text-white text-[10px] lg:text-lg md:text-lg">
                Royalust
                </p>
              </Link>
            </div>
            <div className="p-1 cursor-pointer">
              <Link
                className="font-medium text-white text-[10px] lg:text-lg md:text-lg"
                href={`/signin`}
              >
                Sign In
              </Link>
            </div>
          </nav>
          <section className="section-head lg:px-32 md:px-16 px-4 lg:mb-[16rem] md:mb-[16rem] mb-12 flex justify-center">
            {children}
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>VOD</title>

        <meta name="description" content="Video for all" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-black bg-center bg-no-repeat bg-cover">
        <nav className="flex justify-between items-center lg:pt-16 md:pt-16 pt-8 lg:px-32 px-4">
          <div className="flex pt-3">
          <Link href="/" className="cursor-pointer">
                <p className="font-medium ml-2 text-white text-[10px] lg:text-lg md:text-lg">
                  Video On Demand
                </p>
              </Link>
          </div>
          <div className="p-1 cursor-pointer">
            <Link
              className="font-medium text-white text-[10px] lg:text-lg md:text-lg"
              href={`/signin`}
            >
              Sign In
            </Link>
          </div>
        </nav>
        <section className="lg:px-32 md:px-16 px-4 lg:mb-[16rem] md:mb-[16rem] mb-12 flex justify-center">
          {children}
        </section>
      </main>
    </>
  );
}
