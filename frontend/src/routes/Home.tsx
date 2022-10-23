
import PostsList from '../post/PostList';
import Header from '../Header';

const Home = () => {
    return (
        <div>
            <Header />
            <PostsList count={5} />
        </div>
    );
};

export default Home;