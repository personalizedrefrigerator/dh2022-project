
import { useMemo } from 'react';
import useData from '../helper/useData';

import PostSummary from './PostSummary';
import { PostData } from '../helper/types';

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
            { posts.length === 0 ? 'There are no posts ☹' : posts }
        </div>
    );
};

export default Posts;