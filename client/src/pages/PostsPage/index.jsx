import React, { useEffect, useState } from 'react';
import './style.css';
import { IoIosSearch } from 'react-icons/io';
import PostPage from './components/posts';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);

  const fetchTrendingPost = async (term) => {
    setShowMore(false);
    const res = await fetch(
      `/api/post/all-posts?limit=9&sort=views&searchTerm=${term}`,
    );
    const data = await res.json();
    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
    setPosts(data);
  };

  useEffect(() => {
    document.title = 'TechVerse - Posts';
    fetchTrendingPost(searchTerm);
  }, [searchTerm]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-5 h-full mb-10">
      <div className="md:w-1/4 border-white/40   md:border-r p-1 md:h-[85vh]">
        <form
          onSubmit={handleSearchClick}
          className="flex justify-center items-center relative w-full mb-5 mx-auto"
        >
          <button className="absolute md:right-5 right-10 text-2xl cursor-pointer">
            <IoIosSearch />
          </button>

          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-md border-primary w-[90%] border bg-transparent outline-none placeholder:text-primary"
          />
        </form>
        {/* </div> */}
      </div>
      <div className="md:w-3/4 md:border md:h-[85vh] rounded-lg border-white/40 md:overflow-y-auto">
        <div className="h-full px-2">
          {posts.length > 0 &&
            posts.map((post) => <PostPage key={post._id} postId={post._id} />)}
          {posts.length === 0 && (
            <div className="flex items-center justify-center h-screen md:h-[85vh]">
              <p className="text-primary text-lg">No posts found!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
