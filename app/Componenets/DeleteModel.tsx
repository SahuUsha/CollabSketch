

const DeleteModel = ({
  roomId,
  roomName,
  onDelete,
  onCancel,
}: {
  roomId: number;
  roomName: string;
  onDelete: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="relative bg-purple-800/10 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 w-full max-w-md mx-auto text-white shadow-lg">
      <h1 className="text-xl font-semibold mb-4">Delete Room</h1>

      <p className="text-slate-300 mb-4">
        Are you sure you want to delete the room{' '}
        <span className="text-emerald-500 font-semibold">{roomName}</span> with Room ID{' '}
        <span className="text-emerald-500 font-semibold">{roomId}</span>?
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={onDelete}
          className="bg-gradient-to-r bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white  py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 group/button shadow-lg hover:shadow-blue-500/25 hover:shadow-xl font-semibold px-5 py-2 rounded-lg transition-all shadow-md "
        >
          Delete
        </button>
        <button
          onClick={onCancel}
           className="bg-gradient-to-r bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white  py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 group/button shadow-lg hover:shadow-blue-500/25 hover:shadow-xl font-semibold px-5 py-2 rounded-lg transition-all shadow-md "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModel;
