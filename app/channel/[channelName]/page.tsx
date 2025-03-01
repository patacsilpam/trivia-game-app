// app/channel/[channelName]/page.tsx
import ClientCallWrapper from "./ClientWrapper";

export default function Page({
  params,
}: {
  params: { channelName: string };
}) {
  try {
    // Extract the channelName directly from params
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
