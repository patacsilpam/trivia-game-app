import Call from "@/components/Call";

export default function Page({ params }: { params: { channelName: string } }) {
  return (
    <main className="flex w-full flex-col">
      <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
        {params.channelName!}
      </p>
      <Call
        appId={"8a352599c8084276b04926e3bc0df2f4"}
        channelName={"test"}
      ></Call>
    </main>
  );
}
