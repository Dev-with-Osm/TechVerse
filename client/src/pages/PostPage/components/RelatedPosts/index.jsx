// RelatedPosts.jsx

import React, { useEffect, useState } from 'react';
import PostItem from '../../../../components/Posts';

export default function RelatedPosts({ hashtags, currentPostId }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchMostLikesPosts = async () => {
      let searchTerm = hashtags || 'test'; // Fallback to 'test' if hashtags is undefined or null
      if (typeof searchTerm !== 'string') {
        searchTerm = String(searchTerm); // Convert to string if not already a string
      }
      const hashtagArray = searchTerm.split(',').filter(Boolean); // Split the hashtags into an array and filter out any empty strings
      const allPosts = []; // Array to collect all posts
      const postIds = new Set(); // Set to keep track of unique post IDs

      for (const hashtag of hashtagArray) {
        try {
          const res = await fetch(
            `/api/post/all-posts?limit=3&searchTerm=${hashtag}`,
          );
          const data = await res.json();
          if (data.length > 0) {
            data.forEach((post) => {
              if (!postIds.has(post._id) && post._id !== currentPostId) {
                // Exclude current post
                postIds.add(post._id);
                allPosts.push(post);
              }
            });
          }
        } catch (error) {
          console.error(`Error fetching posts for hashtag ${hashtag}:`, error);
        }
      }

      // If no related posts found, fetch posts sorted by views
      if (allPosts.length === 0) {
        try {
          const res = await fetch('/api/post/all-posts?limit=3&sort=views');
          const data = await res.json();
          data.forEach((post) => {
            if (post._id !== currentPostId) {
              // Exclude current post
              allPosts.push(post);
            }
          });
        } catch (error) {
          console.error('Error fetching posts sorted by views:', error);
        }
      }

      setRelatedPosts(allPosts.slice(0, 3)); // Update state with only the top 3 collected posts
    };

    fetchMostLikesPosts();
  }, [hashtags, currentPostId]); // Add currentPostId as a dependency to useEffect

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {relatedPosts.length > 0 ? (
        relatedPosts.map((post) => <PostItem id={post._id} key={post._id} />)
      ) : (
        <p>No related posts found.</p>
      )}
    </div>
  );
}
