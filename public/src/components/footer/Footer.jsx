import React from "react";
import Link from "next/link";

export default function Footer() {
  const links = [
    "privacy",
    "terms",
    "sitemap",
    "company details",
    "destinations",
  ];

  return( 
  <div className="px-20 border-t border-t-gray-200 py-4 flex justify-between w-full text-sm z-50 bg-white items-center">
    <ul className="flex gap-3 font-normal" >
      <li>&copy;{new Date().getFullYear()} AirBnb, Inc</li>
      {links.map((link)=>(
      <li key={link}>
        <Link href="#" className="capitalize">
          {link}
        </Link>
      </li>
      ))}
    </ul>
  </div>);
}
