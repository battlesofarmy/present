// This file does NOT have "use client" at the top.

import ClientComponent from "@/components/ClientCom";

export default async function ServerComponent() {
  const data = ["fahim", "johfa", "tohfa"];

  return (
    <div>
      <h1>Server-rendered content</h1>
      <ClientComponent />
    </div>
  );
}
