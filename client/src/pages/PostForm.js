import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { usePosts } from '../context/postContext';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export function PostForm() {

  const { getPost, createPost, updatePost } = usePosts()
  const navigation = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: null
  })

  useEffect(() => {
    (async () => {
      if (params.id) {
        const data = await getPost(params.id)
        setPost(data)
      }
    })()
  }, [params.id])

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 p-10 shadow-md shadow-black'>
        <header className='flex justify-between items-center py4 text-white'>
          <h3 className='text-xl'>New Posts</h3>
          <Link to="/" className='text-gray-400 text-ms hover:text-gray-300' >Go Back</Link>
        </header>
        <Formik
          initialValues={{
            title: post.title,
            description: post.description,
            image: post.image
          }}
          validationSchema={Yup.object({
            title:
              Yup.string()
                .required("titulo requerido"),
            description:
              Yup.string()
                .required("Descripcion requerida")
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              console.log(params.id);
              await updatePost(params.id, values)
            } else {
              await createPost(values)
            }
            console.log("papapdpada", values)
            actions.setSubmitting(false)
            navigation('/')
          }}
          enableReinitialize={true}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit} >
              <label htmlFor='title' className='text-m block font-bold text-gray-400'>
                Title
              </label>
              <Field
                name='title'
                placeholder='title'
                className='mb-10 px-3 py-4 focus:outline-none rounded bg-gray-600 text-white w-full'
              />
              <ErrorMessage
                component='p'
                name='title'
                className='text-red-400 text-sm'
              />
              <label htmlFor='description'
                className='text-m block font-bold text-gray-400'>
                Descripcion
              </label>
              <Field
                component="textarea"
                name='description'
                placeholder='description'
                className='mb-10 px-3 py-4 focus:outline-none rounded bg-gray-600 text-white w-full'
                rows={3}
              />
              <ErrorMessage
                name='description'
                className='text-red-400 text-sm'
                component='p'
              />

              <label htmlFor='description'
                className='text-m block font-bold text-gray-400'>
                Subir imagen
              </label>
              <input
                type="file"
                name='image'
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                onChange={(e) => setFieldValue('image', e.target.files[0])}
              />
              <button type='submit' className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2 
                rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className='animate-spon h-5 w-5' />
                ) : (
                  'Save'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}


