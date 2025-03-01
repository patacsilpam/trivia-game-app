"use client";
import dynamic from "next/dynamic";

export default function ClientCallWrapper({
  appId,
  channelName,
}: {
  appId: string;
  channelName: string;
}) {
  const DynamicCall = dynamic(() => import("@/components/Call"), {
    ssr: false,
  });

  return <DynamicCall appId={appId} channelName={channelName} />;
}
