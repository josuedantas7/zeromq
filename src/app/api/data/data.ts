export interface Video {
  id: string;
  url: string;
}

export interface Canal {
  message: {
    nome: string;
    img_canal: string;
    videos: Video[];
  };
}
