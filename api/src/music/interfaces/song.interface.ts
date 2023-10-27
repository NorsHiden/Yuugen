export type Song = {
  title: string;

  author: string;

  url: string;

  thumbnail: string;

  duration: number;

  requester: {
    id: string;
    username: string;
    avatar: string;
  };

  timestamp_added: Date;
};
