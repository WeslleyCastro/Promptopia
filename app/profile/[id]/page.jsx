"use client"

import Profile from "@components/Profile"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const UserProfile= ({ params }) => {
  const [posts, setPosts] = useState([])
  const searchParams = useSearchParams()
  const username = searchParams.get("name")
  
  useEffect(() => {
    const fetchpost = async() => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()

      setPosts(data)
    }

     fetchpost()
  }, [params.id])

  return (
    <div>
        <Profile
          name={username}
          desc="welcome to my profile"
          data={posts}
        />
    </div>
  )
}

export default UserProfile