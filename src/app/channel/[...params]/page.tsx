import React from "react";
import db from "@/app/utils/db";
import Banner from "@/app/components/Banner/Banner";

export default async function Channel({
  params,
}: {
  params: { params: string };
}) {
  const channelSelected = await db.canal.findFirst({
    where: {
      id: params.params[0],
    },
    include: {
      videos: true,
    },
  });

  return (
    <div>
      <div className="flex flex-col">
        <Banner banner={channelSelected?.img_canal} />
        <div className="mb-12">
          <h1 className="font-semibold text-3xl text-center">Player</h1>
        </div>
        <div className="flex flex-wrap justify-center mb-32 gap-8">
          {channelSelected?.videos.map((video) => (
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
