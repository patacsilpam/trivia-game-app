
// app/channel/[channelName]/page.tsximport ClientCallWrapper from "./ClientWrapper";

export default async function Page({
  params,
}: {
  params: { channelName: string };
}) {
  try {
    // Extract the channelName first
    const { channelName } = await params;

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
  } catch (error) {
    console.error("Error fetching channel name:", error);
    return (
      <main className="flex w-full flex-col">
        <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-red-600">
          Error loading channel
        </p>
      </main>
    );
  }
}
