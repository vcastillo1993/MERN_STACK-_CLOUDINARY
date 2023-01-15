
import { usePosts } from "../context/postContext"
import { VscEmptyWindow } from 'react-icons/vsc'
import { Link } from "react-router-dom"
import { PostCard } from "../components/PostCard"

export function HomePage() {

  const { post } = usePosts()

  if (post.length === 0) return (
    <div className="flex flex-col justify-center items-center">
      <Link to='/new' className="text-white text-2x1">CREATE POST</Link>
      <VscEmptyWindow className="w-48 h-48 text-white" />
      <h1 className="text-white text-2xl">there are no posts</h1>
    </div>
  )
  return (
    <div className="text-white">
      <header className="flex justify-between py-4 ">
        <h1 className="txt-2xl text-gray-300 font-bold">POSTS {post.length}</h1>
        <Link to='/new' className="px- py-2 bg-indigo-500 hover:bg-indigo-600 text-white">CREATE POST</Link>
      </header>
      <div className="grid grid-cols-3 gap-2">
        {post.map(posts => (
          <PostCard post={posts} key={posts._id} />
        ))
        }
      </div>
    </div>
  )
}


