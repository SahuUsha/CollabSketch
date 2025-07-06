// import RoomCanvas from "@/app/Componenets/RoomCanvas";

import RoomCanvas from "../../Componenets/RoomCanvas";

type Props = {
  params: {
    roomId: string;
  };
};

// ✅ MUST be `async function` with destructured `params`
export default async function Page({ params }: Props) {
  const roomId = (await params).roomId;
  return <RoomCanvas roomId={roomId} />;
}
