import { useEffect, useRef } from "react";

export default function TutorialModal(props) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (props.isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    dialog.addEventListener("close", props.onClose);

    return () => {
      dialog.removeEventListener("close", props.onClose);
    };
  }, [props.isOpen, props.onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="p-0 bg-transparent backdrop:bg-black backdrop:opacity-50 backdrop:transition-opacity backdrop:duration-300"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 shadow-2xl max-w-md w-full transform transition-all duration-300 ease-out">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Tutorial</h2>
            <button
              onClick={props.onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors duration-200 hover:scale-110 outline-none focus:outline-none"
            >
              x
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </dialog>
  );
}
