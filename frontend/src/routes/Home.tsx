
import PostsList from '../post/PostList';
import Header from '../Header';

const Home = () => {
    return (
        <div>
            <PostsList count={5} />
        </div>
    );
};

export default Home;