
import './PostSummary.css';
import { PostData } from '../helper/types';
import Tag from '../header/Tag';

const PostSummary = ({ data }: { data: PostData }) => {
    return (
        <button className='post-summary' type="button">
            <div className='postHeader'>
                <div className='leftDisplay'>
                    <h2>{data.title}</h2>
                </div>
                <div className='rightDisplay'>
                    <Tag/>
                </div>
            </div>
            <p>{data.content}</p>
        </button>
    );
};

export default PostSummary;