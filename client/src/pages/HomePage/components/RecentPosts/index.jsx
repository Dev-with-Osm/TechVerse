import React, { useEffect, useState } from 'react';
import PostItem from '../../../../components/Posts';

export default function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    const fetchMostLikesPosts = async () => {
      const res = await fetch('/api/post/all-posts?limit=3&sort=createdAt');
      const data = await res.json();
      setRecentPosts(data);
    };
    fetchMostLikesPosts();
  }, []);
  return (
    <div className="my-10 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-8 md:gap-x-16">
        {recentPosts &&
          recentPosts.map((post) => (
            <PostItem PostItem={post} id={post._id} key={post._id} />
          ))}
      </div>
    </div>
  );
}
