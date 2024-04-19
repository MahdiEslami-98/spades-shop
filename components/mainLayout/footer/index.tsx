import Logo from "@/components/logo";
import Aparat from "@/utils/icons/aparat";
import Link from "next/link";
import React from "react";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

const navigation = {
  about: [
    { name: "درباره ما", href: "#" },
    { name: "تماس با ما", href: "#" },
    { name: "حریم خصوصی", href: "#" },
  ],
  guide: [
    { name: "راهنمای خرید از اسپادز", href: "#" },
    { name: "روش های ارسال سفارش", href: "#" },
    { name: "روش های پرداخت", href: "#" },
    { name: "پرسش های متداول", href: "#" },
  ],
  support: [
    { name: "گارانتی و خدمات پس از فروش", href: "#" },
    { name: "ضمانت اصالت و گارانتی کالا", href: "#" },
    { name: "7 روز ضمانت بازگشت کالا", href: "#" },
    { name: "تضمین بهترین قیمت", href: "#" },
    { name: "شرایط و قوانین", href: "#" },
  ],
  social: [
    { name: "aparat", href: "#", icon: Aparat },
    { name: "instagram", href: "#", icon: BsInstagram },
    { name: "telegram", href: "#", icon: FaTelegramPlane },
    { name: "twitter", href: "#", icon: BsTwitter },
    { name: "linkedin", href: "#", icon: BsLinkedin },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-950" aria-labelledby="footer-heading">
      <div className="container mx-auto px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pb-8 lg:pt-16">
        <div className="xl:grid xl:grid-cols-3">
          <div className="space-y-8 xl:col-span-1">
            <Link href={"/"} className="flex items-end gap-x-4">
              <Logo className="text-gray-200" />
              <p className="text-base text-gray-500">فروشگاه اینترنتی اسپادز</p>
            </Link>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  درباره اسپادز
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.about.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  راهنمای مشتریان
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.guide.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  خدمات مشتریان
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <div className="grid grid-cols-2 rounded-md border border-gray-100 bg-gray-400">
                  <div>
                    <img src="/eanjoman-logo-1.png" alt="" />
                  </div>
                  <div>
                    <img src="/logo.png" alt="" />
                  </div>
                  <div>
                    <img src="/logo (1).png" alt="" />
                  </div>
                  <div>
                    <img src="/footerlicensesunion.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-400 xl:text-center">
            کليه حقوق اين وب سايت متعلق به شرکت سپادز می‌باشد.
          </p>
          <p className="text-xs text-gray-400 xl:text-center">
            استفاده از مطالب فروشگاه اینترنتی اسپادز فقط برای مقاصد غیر تجاری و
            با ذکر منبع بلامانع است.
          </p>
          <p className="text-xs text-gray-400 xl:text-center">
            Copyright &copy; 2024 | spades-shop - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
