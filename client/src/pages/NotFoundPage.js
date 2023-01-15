import { usePosts } from "../context/postContext"

export function NotFoundPage() {
    
    const myContext = usePosts()
    console.log(myContext);

    return (
        <div>Not found</div>
    )
}