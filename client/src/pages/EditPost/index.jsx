import React, { useEffect, useRef, useState } from 'react';
import { LuPenLine } from 'react-icons/lu';
import { app } from '../../firebase';
import { FaHashtag } from 'react-icons/fa';
import { TiInfoLargeOutline } from 'react-icons/ti';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const { postId } = useParams();
  const [fileUploadPerc, setFileUploadPerc] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: '',
    hashtags: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    body: '',
    image: '',
  });

  let uploadTask = null; // Track upload task directly

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    document.title = 'TechVerse';

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/get-post/${postId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data);
        }
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.body.trim()) {
      newErrors.body = 'Body is required';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'image is required';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const res = await fetch(`/api/post/edit-post/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          author: currentUser,
          authorId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (data.message === false) {
        console.log(data.message);
      }
      navigate(`/post/${data._id}`);
      console.log(data);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      if (file.type.startsWith('image/')) {
        setFiles(file);
      } else {
        setUploadError('Only image files are allowed.');
      }
    }
  };

  const handleSubmitImage = async (e) => {
    if (files !== null) {
      setLoading(true);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + files.name;
      const storageRef = ref(storage, fileName);
      uploadTask = uploadBytesResumable(storageRef, files);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadPerc(Math.round(progress));
        },
        (error) => {
          setUploadError('Image upload failed (must be less than 4 mb)');
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormData({ ...formData, image: downloadUrl });
            setLoading(false);
          });
        },
      );
    } else {
      setUploadError('Select image first');
      setLoading(false);
    }
  };

  const handleCancelUpload = () => {
    try {
      if (uploadTask !== null) {
        uploadTask.cancel();
      }
      setFormData({ ...formData, image: '' });
      setFiles(null);
      setUploadError(false);
      setFileUploadPerc(0);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="p-3 max-w-4xl h-screen mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Edit Post:</h1>
      <form
        onSubmit={handleSubmitPost}
        className="flex bg-[#1C1D1D] border p-5 rounded-md gap-4   flex-col"
      >
        <div className="flex md:flex-row gap-4 flex-col-reverse w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Post title:</label>
              <div className="relative">
                <LuPenLine className="absolute text-lg mt-3.5 ml-3" />
                <input
                  name="title"
                  value={formData.title}
                  disabled={loading}
                  placeholder="your post title"
                  type="text"
                  onChange={handleInputChange}
                  className={`disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md placeholder:text-xs placeholder:text-text-secondary w-full  ${
                    errors.title && ' border-red-500'
                  }`}
                />
                {errors.title && (
                  <p className="text-red-700 text-xs mt-1">{errors.title}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm flex items-center justify-between">
                <label>Post hashtags :</label>
                <div className="tooltip">
                  <span className="text-xl text-white/75 cursor-pointer ">
                    <TiInfoLargeOutline />
                  </span>
                  <span className="tooltiptext">
                    prefix your hashtags with the '#' symbol to indicate them as
                    hashtags. For example, '#travel' or '#foodie'
                  </span>
                </div>
              </div>
              <div className="relative">
                <FaHashtag className="absolute text-lg mt-3.5 ml-3" />
                <input
                  disabled={loading}
                  onChange={handleInputChange}
                  placeholder="your post hashtags"
                  type="text"
                  name="hashtags"
                  value={formData.hashtags}
                  className="disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-10 rounded-md placeholder:text-xs placeholder:text-text-secondary w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Post body:</label>

              <textarea
                name="body"
                value={formData.body}
                disabled={loading}
                onChange={handleInputChange}
                rows={6}
                placeholder="your post body"
                type="text"
                className="disabled:cursor-not-allowed border border-text-secondary focus:border-0 bg-transparent hover:border-[#755d8c] focus:ring-2 outline-none focus:ring-[#755d8c] duration-300 ease-in-out cursor-pointer py-2.5 pl-5 rounded-md placeholder:text-xs placeholder:text-text-secondary w-full"
              />
              {errors.body && (
                <p className="text-red-700 text-xs">{errors.body}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-3 ">
              <label className="text-sm">Post image:</label>
              <div className="border-dashed border h-56 flex flex-col items-center justify-center">
                {!files && !uploadError && (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex flex-col items-center justify-center h-full w-full relative "
                  >
                    <div
                      className="h-full w-full absolute"
                      style={{
                        backgroundImage: `url(${formData?.image})`,
                        opacity: 0.5,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                      }}
                    ></div>
                    <div className="absolute flex items-center justify-center flex-col">
                      <h1>Drag and Drop Image to Upload</h1>
                      <h1 className="text-text-secondary">Or</h1>
                      <input
                        type="file"
                        multiple={false}
                        onChange={(e) => setFiles(e.target.files[0])}
                        hidden
                        accept="image/*"
                        ref={imageInputRef}
                      />
                      <button
                        className="text-text"
                        type="button"
                        onClick={() => imageInputRef.current.click()}
                      >
                        Select Image
                      </button>
                    </div>
                  </div>
                )}

                {files && fileUploadPerc === 0 && (
                  <p className="text-center">
                    Press the button below to start uploading the image
                  </p>
                )}
                {files && !uploadError && fileUploadPerc === 100 && (
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${formData.image})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                )}
                {files &&
                  !uploadError &&
                  fileUploadPerc > 0 &&
                  fileUploadPerc < 100 && <p>{fileUploadPerc}% Done</p>}
                {uploadError && (
                  <p className="text-xs text-red-600">{uploadError}</p>
                )}
              </div>
              <div className="w-full flex gap-2">
                <button
                  type="button"
                  onClick={handleSubmitImage}
                  className="py-2 border border-green-600 w-full hover:bg-green-800 transition-all rounded-md ease-in-out duration-300 hover:shadow-lg"
                >
                  {loading ? (
                    <div className="flex flex-row gap-2 py-1.5 justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/95 animate-bounce"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-white/95 animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-white/95 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  ) : (
                    'Upload image'
                  )}
                </button>
                <button
                  onClick={handleCancelUpload}
                  type="button"
                  className="py-2 border border-red-400 w-2/4 hover:bg-red-500 transition-all rounded-md ease-in-out duration-300"
                >
                  Cancel
                </button>
              </div>
              {errors.image && (
                <p className="text-red-700 text-xs mt-1">{errors.image}</p>
              )}
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-primary disabled:cursor-not-allowed hover:border-[#755d8c] transition-all duration-300 ease-in-out py-2  w-full rounded-md text-black  hover:bg-text"
        >
          Edit Post
        </button>
      </form>
    </main>
  );
}
