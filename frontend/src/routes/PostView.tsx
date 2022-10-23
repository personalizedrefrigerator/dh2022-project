import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import fetchRoute from "../api/fetchRoute";
import { PostData } from "../helper/types";

const safeHTML = (data: string|null|undefined) => {
    if (data === null || data === undefined) {
        return null;
    }

    return data.replace(/[>]/g, '&gt;').replace(/[<]/g, '&lt;');
};

export async function postLoader({ params }: any) {
    const data = await fetchRoute('/post/' + params.postId);
    return data as PostData;
}

const PostView = ({ params }: {params?: any}) => {
    const id = params?.postId ?? null;
    const postData = useLoaderData() as PostData|null;

    return (
        <>
            <h1>{safeHTML(postData?.title)}</h1>
            <div>
                {safeHTML(postData?.content)}
            </div>
        </>
    )
};

export default PostView;