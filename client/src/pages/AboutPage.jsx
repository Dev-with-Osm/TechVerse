import React from 'react';

export default function AboutPage() {
  const postId = '662b5da454f1b42fa59bf51b';
  const handleClick = async () => {
    const res = await fetch('/api/post/like-post', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: postId,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <button onClick={handleClick} className="p-2 bg-gray-500">
        Click
      </button>
    </div>
  );
}
