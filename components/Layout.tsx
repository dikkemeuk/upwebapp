import Head from "next/head";
import Footer from "./navigation/Footer";
import NavBar from "./navigation/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  loading?: boolean;
  head?: HeadProps;
}

interface HeadProps {
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  loading = false,
  head,
}: LayoutProps) {
  return (
    <div className="m-0 p-0 bg-gray-500 min-w-full min-h-screen">
      <Head>
        <title>{head?.title || "Uniting People"}</title>
        <meta
          name="description"
          content={
            head?.description ||
            "The official website of the Call of Duty 2™ Zombies community."
          }
        ></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>

      <NavBar />
      <div className="mx-2 my-1">{loading ? <Loading /> : children}</div>
      <div className="w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
}

const Loading = () => (
  <div className="flex flex-col items-center justify-center h-auto w-auto">
    <div className="w-full max-w-md">
      <div className="card w-auto h-auto shadow bg-gray-800 m-2">
        <div className="card-body">
          <div className="card-title grid grid-cols-2 w-full">
            <span>Loading...</span>
            <div className="w-8 h-8 border-4 border-white border-r-transparent rounded-full animate-spin"></div>
          </div>
          <span>The page is loading, be patient please.</span>
        </div>
      </div>
    </div>
  </div>
);
