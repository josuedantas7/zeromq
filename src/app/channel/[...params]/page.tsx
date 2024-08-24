"use client";
import React, { useEffect, useState } from "react";
import Banner from "@/app/components/Banner/Banner";
import axios from "axios";
import { Canal } from "@/app/api/data/data";
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
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <Banner banner={channelSelected ? channelSelected.message?.img_canal : ''} />
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
