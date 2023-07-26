"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user?.id) {
        const res = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await res.json();
        setPosts(data);
      }
    };

    if (session) {
      fetchPosts();
    }
  }, [session]);

  const handleDelete = async (post) => {
    const isConfirmed = confirm("Are you sure you want to delete this post?");
    if (isConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        setPosts(posts.filter((p) => p._id !== post._id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  return (
    <div>
      <Profile
        name="My"
        description="Welcome to your personalized profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
