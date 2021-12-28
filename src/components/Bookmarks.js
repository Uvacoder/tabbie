import React, { useState } from "react";
import { PencilIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import * as ContextMenu from "@radix-ui/react-context-menu";
import Bookmark from "../components/Bookmark";
import { cx, Icon, Input, Button } from "@vechaiui/react";
import { Dialog, Transition } from "@headlessui/react";

export default function Bookmarks(props) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [curEdit, setCurEdit] = useState(null);
  return (
    <div className="transition-all grid grid-cols-8">
    <Transition show={showEditDialog} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-modal"
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
      >
        <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-600" />
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
              Edit Bookmark
            </header>
            <button
              onClick={() => setShowEditDialog(false)}
              className={cx(
                "absolute text-sm cursor-base text-gray-600 dark:text-gray-400 hover:text-primary-500 top-4 right-4"
              )}
            >
              <XIcon className="w-4 h-4" />
            </button>
            <div className="flex-1 px-6 py-2">
              <p className="text-base font-normal text-neutral-500 mb-3">
                Please provide bookmark information.
              </p>
              <Input
                placeholder="Name"
                className="mb-3"
                onChange={(e) =>
                  props.onSetEditBookmarkVal({
                    ...props.editBookmarkVal,
                    name: e.target.value
                  })
                }
                value={props.editBookmarkVal.name}
              />
              <Input
                placeholder="Link"
                onChange={(e) =>
                  props.onSetEditBookmarkVal({
                    ...props.editBookmarkVal,
                    link: e.target.value
                  })
                }
                value={props.editBookmarkVal.link}
              />
            </div>
            <footer className="px-6 py-4">
              <Button
                color="primary"
                onClick={() => {
                  setShowEditDialog(false);
                  props.onEditBookmark(curEdit, props.editBookmarkVal.idx);
                }}
              >
                Complete
              </Button>
            </footer>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
      {props.bookmarks.map((value, index) => {
        return (
          <ContextMenu.Root key={index}>
            <ContextMenu.Trigger>
              <Bookmark name={value.name} link={value.link} key={index} />
            </ContextMenu.Trigger>
            <ContextMenu.Content
              className={cx(
                "w-32 py-1 rounded-md shadow-sm outline-none",
                "bg-white border border-gray-200",
                "dark:bg-neutral-800 dark:border-gray-700"
              )}
              alignOffset={-150}
            >
              <ContextMenu.Item
                className={cx(
                  "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none",
                  "focus:bg-neutral-100",
                  "dark:focus:bg-neutral-700"
                )}
                onClick={() => { props.onSetEditBookmarkVal({...value, idx: index}); setShowEditDialog(true); setCurEdit(value);  }}
              >
                <Icon
                  as={PencilIcon}
                  label="arrows-expand"
                  className="w-4 h-4 mr-2"
                />
                <span className="flex-1 mr-2">Edit</span>
              </ContextMenu.Item>
              <ContextMenu.Item
                className={cx(
                  "flex items-center w-full px-3 h-8 flex-shrink-0 text-sm text-left cursor-base focus:outline-none",
                  "focus:bg-neutral-100 dark:focus:bg-neutral-700"
                )}
                onClick={() => {
                  props.onDeleteBookmark(value);
                }}
              >
                <Icon
                  as={TrashIcon}
                  label="duplicate"
                  className="w-4 h-4 mr-2"
                />
                <span className="flex-1 mr-2">Delete</span>
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        );
      })}
    </div>
  );
}
