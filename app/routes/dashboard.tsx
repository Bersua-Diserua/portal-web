import { Outlet } from "@remix-run/react";
import { Sidebar } from "~/components/sidebar";
import { Header } from "~/components/ui/header";

export default function () {
  return (
    <>
      <Header />
      <div className="w-full px-4 mx-auto max-w-8xl">
        <div className="lg:flex">
          <Sidebar />
          <main className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
            <div className="flex w-full">
              <div className="flex-auto max-w-4xl min-w-0 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
