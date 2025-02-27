"use client";

import { useState } from "react";
import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";

function Call(props: { appId: string; channelName: string }) {
  const client = useRTCClient(
    typeof window !== "undefined"
      ? AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
      : null
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos
        client={client}
        channelName={props.channelName}
        AppID={props.appId}
      />
    </AgoraRTCProvider>
  );
}

function Videos(props: { client: any; channelName: string; AppID: string }) {
  const { client, AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const [cameraOn, setCameraOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.forEach((track) => track.play());

  if (isLoadingMic || isLoadingCam)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );

  // ✅ Toggle Camera Function (with valid check)
  const toggleCamera = () => {
    if (localCameraTrack) {
      localCameraTrack.setEnabled(!cameraOn);
      setCameraOn((prev) => !prev);
    }
  };

  // ✅ Toggle Speaker Function (corrected)
  const toggleSpeaker = async () => {
    if (localMicrophoneTrack) {
      if (speakerOn) {
        await client.unpublish(localMicrophoneTrack);
        localMicrophoneTrack.setEnabled(false);
      } else {
        localMicrophoneTrack.setEnabled(true);
        await client.publish(localMicrophoneTrack);
      }
      setSpeakerOn((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-screen p-1">
      <div
        className="grid gap-1 flex-1"
        style={{
          gridTemplateColumns:
            remoteUsers.length > 9
              ? "repeat(4, minmax(0, 1fr))"
              : remoteUsers.length > 4
              ? "repeat(3, minmax(0, 1fr))"
              : remoteUsers.length > 1
              ? "repeat(2, minmax(0, 1fr))"
              : "minmax(0, 1fr)",
        }}
      >
        {cameraOn && localCameraTrack && (
          <LocalVideoTrack
            track={localCameraTrack}
            play={true}
            className="w-full h-full"
          />
        )}
        {remoteUsers.map((user, index) => (
          <RemoteUser user={user} key={index} />
        ))}
      </div>

      {/* Controls */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4">
        <button
          onClick={toggleCamera}
          className={`px-5 py-3 text-white rounded-lg w-40 ${
            cameraOn
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>

        <a
          className="px-5 py-3 text-white bg-red-400 rounded-lg hover:bg-red-500 w-40 text-center"
          href="/"
        >
          End Call
        </a>

        <button
          onClick={toggleSpeaker}
          className={`px-5 py-3 text-white rounded-lg w-40 ${
            speakerOn
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {speakerOn ? "Mute Speaker" : "Unmute Speaker"}
        </button>
      </div>
    </div>
  );
}

export default Call;
