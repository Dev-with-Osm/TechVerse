import React, { useEffect, useState } from 'react';
import './style.css';
import { IoIosSearch } from 'react-icons/io';
import PostPage from './components/posts';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTrendingPost = async (term) => {
    const res = await fetch(
      `/api/post/all-posts?limit=9&sort=views&searchTerm=${term}`,
    );
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchTrendingPost(searchTerm);
  }, [searchTerm]);

  const handleSearchClick = () => {
    setSearchTerm(search);
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-5 h-full mb-10">
      <div className="md:w-1/4 border-white/40  md:border-r p-1 md:h-[85vh]">
        <div className="flex justify-center items-center relative w-full mb-5 mx-auto">
          <div
            className="absolute md:right-5 right-10 text-2xl cursor-pointer"
            onClick={handleSearchClick}
          >
            <IoIosSearch />
          </div>

          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-md border-primary w-[90%] border bg-transparent outline-none placeholder:text-primary"
          />
        </div>
        {/* <div className="md:pl-4 pl-6 text-primary-dark flex flex-col gap-2 w-fit">
          <p className="text-primary">Sort by</p>
          <select className="p-1.5 rounded-md">
            <option>Newest</option>
            <option>Latest</option>
            <option>Most Liked</option>
            <option>Most Viewed</option>
          </select>
        </div> */}
      </div>
      <div className="md:w-3/4 md:border md:h-[85vh] border-white/40 md:overflow-y-auto">
        <div className="h-full px-2">
          {posts.length > 0 &&
            posts.map((post) => <PostPage key={post._id} postId={post._id} />)}
          {posts.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="text-primary text-lg">No posts found!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
