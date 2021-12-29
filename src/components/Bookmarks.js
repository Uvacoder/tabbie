import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import * as ContextMenu from "@radix-ui/react-context-menu";
import Bookmark from "../components/Bookmark";
import { cx, Icon, Input, Button } from "@vechaiui/react";
import Dialog from "./Dialog";

export default function Bookmarks(props) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [curEdit, setCurEdit] = useState(null);
  return (
    <div className="transition-all grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 2xl:grid-cols-10 gap-3">
      <Dialog
        actions={
          <Button
            color="primary"
            onClick={() => {
              setShowEditDialog(false);
              props.onEditBookmark(curEdit, props.editBookmarkVal.idx);
            }}
          >
            Complete
          </Button>
        }
        title="Edit Bookmark"
        onClose={() => setShowEditDialog(false)}
        open={showEditDialog}
      >
        <div>
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
      </Dialog>
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
                onClick={() => {
                  props.onSetEditBookmarkVal({ ...value, idx: index });
                  setShowEditDialog(true);
                  setCurEdit(value);
                }}
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
