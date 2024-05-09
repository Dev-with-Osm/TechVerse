import React from 'react';
import { BsShare } from 'react-icons/bs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ShareButton({
  setSahresLength,
  postId,
  sharesLength,
  notify,
  copied,
}) {
  const sharePost = async () => {
    try {
      const res = await fetch(`/api/post/share/${postId}`);
      const data = await res.json();

      if (data.success === false) {
        console.log(data);
      }
      setSahresLength(sharesLength + 1);
      notify('share');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <CopyToClipboard text={copied}>
        <BsShare
          onClick={sharePost}
          className="hover:fill-blue-500 hover:scale-125 transition-scale transition duration-300 w-5"
        />
      </CopyToClipboard>
      <p className="text-xs">{sharesLength}</p>
    </div>
  );
}
