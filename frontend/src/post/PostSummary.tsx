
import './PostSummary.css';
import { PostData } from '../helper/types';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Tag from '../header/Tag';
import safeHTML from '../helper/safeHTML';

const PostSummary = ({ data }: { data: PostData }) => {
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
        </button>
    );
};

export default PostSummary;