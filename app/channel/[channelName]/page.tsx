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
        appId={"8a352599c8084276b04926e3bc0df2f4"}
        channelName={resolvedParams.channelName}
      />
    </main>
  );
}
