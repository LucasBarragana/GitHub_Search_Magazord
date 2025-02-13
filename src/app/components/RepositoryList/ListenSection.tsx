'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";

type ListItem = {
  id: number;
  html_url: string;
  title: string;
}

type ListSectionProps = {
  title: string;
  items: ListItem[];
  emptyMessage: string;
  id: string;
}

export default function ListSection({ title, items, emptyMessage, id }: ListSectionProps) {
  return (
    <section id={id} className="mt-8">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {items.length > 0 ? (
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="text-xl text-blue-900 px-6 py-3 bg-white rounded-xl hover:bg-gray-50">
              <Link href={item.html_url} target="_blank" className="flex justify-between">
                <p>{item.title}</p>
                <Image src="/imgs/rightRow.png" width={20} height={20} alt="icon" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">{emptyMessage}</p>
      )}
    </section>
  );
}
