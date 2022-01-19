import { ClassInterface, NonAdminData } from "@lib/types"
import apiFetch from "@lib/utils/api"
import Loading from "components/misc/Loading"
import Class from "components/user/Class"
import { useEffect, useState } from "react"

interface ClassData {
    id: number
}
  
export default function Classes({id}: ClassData) {

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState<ClassInterface[]>([])

    useEffect(() => {
        const fetch = async () => {
            const response = await apiFetch(`/api/classes/${id}`) as {data?: ClassInterface[], message: string}
            if (response.data && !data.length) {
                setData(response.data)
            }
            setLoading(false)
        }

        fetch()
    }, [data, id])

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((x, i) => (
        <Class key={`class-${i}`} data={x.class} className={x.className} />
      ))}
      </div>
    )
}