import { Button } from "../ui/button";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

const collabs = [
  "/collabs/aj.jpg",
  "/collabs/babaps.jpg",
  "/default_images/cat.jpg",
];

export function Hero() {
  return (
    <div className="w-full flex justify-center border-b border-b-foreground/10">
      <div className="w-full max-w-5xl flex flex-col justify-center items-center p-3 px-5 py-40 gap-10 text-sm">
        {/* SUB HEADING */}
        <div className="flex items-center gap-4">
          <Image
            src={"/icons/wizard.png"}
            alt="atk"
            width={100}
            height={100}
            className="w-10 h-10 object-contain"
          />
          <p className="text-sm font-medium tracking-wider">
            Click, Connect, Conquer
          </p>
        </div>

        {/* MAIN HEADING */}
        <p className="text-4xl font-semibold text-center tracking-wide">
          Streamline Project Management
          <br />
          with a <span className="text-[#007DFF]"> Smart Dashboard</span>
        </p>

        {/* OVERLINE */}
        <p className="text-sm text-gray-700 font-light tracking-wide">
          Manage your portfolio projects data here, log in to get started!
        </p>

        {/* COLLABS */}
        <div className="flex flex-col justify-center items-center gap-4 mb-4">
          <p>Works with</p>

          <div className="w-full flex justify-center gap-4">
            {collabs.map((item, index) => (
              <div key={index} className="rounded-full overflow-hidden">
                <Image
                  src={item}
                  alt={item}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* AUTH BUTTONS */}
        <Suspense>
          <div className="flex gap-10">
            <Button asChild size="lg" variant={"outline"}>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="lg" variant={"tertiary"}>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
