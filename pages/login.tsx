import apiFetch from "@lib/utils/api";
import { setUser } from "@lib/utils/user";
import Layout from "components/Layout";
import { useRouter } from "next/router";

export default function Login() {

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    
        const username = data.get("username") as string;
        const password = data.get("password") as string;
    
        if (username && password) {
          const res = await apiFetch<{message:string, data?: {id: number, username: string, rights: number}}>("/api/auth/login", {method: "POST", body: JSON.stringify({username, password})});
          if(res.data) {
            setUser(res.data);
            router.push("/");
          }
        }
    } 
      
    return (
        <Layout>
            <div className="items-center justify-center">
            <div className="card shadow bg-gray-800 m-2 max-w-xs items-center">
            <form className="p-2 m-2" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="input-group mb-3">
                  <span>Username</span>
                  <input
                    required
                    type="text"
                    placeholder="user1"
                    className="input input-bordered"
                    name="username"
                  />
                </label>
                <label className="input-group">
                  <span>Password</span>
                  <input
                    required
                    type="password"
                    placeholder="********"
                    className="input input-bordered"
                    name="password"
                  />
                </label>
              </div>

              <div className="modal-action">
              <button type="submit" className="btn bg-green-600 border-green-600">
                Log in
              </button>
              <a href={`${router.pathname}`} className="btn bg-red-800">
                Cancel
              </a>
            </div>
            </form>
            </div>
          </div>
        </Layout>
    )
}