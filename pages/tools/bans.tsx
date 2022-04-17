import apiFetch from "@lib/utils/api"
import Layout from "components/Layout"
import Section from "components/Section"

export default function BanPage() {
    return (
        <Layout head={{ title: "Banlog" }}>
            <div className="card shadow bg-gray-800 m-2">
                <div className="card-body">
                    <Section pretitle="">
                        <h1>Banlog</h1>
                        <p>
                            COMING SOON

                            <br />
                            <br />
                        </p>
                        <div className="divider" />

                    </Section>
                </div>
            </div>
        </Layout>
    )
}