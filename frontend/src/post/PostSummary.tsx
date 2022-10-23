
import './PostSummary.css';
import { PostData, TagData } from '../helper/types';
import styled from '@emotion/styled';
import useData from '../helper/useData';
import { useEffect, useState } from 'react';
import fetchRoute from '../api/fetchRoute';

const PostSummary = ({ data }: { data: PostData }) => {
    const [tag, setTag] = useState<TagData | null>(null);

    useEffect(() => {
        const getTag = async () => {
            const tag = await fetchRoute(`/posts/${data.postId}/tag`);
            setTag(tag);
        };
        getTag();

    }, [setTag]);

    return (
        <button className='post-summary' type="button">
            <h2>{data.title}</h2>
            <p>{data.content}</p>
            <TagContainer>
                <Tag color={tag?.color || '#fff'}>{tag?.tagName}</Tag>
            </TagContainer>
        </button>
    );
};

export default PostSummary;

const TagContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 4px;
`;

const Tag = styled.div<{ color: string }>`
    background-color: ${(props) => props.color};
    border-radius: 4px;
    padding: 4px;
`;
