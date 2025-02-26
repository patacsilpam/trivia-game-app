"use client";

import AgoraRTC, {
  AgoraRTCProvider,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
} from "agora-rtc-react";

const CallComponent = ({
  appId,
  channelName,
}: {
  appId: string;
  channelName: string;
}) => {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  // 🔥 Hooks should NOT be inside useEffect
  const { localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();

  // ✅ Call hooks at the top level, NOT inside useEffect
  useJoin({
    appid: appId,
    channel: channelName,
    token: null,
  });

  usePublish([localMicrophoneTrack, localCameraTrack]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Agora Video Call</h2>
      <div className="grid grid-cols-2 gap-4">
        {localCameraTrack && (
          <video
            autoPlay
            playsInline
            ref={(element) => {
              if (element) localCameraTrack.play(element);
            }}
            className="border-2 border-blue-500 w-64 h-48"
          />
        )}
        {remoteUsers.map((user) => (
          <video
            key={user.uid}
            autoPlay
            ref={(element) => {
              if (element) user.videoTrack?.play(element);
            }}
            className="border-2 border-red-500 w-64 h-48"
          />
        ))}
      </div>
      <button>Start Quiz!</button>
      <a href="/" className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        End Call
      </a>
    </div>
  );
};

// ✅ Wrap `CallComponent` in `AgoraRTCProvider`
const Call = ({
  appId,
  channelName,
}: {
  appId: string;
  channelName: string;
}) => {
  const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });

  return (
    <AgoraRTCProvider client={client}>
      <CallComponent appId={appId} channelName={channelName} />
    </AgoraRTCProvider>
  );
};

export default Call;
