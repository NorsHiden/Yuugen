export const getSSEUpdates = (guild_id: string) => {
  const eventSource = new EventSource(
    `/api/music/updates?guild_id=${guild_id}`,
    { withCredentials: true }
  );
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
  };
};
