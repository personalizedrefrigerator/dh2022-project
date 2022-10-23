
import './PostSummary.css';
import { PostData } from '../helper/types';

const PostSummary = ({ data }: { data: PostData }) => {
    return (
        <div className='post-summary'>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
        </div>
    );
};

export default PostSummary;