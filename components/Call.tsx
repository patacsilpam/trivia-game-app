// components/Call.tsx
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
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName} AppID={props.appId} />
    </AgoraRTCProvider>
  );
}

function Videos(props: { channelName: string; AppID: string }) {
  const { AppID, channelName } = props;
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Only publish tracks that are enabled
  const tracksToPublish = [
    micEnabled ? localMicrophoneTrack : null,
    cameraEnabled ? localCameraTrack : null,
  ].filter(Boolean);

  usePublish(tracksToPublish);

  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  // Play remote audio tracks
  audioTracks.map((track) => track.play());

  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );

  // Toggle microphone
  const toggleMic = () => {
    if (localMicrophoneTrack) {
      if (micEnabled) {
        localMicrophoneTrack.setEnabled(false);
      } else {
        localMicrophoneTrack.setEnabled(true);
      }
      setMicEnabled(!micEnabled);
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    if (localCameraTrack) {
      if (cameraEnabled) {
        localCameraTrack.setEnabled(false);
      } else {
        localCameraTrack.setEnabled(true);
      }
      setCameraEnabled(!cameraEnabled);
    }
  };

  const unit = "minmax(0, 1fr) ";

  return (
    <div className="flex flex-col justify-between w-full h-screen p-1">
      <div
        className={`grid gap-1 flex-1`}
        style={{
          gridTemplateColumns:
            remoteUsers.length > 9
              ? unit.repeat(4)
              : remoteUsers.length > 4
              ? unit.repeat(3)
              : remoteUsers.length > 1
              ? unit.repeat(2)
              : unit,
        }}
      >
        <LocalVideoTrack
          track={localCameraTrack}
          play={cameraEnabled}
          className="w-full h-full"
        />
        {remoteUsers.map((user, index) => (
          <RemoteUser user={user} key={index} />
        ))}
      </div>

      {/* Controls */}
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center gap-4 pb-4">
        <button
          onClick={toggleMic}
          className={`px-5 py-3 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40 ${
            micEnabled
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {micEnabled ? "Mute Mic" : "Unmute Mic"}
        </button>

        <button
          onClick={toggleCamera}
          className={`px-5 py-3 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40 ${
            cameraEnabled
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {cameraEnabled ? "Turn Off Camera" : "Turn On Camera"}
        </button>

        <a
          className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
          onClick={() => (window.location.href = "/")}
        >
          End Call
        </a>
      </div>
    </div>
  );
}

export default Call;
