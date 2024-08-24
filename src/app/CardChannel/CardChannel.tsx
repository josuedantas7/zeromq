"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Canal } from "../api/data/data";
export function CardChannels() {

    const [channels,setChannels] = useState([]);


    useEffect(() => {
        async function getChannels() {
            const { data } = await axios.get("/api/channels")
            setChannels(data.channels);
        }
        getChannels();
    }, []);

  return (
    <div className="flex justify-between max-[820px]:justify-center flex-wrap gap-6">
      {channels && channels.length && channels.map((card:any) => (
        <div className="rounded-md border-2 border-gray-500" key={card.id}>
          <div className="w-[282px] h-[425px] bg-black">
            <Link href={`channel/${card.id}`} className="cursor-pointer">
              <Image
                alt="Foto usuário"
                src={card.img_canal}
                width={282}
                height={425}
                className="w-full h-full rounded-t-md"
              />
            </Link>
          </div>
          <div className="w-[282px] h-[116px] rounded-b-2xl bg-[#E2E2E2] shadow-2xl relative border-2">
            <h1 className="text-xl font-bold text-center mt-2">{card.nome}</h1>
            <Link
              className="absolute w-[100%] bottom-6 px-[27px] hover:bg-red-300 transition-colors duration-500 p-1 text-2xl bg-red-500 rounded-md"
              href={`channel/${card.id}`}
            >
              <p className="text-center text-white font-bold">Inscrever</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
