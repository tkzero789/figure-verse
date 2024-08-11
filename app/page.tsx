import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="overflow-hidden rounded-lg py-4">
          <div
            style={{
              backgroundImage: `url(/img/marvel-bg.jpg)`,
              backgroundPositionX: "center",
            }}
            className="relative aspect-square overflow-hidden rounded-lg bg-cover md:aspect-[2.4/1]"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
              <div className="max-w-xs rounded-lg bg-gray-200 bg-opacity-75 p-4 text-red-800 sm:max-w-xl">
                <h1 className="text-2xl font-bold lg:text-4xl">
                  Become a Marvel Mastermind
                </h1>
                <h2 className="mt-4 text-lg font-bold">
                  Test Your Knowledge, Win Big!
                </h2>
                <Button
                  asChild
                  className="mt-4 bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-xl shadow-lg shadow-red-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:shadow-lg dark:shadow-red-800/80 dark:focus:ring-red-800"
                >
                  <Link
                    href="/shop"
                    className="flex items-center justify-between gap-2 rounded-full"
                  >
                    <span>Shop Now</span>
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
