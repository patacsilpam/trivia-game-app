// app/channel/[channelName]/page.tsx
import ClientCallWrapper from "./ClientWrapper";
import { use } from "react";
export default function Page({
  params,
}: {
  params: Promise<{ channelName: string }>;
}) {
  // Extract the channelName first
  const resolvedParams = use(params);

  return (
    <main className="flex w-full flex-col">
      <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
        {resolvedParams.channelName}
      </p>
      <ClientCallWrapper
        appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!}
        channelName={resolvedParams.channelName}
      />
    </main>
  );
}
