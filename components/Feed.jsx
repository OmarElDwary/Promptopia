"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}
const Feed = () => {

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
    }
    console.log(posts);
    fetchPosts();
  }, []);
  
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return posts.filter((post) => 
      regex.test(post.prompt) || regex.test(post.tag) || regex.test(post.Author.username)
    )
  };
 
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const result = filterPrompts(e.target.value);
        setSearchResults(result);
      }, 300)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const result = filterPrompts(tag);
    setSearchResults(result);
  };

  return (


    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ): (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}

    </section>
  );
};

export default Feed;
