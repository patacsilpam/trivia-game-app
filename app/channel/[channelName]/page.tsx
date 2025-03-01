// app/channel/[channelName]/page.tsx
import ClientCallWrapper from "./ClientWrapper";

export default async function Page({
  params,
}: {
  params: { channelName: string };
}) {
  // Extract the channelName first
  const { channelName } = params;

  return (
    <main className="flex w-full flex-col">
      <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
        {channelName}
      </p>
      <ClientCallWrapper
        appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
        channelName={channelName}
      />
    </main>
  );
}
