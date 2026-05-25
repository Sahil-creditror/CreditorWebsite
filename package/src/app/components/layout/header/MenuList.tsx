"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type MenuChild = { title: string; path: string };
type MenuItem = {
  title: string;
  path: string;
  newTab?: boolean;
  children?: MenuChild[];
};

const MenuList = ({
  item,
  closeMenu,
}: {
  item: MenuItem;
  closeMenu: () => void;
}) => {
  const { title, path, newTab, children } = item;
  const pathname = usePathname();
  const isActive = pathname === path || children?.some((c) => pathname === c.path);

  return (
    <li className="group flex flex-col gap-2">
      <div className="flex items-center gap-3 transition-all duration-500 ease-in-out">
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out 
                ${isActive ? "max-w-6 opacity-100" : "max-w-0 opacity-0"} 
                group-hover:max-w-6 group-hover:opacity-100`}
        >
          <Image
            src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883684/creditor-website-assets/images/Icon/secondary-leaf.svg"
            alt=""
            height={20}
            width={20}
            className="animate-spin dark:hidden"
          />
          <Image
            src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883679/creditor-website-assets/images/Icon/primary-leaf.svg"
            alt=""
            height={20}
            width={20}
            className="animate-spin hidden dark:block"
          />
        </div>
        <Link
          href={path}
          onClick={closeMenu}
          className="text-secondary dark:text-white text-2xl font-bold"
          target={newTab ? "_blank" : "_self"}
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          {title}
        </Link>
      </div>

      {children && children.length > 0 && (
        <ul className="flex flex-col gap-2 pl-9 border-l-2 border-secondary/15 dark:border-white/15 ml-2">
          {children.map((child) => {
            const childActive = pathname === child.path;
            return (
              <li key={child.path}>
                <Link
                  href={child.path}
                  onClick={closeMenu}
                  className={`text-lg font-semibold no-underline transition-colors ${
                    childActive
                      ? "text-primary"
                      : "text-secondary/80 dark:text-white/80 hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default MenuList;
