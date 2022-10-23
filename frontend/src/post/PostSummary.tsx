
import './PostSummary.css';
import { PostData } from '../helper/types';

const PostSummary = ({ data }: { data: PostData }) => {
    return (
        <button className='post-summary' type="button">
            <h2>{data.title}</h2>
            <p>{data.content}</p>
        </button>
    );
};

export default PostSummary;