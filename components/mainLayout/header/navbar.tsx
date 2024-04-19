/* eslint-disable @next/next/no-img-element */
"use client";
import Logo from "@/components/logo";
import { ICategory } from "@/types/getAllCategoryRes";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { FaBars, FaChevronDown, FaX } from "react-icons/fa6";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ data }: { data: ICategory | undefined }) => {
  return (
    <nav>
      <div className="border-b border-t border-black">
        <Popover className="container relative mx-auto bg-white px-4">
          <div className="flex items-center justify-between px-4 py-2 sm:px-6 md:justify-start md:space-x-10">
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <FaBars className="h-6 w-6 text-black" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
              <Popover.Group as="nav" className="flex gap-x-10">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-gray-900" : "text-gray-500",
                          "group inline-flex items-center gap-x-2 rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none",
                        )}
                      >
                        <span>محصولات</span>
                        <FaChevronDown
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "h-3 w-3 group-hover:text-gray-500",
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-50 -ml-4 mt-3 w-screen max-w-md transform lg:max-w-3xl">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                              <Link
                                href={"/products-category?page=1"}
                                className="flex items-center gap-x-2 lg:col-span-2"
                              >
                                <Logo className="h-4 w-4" />
                                <p className="">همه محصولات</p>
                              </Link>
                              {data &&
                                data.data.categories.map((item) => (
                                  <Link
                                    key={item._id}
                                    href={`/products-category?category=${item._id}&page=1`}
                                    className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                                  >
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <a
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  درباره ما
                </a>
                <a
                  href="#"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  تماس با ما
                </a>
              </Popover.Group>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-end">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                      <span className="sr-only">Close menu</span>
                      <FaX className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-6">
                      <Link
                        href={"/products-category?page=1"}
                        className="flex items-center gap-x-2"
                      >
                        <Logo className="h-4 w-4" />
                        <p>همه محصولات</p>
                      </Link>
                      {data &&
                        data.data.categories.map((item) => (
                          <a
                            key={item._id}
                            href={`/products-category?category=${item._id}&page=1`}
                            className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                          >
                            <div className="ml-4 text-base font-medium text-gray-900">
                              {item.name}
                            </div>
                          </a>
                        ))}
                    </nav>
                  </div>
                </div>
                <div className="px-5 py-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Link href={"#"}>درباره ما</Link>
                    <Link href={"#"}>تماس با ما</Link>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
