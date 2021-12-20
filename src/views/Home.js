import React, { useState } from "react";
import { IconButton, Input, Icon, Button } from "@vechaiui/react";
import { SearchIcon, SelectorIcon } from "@heroicons/react/outline";
import * as Popover from "@radix-ui/react-popover";

export default function Home() {
  const searchEngines = [
    {
      name: "Baidu",
      url: "https://www.baidu.com/s?wd="
    },
    {
      name: "Google",
      url: "https://www.google.com/search?q="
    },
    {
      name: "Bing",
      url: "https://www.bing.com/search?q="
    },];
  const [currentSearchEngine, setCurrentSearchEngine] = useState(searchEngines[0]);
  const [searchEngineConfigOpen, setSearchEngineConfigOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const search = () => {
    console.log(searchQuery)
    console.log(currentSearchEngine.url + searchQuery)
    window.open(currentSearchEngine.url + searchQuery)
    // window.location.href = currentSearchEngine.url + searchQuery
  }
  return (
    <div className="container mx-auto px-36 mt-36">
      <div className="flex justify-center flex-col gap-6">
        <div>
          <p className="text-3xl font-mono text-center">
            Tabbie
            <sup>
              <small className="text-base">α</small>
            </sup>
          </p>
          <p className="text-base italic text-center ">Hello, World.</p>
        </div>
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
                  className="py-0 text-sm font-normal leading-4 break-words bg-white border rounded-md shadow-sm border-neutral-200 text-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100"
                  style={{ marginTop: "-135px" }}
                >
                  {searchEngines.map((value, index) => {
                    return (
                      <div
                        className={`px-4 py-2 m-0 hover:cursor-pointer first:rounded-t last:rounded-b ${
                          value.name === currentSearchEngine.name
                            ? "bg-teal-500 text-white dark:bg-teal-600"
                            : "hover:bg-neutral-100 dark:hover:bg-neutral-600"
                        }`}
                        key={index}
                        onClick={() => {
                          setCurrentSearchEngine(value);
                          setSearchEngineConfigOpen(false);
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
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") search() }}
          />

          <Input.RightElement
            children={
              <IconButton variant="ghost" color="primary" onClick={search}>
                <Icon as={SearchIcon} className="w-4 h-4" />
              </IconButton>
            }
          />
        </Input.Group>
      </div>
    </div>
  );
}
