"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import React from "react";
import CodeEditor from "./mycode/page";

export default function Home() {
  const code = `
    export default function ExampleComponent() {
      return (
        <div>
          <h1>Hello, World!</h1>
        </div>
      );
    }
  `;

  return (
    <>
      <h2>Hello World</h2>
      <div className="container">


        <TabGroup>
          <TabList>
            <Tab className={"py-2 px-4  border  mx-2 bg-gray-200"}>Tab 1</Tab>
            <Tab className={"py-2 px-4  border  mx-2 bg-gray-200"}>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Content 1</TabPanel>
            <TabPanel>
              <div className="w-1/2">
                <CodeEditor code={code} />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi aliquam blanditiis provident earum? Delectus vero sed
                placeat ea voluptatibus molestias.
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        
      </div>
    </>
  );
}
