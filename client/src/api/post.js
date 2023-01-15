import axios from 'axios'

export const getPostsRequests = async () => await axios.get('/posts')

export const getPostRequest = async (id) => await axios.get('/posts/' + id)

export const createPostRequest = async (posts) => {
  const form = new FormData()
  
  for (let key in posts){
    form.append(key, posts[key])
  }

  return await axios.post('/posts', form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }) 
}

export const deletePostRequest = async (id) => await axios.delete('/posts/'+ id)

export const updatePstRequest = async (id, newFields) =>
    await axios.put(`/posts/${id}`,newFields)