import Layout from "components/Layout";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <Layout>
      <div className="card lg:card-side card-bordered bg-gray-800">
        <div className="card-body">
          <h2 className="card-title">No Access.</h2>
          <p>
            The page you tried to access is not available to you.
            If you believe this to be a mistake, please contact ScreaM.
          </p>
          <div className="card-actions">
            <div className="btn bg-red-800"><Link href={"/"}>Back to homepage</Link></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
