"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";

const Swipery = () => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        pagination={{
          el: ".hero-dots",
          clickable: true,
          bulletClass: "inline-block size-3 rounded-full bg-white/50 cursor-pointer",
          bulletActiveClass: "w-10! bg-white!",
        }}
        loop
        slidesPerView={1}
      >
        <SwiperSlide>
          <div className="relative h-125 bg-[url('/images/MainSlider.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-green-600/60"></div>

            <div className="absolute inset-0 flex flex-col justify-center px-20 text-white">
              <h2 className="max-w-md text-4xl font-bold">
                Fresh Products Delivered to your Door
              </h2>
              <p className="mt-4 text-lg">Get 20% off your first order</p>

              <div className="mt-6 flex gap-3">
                <Link href="/shop" className="rounded-md bg-white px-8 py-3 font-semibold text-green-600">
                  Shop Now
                </Link>
                <Link href="/shop" className="rounded-md border border-white px-8 py-3 font-semibold">
                  View Deals
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-125 bg-[url('/images/MainSlider.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-green-600/60"></div>

            <div className="absolute inset-0 flex flex-col justify-center px-20 text-white">
              <h2 className="max-w-md text-4xl font-bold">
                Fresh Products Delivered to your Door
              </h2>
              <p className="mt-4 text-lg">Get 20% off your first order</p>

              <div className="mt-6 flex gap-3">
                <Link href="/shop" className="rounded-md bg-white px-8 py-3 font-semibold text-green-600">
                  Shop Now
                </Link>
                <Link href="/shop" className="rounded-md border border-white px-8 py-3 font-semibold">
                  View Deals
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-125 bg-[url('/images/MainSlider.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-green-600/60"></div>

            <div className="absolute inset-0 flex flex-col justify-center px-20 text-white">
              <h2 className="max-w-md text-4xl font-bold">
                Fresh Products Delivered to your Door
              </h2>
              <p className="mt-4 text-lg">Get 20% off your first order</p>

              <div className="mt-6 flex gap-3">
                <Link href="/shop" className="rounded-md bg-white px-8 py-3 font-semibold text-green-600">
                  Shop Now
                </Link>
                <Link href="/shop" className="rounded-md border border-white px-8 py-3 font-semibold">
                  View Deals
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <button className="hero-prev absolute left-5 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-green-600">
        <FiChevronLeft className="size-6" />
      </button>
      <button className="hero-next absolute right-5 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-green-600">
        <FiChevronRight className="size-6" />
      </button>

      <div className="hero-dots absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2"></div>
    </div>

    
  );
};

export default Swipery;