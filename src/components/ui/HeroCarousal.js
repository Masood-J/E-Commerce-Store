"use client";
import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
    {
        id: 1,
        image: "/male-banner.jpg",
        heading: "Fall Sale is Here",
        subtext: "Get Up to 40% off",
    },
    {
        id: 2,
        image: "/shirts-banner.jpg",
        heading: "Minimalist Collection",
        subtext: "Essentials for every day.",
    },
    {
        id: 3,
        image: "/fashion-banner.jpg",
        heading: "Winter Collection",
        subtext: "Stay warm, stay stylish.",
    },
];

export default function HeroCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // Optional: auto-slide every 5s
    useEffect(() => {
        if (!emblaApi) return;
        const interval = setInterval(() => emblaApi.scrollNext(), 9000);
        return () => clearInterval(interval);
    }, [emblaApi]);

    return (
        <div className="relative overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {banners.map((banner) => (
                    <div key={banner.id} className="flex-[0_0_100%] relative h-[80vh] font-sf cursor-pointer">
                        <Image
                            src={banner.image}
                            alt={banner.heading}
                            fill
                            className="object-cover brightness-90"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
                            <h1 className="text-6xl md:text-6xl font-bold">{banner.heading}</h1>
                            <p className="mt-4 text-lg">{banner.subtext}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={scrollPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black transition"
            >
                <ChevronLeft className="text-white" size={28} />
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black transition"
            >
                <ChevronRight className="text-white" size={28} />
            </button>
        </div>
    );
}
