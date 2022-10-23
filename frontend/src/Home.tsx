
import PostsList from './post/PostList';
import Header from './Header';
import Router from './Router';

const Home = ({ router }: { router: Router }) => {
    
    return (
        <div>
            <Header router={router} />
            <PostsList count={5} />
        </div>
    );
};

export default Home;