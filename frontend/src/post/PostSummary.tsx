
import './PostSummary.css';
import { PostData, TagData } from '../helper/types';
import styled from '@emotion/styled';
import useData from '../helper/useData';
import { useEffect, useState, useCallback } from 'react';
import fetchRoute from '../api/fetchRoute';
import { useNavigate } from 'react-router-dom';
import Tag from '../header/Tag';
import safeHTML from '../helper/safeHTML';

const PostSummary = ({ data }: { data: PostData }) => {
    const [tag, setTag] = useState<TagData | null>(null);

    useEffect(() => {
        const getTag = async () => {
            const tag = await fetchRoute(`/posts/${data.postId}/tag`);
            setTag(tag);
        };
        getTag();

    }, [setTag]);

    const navigate = useNavigate();

    const doNavigate = useCallback(() => {
        navigate('/posts/' + data.postId);
    }, [navigate]);

    return (
        <button onClick={doNavigate} className='post-summary' type="button">
            <div className='postHeader'>
                <div className='leftDisplay'>
                    <h2>{data.title}</h2>
                </div>
                <div className='rightDisplay'>
                </div>
            </div>
            <p>{data.content}</p>
            <TagContainer>
                <TagFlag color={tag?.color || '#fff'}>{tag?.tagName}</TagFlag>
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

const TagFlag = styled.div<{ color: string }>`
    background-color: ${(props) => props.color};
    border-radius: 4px;
    padding: 4px;
`;
