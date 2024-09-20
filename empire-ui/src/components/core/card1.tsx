"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoveDown, MoveRight } from "lucide-react";
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
  additional_information: string;
}

export const Card1: React.FC<ProfileCardProps> = ({
  name,
  title,
  company,
  imageUrl,
  rating,
  socials,
  additional_information,
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative shadow-lg border rounded-[50px] p-6 pb-2 flex flex-col sm:flex-row">
      <div>
        <div className="absolute top-0 right-0 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-tr-[50px] rounded-bl-[50px]">
          <motion.button
            className="text-gray-400 hover:text-gray-600"
            whileHover={{ scale: 1.1 }}
            onClick={handleExpandToggle}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <MoveRight
              className="border border-gray-300 rounded-full p-5 bg-slate-100 hidden sm:block"
              size={60}
              color="black"
            />
            <MoveDown
              className="border border-gray-300 rounded-full p-5 bg-slate-100 block sm:hidden"
              size={60}
              color="black"
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
          <p className="text-sm">
            {title} at {company}
          </p>
        </div>

        {/* Static Content */}
        <div className="my-8 mx-2 flex justify-between space-x-9">
          <div>
            <p className="text-sm mb-2">Source</p>
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

      {/* Expandable Section to the Right */}
      <motion.div
        initial={{ x: 100, y: 150, width: 0, opacity: 0 }}
        animate={{
          width: isExpanded ? "auto" : 0, // Set your desired width for expanded state
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
          x: isExpanded ? 0 : 100,
          y: isExpanded ? 0 : 150,
        }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-tr-[50px] rounded-br-[50px] flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{
            duration: isExpanded ? 1 : 0.05,
            delay: isExpanded ? 0.5 : 0,
          }}
          className="w-64 px-6 py-2"
        >
          <h3 className="text-lg font-semibold">Additional Information:</h3>
          <p className="text-sm">{additional_information}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
