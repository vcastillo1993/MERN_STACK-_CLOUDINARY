import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "dma0jpbcx",
    api_key: "966351787319613",
    api_secret: "S9wYJ47UWEib7YUGw5e4_Xu0Oxw"
})

/* funcion para subir ha claudinary */
export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'pruevas'
    })
}

/* funcion para elminar de claudinary */
export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}