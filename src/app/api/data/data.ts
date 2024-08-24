export interface Video {
    url: string;
  }
  
export  interface Canal {
    nome: string;
    img_canal: string;
    videos: Video[];
  }
  
  export const canais: Canal[] = [
    {
      nome: "Brilliant Classics",
      img_canal: "https://yt3.ggpht.com/ytc/AIdro_mi4ROObCjAZcQ0xVbFfwSQjvlXJwXGhAXv0JfTNbflmog=s48-c-k-c0x00ffffff-no-rj",
      videos: [
        { url: "https://www.youtube.com/embed/_ioc6sdgugo?si=dwh0qWCbUB-wn4Gb" },
        { url: "https://www.youtube.com/embed/sHdjiLGNzMo?si=SOT4nMp7z4K3ghlF" },
        { url: "https://www.youtube.com/embed/C-4hh0CSTAE?si=XB-AQmQAu1CW0Q5-" }
      ]
    },
    {
      nome: "Steve Lacy",
      img_canal: "https://yt3.ggpht.com/hNWhng8eW_ir7HKxYp7OlET4xxbCkJsny3SEsRkbJAdIqjKRFh8UnjdB5X2w5U5vw_YkzfyqOI4=s48-c-k-c0x00ffffff-no-rj",
      videos: [
        { url: "https://www.youtube.com/embed/x-OzspEcQG8?si=QrqbRcqX3u_MpPF-" },
        { url: "https://www.youtube.com/embed/VF-FGf_ZZiI?si=AIXhmyz1Tfeuy9G1" },
        { url: "https://www.youtube.com/embed/Q6FarZpy67M?si=4OjoEf8hI9s03-D9" }
      ]
    },
    {
      nome: "Raiomaru",
      img_canal: "https://yt3.ggpht.com/iyfscf0MGmRIJMoIHadT2mWFO1IRO_omCTcPqqTQuTy9f_pGPMGlBCcjGIeMZ3DWQRA_zQ1E=s48-c-k-c0x00ffffff-no-rj",
      videos: [
        { url: "https://www.youtube.com/embed/LarDFtcV8bs?si=tc43Lp_V1cZyh3PX" },
        { url: "https://www.youtube.com/embed/-1rzOP7TpOk?si=TPUQ3yDwZfPoFeqL" },
        { url: "https://www.youtube.com/embed/pnYL7kfCvac?si=Mzp8nICMUMGYHE4T" }
      ]
    }
  ];
  