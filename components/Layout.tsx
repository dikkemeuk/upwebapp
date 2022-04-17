import Head from "next/head";
import Loading from "./misc/Loading";
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
    <div className="m-0 p-0 bg-gray-500 min-w-full max-h-screen min-h-screen">
      <Head>
        <title>{ head?.title ? `UP - ${head?.title}` : "Uniting People"}</title>
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
      <div className="w-full mb-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
}


