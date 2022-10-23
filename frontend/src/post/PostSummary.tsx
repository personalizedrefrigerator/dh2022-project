
import './PostSummary.css';
import { PostData } from '../helper/types';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const PostSummary = ({ data }: { data: PostData }) => {
    const navigate = useNavigate();

    const doNavigate = useCallback(() => {
        navigate('/posts/' + data.postId);
    }, [navigate]);

    return (
        <button onClick={doNavigate} className='post-summary' type="button">
            <h2>{data.title}</h2>
            <p>{data.content}</p>
        </button>
    );
};

export default PostSummary;