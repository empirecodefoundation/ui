"use client";

import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProfileCardProps {
  children?: React.ReactNode;
  name: string;
  title: string;
  company: string;
  imageUrl: string;
  rating: number;
  socials: { name: string; href: string }[];
  redirectLink: string;
}

export const Card1: React.FC<ProfileCardProps> = ({
  name,
  title,
  company,
  imageUrl,
  rating,
  socials,
  redirectLink,
  children,
}) => {
  const router = useRouter();

  return (
    <div className="relative w-fit bg-white rounded-[50px] shadow-lg p-6 pb-2 border">
      <div className="absolute top-0 right-0 bg-slate-100 rounded-tr-[50px] rounded-bl-[30px] p-4">
        <motion.button
          className="text-gray-400 hover:text-gray-600"
          whileHover={{ scale: 1.1 }}
        >
          <MoveUpRight
            className="border border-gray-300 rounded-full p-5 bg-slate-100"
            size={60}
            color="black"
            onClick={() => router.push(redirectLink)}
          />
        </motion.button>
      </div>

      <div className="flex items-center mb-8">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full mr-4"
        />
      </div>
      <div className="mx-2">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-600">
          {title} at {company}
        </p>
      </div>

      <div className="my-8 mx-2 flex justify-between gap-x-9">
        <div>
          <p className="text-sm text-gray-500 mb-2">Source</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
            {socials.map((social) => (
              <Link
                target="_blank"
                href={social.href}
                key={social.name}
                className="flex items-center justify-center bg-slate-300 hover:bg-gray-200 text-gray-800 font-semibold px-3 py-2 rounded-full"
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="flex items-center text-sm">
            <span className="mr-1">🔥</span>
            Hot Client
          </div>
          <div className="flex border rounded-full p-2 w-fit">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full mx-1 ${
                  index < rating ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
