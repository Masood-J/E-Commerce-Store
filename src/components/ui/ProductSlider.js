"use client";

import useEmblaCarousel from "embla-carousel-react";
import {useCallback} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import ItemCard from "./ItemCard";

export default function ProductSlider({products}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: false,
        slidesToScroll: 4,   // scroll 4 items per click
        loop: false,
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative w-full">


            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black transition"
            >
                <ChevronLeft size={20}/>
            </button>


            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex ml-3">

                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-[0_0_20%] px-2" // 4 items per view
                        >
                            <ItemCard
                                id={product.id}
                                src={product.image}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                                path={`/catalog/${product.category === "Polo Shirts" ? "polo" : product.category.toLowerCase()}`}
                                isNew={product.isNew}
                            />
                        </div>
                    ))}

                </div>
            </div>


            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black transition"
            >
                <ChevronRight size={20}/>
            </button>
        </div>
    );
}
