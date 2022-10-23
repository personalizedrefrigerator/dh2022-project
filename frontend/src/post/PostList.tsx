
import { useMemo } from 'react';
import useData from '../helper/useData';

import PostSummary from './PostSummary';
import { PostData } from '../helper/types';
import styled from '@emotion/styled';

const Posts = ({ count }: { count: number }) => {
    const postData = useData<PostData>('/posts');

    const posts = useMemo(() => {
        const result = [];
        for (const post of postData) {
            result.push(
                <PostSummary key={post.postId} data={post} />
            );
        }
        return result;
    }, [ postData ]);

    return (
        <PostListWrapper>
            { posts.length === 0 ? 'There are no posts ☹' : posts }
        </PostListWrapper>
    );
};

export default Posts;

const PostListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 8px;
`;