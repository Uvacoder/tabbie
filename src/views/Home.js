import React, { useState } from "react";
import { IconButton, Input, Icon, Button } from "@vechaiui/react";
import {
  SearchIcon,
  SelectorIcon,
  PlusIcon
} from "@heroicons/react/outline";
import * as Popover from "@radix-ui/react-popover";
import axios from "axios";
import { useDetectClickOutside } from "react-detect-click-outside";
import Dialog from "../components/Dialog";
import SearchHeading from "../components/SearchHeading";
import { searchEngines } from "../config";
import Bookmarks from "../components/Bookmarks";

export default function Home() {
  const [currentSearchEngine, setCurrentSearchEngine] = useState(
    JSON.parse(localStorage.getItem("defaultSearchEngine")) || searchEngines[0]
  );
  const [searchEngineConfigOpen, setSearchEngineConfigOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [predict, setPredict] = useState([]);
  const [inputBoxFocus, setInputBoxFocus] = useState(false);
  const [bookmarkInput, setBookmarkInput] = useState({
    name: "",
    link: ""
  });
  const [showDialog, setShowDialog] = React.useState(false);
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );
  const [editBookmarkVal, setEditBookmarkVal] = useState({
    name: "",
    link: ""
  });
  const ref = useDetectClickOutside({
    onTriggered: () => setInputBoxFocus(false)
  });

  const search = (query = null) => {
    if (query !== null && query.replaceAll(" ", "") !== "") {
      window.open(currentSearchEngine.url + query);
      // window.location.href = currentSearchEngine.url + searchQuery;
    } else if (searchQuery.replaceAll(" ", "") !== "") {
      window.open(currentSearchEngine.url + searchQuery);
      // window.location.href = currentSearchEngine.url + query;
    }
  };

  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  const getPredict = (query) => {
    axios
      .get(`https://api.codelife.cc/api/baidu_sugrec/${query}`)
      .then((res) => {
        const tmp = [];
        if (!res.data.data.g) {
          setPredict([]);
          return;
        }
        for (var i = 0; i < res.data.data.g.length; i++) {
          tmp.push(res.data.data.g[i].q);
        }
        setPredict(tmp);
      });
  };

  const addBookmark = () => {
    if (
      bookmarkInput.name.replace(" ", "") === "" ||
      bookmarkInput.link.replace(" ", "") === ""
    ) {
      return;
    } else {
      localStorage.setItem(
        "bookmarks",
        JSON.stringify([
          ...bookmarks,
          { name: bookmarkInput.name, link: bookmarkInput.link }
        ])
      );
      setBookmarks([
        ...bookmarks,
        { name: bookmarkInput.name, link: bookmarkInput.link }
      ]);
    }
  };

  const deleteBookmark = (bookmark) => {
    const tmp = bookmarks.filter((val, idx) => {
      return bookmark.link !== val.link && bookmark.name !== val.name;
    });
    setBookmarks(tmp);
    localStorage.setItem("bookmarks", JSON.stringify(tmp));
    return tmp;
  };

  const editBookmark = (bookmarkOld, idx) => {
    // const tmp = deleteBookmark(bookmarkOld);
    // console.log(idx)
    const tmp = bookmarks;
    tmp.splice(idx, 1, editBookmarkVal);
    setBookmarks(tmp);
    localStorage.setItem("bookmarks", JSON.stringify(tmp));
  };

  return (
    <div className="container mx-auto px-12 mt-24 sm:px-36 sm:mt-36">
      <div className="flex justify-center flex-col">
        <SearchHeading name={currentSearchEngine.name} />
        <div ref={ref} className="transition-all mt-6">
          <Input.Group>
            <Input.LeftElement
              className="mr-100"
              children={
                <Popover.Root
                  open={searchEngineConfigOpen}
                  onOpenChange={() => {
                    setSearchEngineConfigOpen(!searchEngineConfigOpen);
                  }}
                >
                  <Popover.Trigger>
                    <IconButton variant="ghost">
                      <Icon as={SelectorIcon} className="w-4 h-4" />
                    </IconButton>
                  </Popover.Trigger>
                  <Popover.Content
                    className="py-0 transition-all text-sm font-normal leading-4 break-words bg-white border rounded-md shadow-sm border-neutral-200 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
                    style={{ marginTop: "-135px" }}
                  >
                    {searchEngines.map((value, index) => {
                      return (
                        <div
                          className={`px-4 py-2 m-0 hover:cursor-pointer first:rounded-t last:rounded-b transition-all ${
                            value.name === currentSearchEngine.name
                              ? "bg-teal-500 text-white dark:bg-teal-600"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-600"
                          }`}
                          key={index}
                          onClick={() => {
                            setCurrentSearchEngine(value);
                            setSearchEngineConfigOpen(false);
                            localStorage.setItem(
                              "defaultSearchEngine",
                              JSON.stringify(value)
                            );
                          }}
                        >
                          {value.name}
                        </div>
                      );
                    })}
                  </Popover.Content>
                </Popover.Root>
              }
            />

            <Input
              placeholder={`Search ${currentSearchEngine.name}...`}
              size="xl"
              style={{ paddingLeft: "40px", paddingRight: "40px" }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                getPredict(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") search();
              }}
              onFocus={(e) => {
                setInputBoxFocus(true);
              }}
            />

            <Input.RightElement
              children={
                <IconButton
                  variant="ghost"
                  color="primary"
                  onClick={() => search()}
                >
                  <Icon as={SearchIcon} className="w-4 h-4" />
                </IconButton>
              }
            />
          </Input.Group>
          <div className="max-w-full relative mt-6">
            <div
              className={`rounded z-dropdown w-full mt-2 py-2 bg-neutral-100 dark:bg-neutral-700 shadow transition-all absolute ${
                inputBoxFocus && predict.length ? "" : "hidden"
              }`}
            >
              {predict.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="px-7 py-1 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-600 hover:cursor-pointer"
                    onClick={() => {
                      setSearchQuery(value);
                      search(value);
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
        <h2 className="text-lg mb-5">
          Bookmarks
          <IconButton className="ml-3" size="xs" onClick={handleOpen}>
            <Icon as={PlusIcon} className="w-3.5 h-3.5" />
          </IconButton>
        </h2>
        {bookmarks.length <= 0 ? (
          <p className="text-muted text-sm text-center">
            No bookmarks at this moment. Try adding one!
          </p>
        ) : null}
        <Dialog
          open={showDialog}
          onClose={handleClose}
          actions={
            <Button
              color="primary"
              onClick={() => {
                handleClose();
                addBookmark();
              }}
            >
              Complete
            </Button>
          }
          title="Add Bookmark"
        >
          <div>
            <p className="text-base font-normal text-neutral-500 mb-3">
              Please provide bookmark information.
            </p>
            <Input
              placeholder="Name"
              className="mb-3"
              onChange={(e) =>
                setBookmarkInput({
                  ...bookmarkInput,
                  name: e.target.value
                })
              }
            />
            <Input
              placeholder="Link"
              onChange={(e) =>
                setBookmarkInput({
                  ...bookmarkInput,
                  link: e.target.value
                })
              }
            />
          </div>
        </Dialog>
        <Bookmarks
          bookmarks={bookmarks}
          onDeleteBookmark={deleteBookmark}
          onEditBookmark={editBookmark}
          onSetEditBookmarkVal={setEditBookmarkVal}
          editBookmarkVal={editBookmarkVal}
        />
      </div></div>
    </div>
  );
}
