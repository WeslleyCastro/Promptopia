"use client"
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import * as AlertDialog from '@radix-ui/react-alert-dialog';


const PromptCard = ({post, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState("")
  const {data: session} = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  const redirectToProfileUser = () => {
    if(session?.user.id == post.creator._id){
      router.push(`/profile`)
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
    }
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between itens-start gap-5">
        <div 
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={redirectToProfileUser}
        >
          <Image
            className="rounded-full object-contain"
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt 
              ? "/assets/icons/tick.svg" 
              : "/assets/icons/copy.svg"
            }
            width={22}
            height={22}
            alt=""
          />
        </div>
      </div>
      <p 
        className="my-4 font-satoshi text-sm text-gray-700"
      >
        {post.prompt}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer">
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p 
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}  
          >
            Edit
          </p>
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <p className="font-inter text-sm orange_gradient cursor-pointer">
                  Delete
              </p>
           </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="fixed z-10 w-screen h-screen inset-0 bg-black bg-opacity-40"/>
              <AlertDialog.Content className="fixed md:w-[600px] w-full h-fit p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glassmorphism z-10"> 
                <AlertDialog.Title className=" font-semibold">
                  Are you absolutely sure?
                </AlertDialog.Title>
                <AlertDialog.Description className="my-7">
                This action cannot be undone. This will permanently delete your prompt and remove from our servers.
                </AlertDialog.Description>
                <div className="flex flex-end gap-10">
                  <AlertDialog.Cancel asChild>
                    <button className="border rounded-lg px-5 py-1 bg-white bg-opacity-80 text-red-400 font-inter">Cancel</button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button className="border rounded-lg px-5 py-1 bg-white bg-opacity-80 text-green-600 font-inter"
                    onClick={() => handleDelete(post)}>Yes, delete Prompt</button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content> 
            </AlertDialog.Portal>
          </AlertDialog.Root>

        </div>
      )}
    </div> 
  )
}

export default PromptCard