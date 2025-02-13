'use client'

import Link from "next/link";
import Image from "next/image";
import React from "react";

type BadgeProps = {
  imgSrc: string;
  count: number;
  label: string;
  section: string;
}

export default function Badge({ imgSrc, count, label, section }: BadgeProps) {
  return (
    <Link href={section} className="bg-gray-100 px-4 py-2 rounded-lg shadow block text-center gap-2">
      <div className="flex justify-center items-center gap-2">
        <Image src={imgSrc} width={32} height={32} alt={label} />
        <p className="text-4xl font-semibold">{count}</p>
      </div>
      <p className="text-base">{label}</p>
    </Link>
  );
}
