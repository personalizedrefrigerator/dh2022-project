
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import fetchRoute from '../api/fetchRoute';
import useData from '../helper/useData';

import PostSummary from './PostSummary';
import { PostData } from './types';

const Posts = ({ count }: { count: number }) => {
    const postData = useData<PostData>('/posts');

    const posts = useMemo(() => {
        const result = [];
        for (const post of postData) {
            result.push(
                <PostSummary key={post.id} data={post} />
            );
        }
        return result;
    }, [ postData ]);

    return (
        <div>
            {posts}
        </div>
    );
};

export default Posts;