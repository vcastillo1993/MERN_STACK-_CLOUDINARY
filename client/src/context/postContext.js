import { useState, createContext, useContext } from "react"
import {
  createPostRequest,
  getPostsRequests,
  getPostRequest,
  deletePostRequest,
  updatePstRequest
} from "../api/post"
import { useEffect } from "react"

const postContext = createContext()

export const usePosts = () => {
  const context = useContext(postContext)
  return context
}

export const PostProvider = ({ children }) => {

  const [post, setPost] = useState([])
  //console.log(post);
  const getPosts = async () => {
    const res = await getPostsRequests()
    setPost(res.data)
  }

  const createPost = async (value) => {
    try {
      const res = await createPostRequest(value)
      console.log(res.data);
      setPost([...post, res.data])
    } catch (error) {
      console.log(error);
    }

  }

  const deletePost = async (id) => {
    try {
      await deletePostRequest(id)
      setPost(post.filter((posts) => posts._id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  const getPost = async (id) => {
    const res = await getPostRequest(id)
    return res.data
  }

  const updatePost = async (id, newPosts) => {
    const res = await updatePstRequest(id, newPosts)
    console.log("RESSS", res)
    setPost(post.map((posts) => posts._id === id ? res.data : posts))
  }

  useEffect(() => {
    getPosts()
  }, [])

  console.log('valor del posts =>', post);
  return <postContext.Provider
    value={{
      post,
      getPosts,
      getPost,
      createPost,
      deletePost,
      updatePost
    }}
  >
    {children}
  </postContext.Provider>
}