"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 1000);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.Author._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.Author._id}?name=${post.Author.username}`);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between gap-5 items-center">
        <div className="flex-1 items-center gap-2" onClick={handleProfileClick}>
          <Image
            src={post.Author.image}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold font-satoshi text-gray-800">
              {post.Author.username}
            </h3>
            <p className="text-sm text-gray-400 font-inter">
              {post.Author.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="Copy"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-900">{post.prompt}</p>
      <p
        className="text-sm text-blue-400 font-inter cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.Author._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-blue-800 pt-3">
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-900 cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
