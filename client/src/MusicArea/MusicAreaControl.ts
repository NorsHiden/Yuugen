import { MusicUpdate } from "@/lib/types/MusicUpdate";

export const getSSEUpdates = (
  guild_id: string,
  setState: (value: React.SetStateAction<MusicUpdate>) => void
) => {
  const eventSource = new EventSource(
    `/api/music/updates?guild_id=${guild_id}`,
    { withCredentials: true }
  );
  eventSource.onmessage = (e) => {
    const data = JSON.parse(e.data);
    setState(data);
  };
};
