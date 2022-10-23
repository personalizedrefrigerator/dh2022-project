import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import fetchRoute from "../api/fetchRoute";
import safeHTML from "../helper/safeHTML";
import { PostData } from "../helper/types";

export async function postLoader({ params }: any) {
    const data = await fetchRoute('/post/' + params.postId);
    return data as PostData;
}

const PostView = ({ params }: {params?: any}) => {
    const id = params?.postId ?? null;
    const postData = useLoaderData() as PostData|null;

    const [ contentView, setContentView ] = useState<HTMLDivElement|null>(null);
    useEffect(() => {
        if (!contentView) return;
        contentView.innerHTML = safeHTML(postData?.content) ?? 'No content.';
    }, [contentView]);

    return (
        <>
            <h1>{postData?.title}</h1>
            <div ref={setContentView}>
                {postData?.content}
            </div>
        </>
    )
};

export default PostView;