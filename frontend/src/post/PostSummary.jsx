
import './PostSummary.css';

const PostSummary = ({ data }) => {
    return (
        <div className='post-summary'>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
        </div>
    );
};

export default PostSummary;