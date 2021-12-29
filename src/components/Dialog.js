import React from "react";
import { Dialog as BaseDialog, Transition } from "@headlessui/react";
import { cx, IconButton } from "@vechaiui/react";
import { XIcon } from "@heroicons/react/outline";

export default function Dialog(props) {
  return (
    <Transition show={props.open} as={React.Fragment}>
      <BaseDialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-modal"
        open={props.open}
        onClose={props.onClose}
      >
        <BaseDialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-600" />
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div
            className={cx(
              "relative flex flex-col w-full mx-auto my-24 rounded shadow-lg",
              "bg-white border border-gray-200",
              "dark:bg-neutral-800 dark:border-neutral-700",
              "max-w-md"
            )}
          >
            <header className="relative px-6 py-5 text-lg font-semibold">
              {props.title}
            </header>
            <IconButton
              onClick={props.onClose}
              className={cx(
                "absolute text-sm cursor-base text-gray-600 dark:text-gray-400 hover:text-primary-500 top-4 right-4"
              )}
              size="xs"
              variant="ghost"
            >
              <XIcon className="w-4 h-4" />
            </IconButton>
            <div className="flex-1 px-6 pb-2">{props.children}</div>
            <footer className="px-6 py-4">{props.actions}</footer>
          </div>
        </Transition.Child>
      </BaseDialog>
    </Transition>
  );
}
