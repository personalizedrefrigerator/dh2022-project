
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import fetchRoute from '../api/fetchRoute';

import PostSummary from './PostSummary';
import { PostData } from './types';

const Posts = ({ count }: { count: number }) => {
    const [ postData, setPostData ] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let data: PostData[]|undefined;

            try {
                data = await fetchRoute(`/posts`);///${count}`);
            } catch(e) {
                console.warn('unable to fetch data!', e);
            }

            if (!data) {
                return;
            }

            // null == undefined
            // null === undefined
            if (data['length'] === undefined) {
                throw new Error('Not an array');
            }
            
            setPostData(data);
        };
        fetchData();
    }, [setPostData, count]);

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