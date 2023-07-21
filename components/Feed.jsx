"use client"

import { useState, useEffect } from "react"
import PromptCardList from "./PromptCardList"
import Image from "next/image"

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
    
  const filteredPosts = posts.filter(post => (
    post.creator.username.includes(searchText) || 
    post.tag.includes(searchText) || 
    post.prompt.includes(searchText))
  )
  
  useEffect(() => {
    const fetchpost = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()
      setPosts(data)
    }
    fetchpost()
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      {posts.length > 0 ? (
      <PromptCardList
        data={filteredPosts ? filteredPosts : posts}
      />):(
      <div>
        <Image
          src="assets/icons/loader.svg"
          width={30}
          height={30}
          alt=""
        />
      </div>)}
    </section>
  )
}

export default Feed