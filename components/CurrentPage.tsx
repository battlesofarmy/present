"use client"

import { DisclosureButton } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation"



export default function CurrentPage({navigation}) {
    const pathname = usePathname();
    console.log(pathname);
  
    return (
      <>
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            href={item.href}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              item.href === pathname
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >

             {/* aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )} */}

            {item.name}
          </DisclosureButton>
        ))}
      </>
    );
  }
  