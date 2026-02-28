"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { transform } from "next/dist/build/swc/generated-native";

const slides = [
  { color: "bg-blue-500", desc: "first" },
  { color: "bg-red-500", desc: "second" },
  { color: "bg-green-500", desc: "third" },
];

const renderedSlides = [slides[slides.length - 1], ...slides, slides[0]];

export default function projects() {
  const [isExpanded, setIsExpanded] = useState(true);

  const [carouselIndex, setCarouselIndex] = useState(1);
  const [carouselTranstion, setCarouselTransition] = useState(true);

  const [spinIndex, setSpinIndex] = useState(0);
  const [lastSpinIndex, setLastSpinIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    const startInterval = () =>
      setInterval(() => {
        setIsExpanded((prev) => !prev);
        setCarouselIndex((prev) => prev + 1);
      }, 2000);

    let interval = startInterval();

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        interval = startInterval();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!carouselTranstion) {
      requestAnimationFrame(() => {
        setCarouselTransition(true);
      });
    }
  }, [carouselTranstion]);

  const handleCarouselTransition = () => {
    if (carouselIndex == renderedSlides.length - 1) {
      setCarouselTransition(false);
      setCarouselIndex(1);
    }

    if (carouselIndex == 0) {
      setCarouselTransition(false);
      setCarouselIndex(renderedSlides.length - 2);
    }
  };

  const startSpinner = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * slides.length);
    } while (newIndex === lastSpinIndex);

    const totalCycles = 4; // how many full rotations before stopping
    const totalSteps = slides.length * totalCycles;

    let steps = 0;

    const spinInterval = setInterval(() => {
      setSpinIndex((prev) => {
        const next = (prev + 1) % slides.length;
        steps++;

        // If we've done enough cycles AND next slide is the target
        if (steps >= totalSteps && next === newIndex) {
          clearInterval(spinInterval);
          setLastSpinIndex(newIndex);
          setIsSpinning(false);
        }

        return next;
      });
    }, 80);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      startSpinner();
    }, 2000);

    return () => clearInterval(interval);
  }, [lastSpinIndex]);

  return (
    <div className="flex flex-col w-full bg-green-500">
      <div className="flex w-full gap-4 p-2">
        <Card className="w-full border border-black">
          <CardHeader className="flex-1">
            <CardTitle className="text-lg">Portfolio</CardTitle>
            <CardDescription className="text-xs">
              View my portfolio to explore my work and projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-56 p-4 border border-black">HELLO</div>
          </CardContent>
          <CardFooter>FOOTER</CardFooter>
        </Card>

        <Card className="w-full border border-black">
          <CardHeader className="flex-1">
            <CardTitle className="text-lg">Project 2</CardTitle>
            <CardDescription className="text-xs">
              This is for project 2
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative flex justify-center items-center h-56 p-4 border border-black overflow-hidden">
              <div
                className="w-full flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(calc(-${carouselIndex * 84}%))`,
                  transition: carouselTranstion
                    ? "transform 0.7s ease-in-out"
                    : "none",
                }}
                onTransitionEnd={handleCarouselTransition}
              >
                {renderedSlides.map(({ color, desc }, index) => (
                  <div
                    key={index}
                    className={`w-[80%] h-56 flex-shrink-0 flex justify-center items-center rounded-lg ${color} mx-2`}
                  >
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full border border-black">
          <CardHeader className="flex-1">
            <CardTitle className="text-lg">Project </CardTitle>
            <CardDescription className="text-xs">
              This is for project 3
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative flex justify-center items-center h-56 p-4 border border-black">
              <div
                className={`absolute w-32 h-40 rounded-lg bg-green-500 
                transition-all duration-700 ease-in-out
                ${isExpanded ? "-rotate-[15deg] -translate-x-20" : "rotate-0 translate-x-0"}`}
              >
                left
              </div>
              <div
                className={`absolute w-32 h-40 rounded-lg bg-amber-500 
                transition-all duration-700 ease-in-out
                ${isExpanded ? "rotate-[15deg] translate-x-20" : "rotate-0 translate-x-0"}`}
              >
                right
              </div>
              <div className={`z-10 w-28 h-28 rounded-lg bg-red-500`}>
                center
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full gap-4 p-2">
        <Card className="w-full border border-black">
          <CardHeader>
            <CardTitle className="text-lg">Project Spinner</CardTitle>
            <CardDescription className="text-xs">
              Auto spinning showcase
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="relative h-56 overflow-hidden flex items-center justify-center border border-black bg-neutral-900">
              {/* Slides */}
              <div
                className="flex w-full"
                style={{
                  transform: `translateX(-${spinIndex * 100}%)`,
                  transition: isSpinning
                    ? "transform 0.08s linear"
                    : transitionEnabled
                      ? "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)"
                      : "none",
                }}
              >
                {renderedSlides.map(({ color, desc }, index) => (
                  <div
                    key={index}
                    className={`w-full flex-shrink-0 h-56 flex items-center justify-center transition-all duration-300
                      ${color}
                      ${
                        index === spinIndex && !isSpinning
                          ? "scale-105 shadow-2xl"
                          : "scale-95 opacity-70"
                      }`}
                  >
                    <p className="text-white text-lg font-semibold">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full border border-black">
          <CardHeader className="flex-1">
            <CardTitle className="text-lg">Zoom in</CardTitle>
            <CardDescription className="text-xs">
              This is for zoom in zoom out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative flex justify-center items-center h-56 p-4 border border-black overflow-hidden">
              hover to zoom in
            </div>
          </CardContent>
        </Card>

        <Card className="w-full border border-black">
          <CardHeader className="flex-1">
            <CardTitle className="text-lg">Project </CardTitle>
            <CardDescription className="text-xs">
              This is for Staggered flow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative flex justify-center items-center h-56 p-4 border border-black">
              waterflow objects here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
