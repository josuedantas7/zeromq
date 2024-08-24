"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/app/components/Banner/Banner";
import axios from "axios";
import { Canal } from "@/app/api/data/data";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

export default function Channel({ params }: { params: { params: string } }) {
  const [channel, setChannel] = useState(null);
  const [channelSelected, setChannelSelected] = useState<Canal>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getChannel() {
      try {
        const [{ data: PromiseChannel }, { data: PromiseChannelSelected }] =
          await Promise.all([
            axios.post("/api/publisher", { message: params.params[0] }),
            axios.post("/api/subscriber", { message: params.params[0] }),
          ]);
        setChannelSelected(JSON.parse(PromiseChannelSelected.message));
        setChannel(PromiseChannel.channel);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    getChannel();
  }, [params.params]);

  if (loading) {
    return (
        <div className="flex justify-center items-center w-full h-screen" role="status">
            <svg aria-hidden="true" className="w-[250px] h-[250px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col">
        <Banner banner={channelSelected ? channelSelected.message?.img_canal : ''} />
        <Link href={'/'} className="flex items-center gap-2 hover:underline ml-8 translate-y-6 duration-500 max-[600px]:ml-2">
            <FaArrowLeftLong/>
            <span>Voltar</span>
        </Link>
        <div className="mb-12">
          <h1 className="font-semibold text-3xl text-center">Player</h1>
        </div>
        <div className="flex flex-wrap justify-center mb-32 gap-8">
          {channelSelected && channelSelected.message && Array.isArray(channelSelected.message.videos) && channelSelected?.message.videos.map((video) => (
            <iframe
              key={video.id}
              width="560"
              height="315"
              src={video.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          ))}
        </div>
      </div>
    </div>
  );
}
