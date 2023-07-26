"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-13">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={40}
          height={40}
          className="object-contain"
          alt="logo"
        />
        <p className="logo_text">Promptly</p>
      </Link>
      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create
            </Link>
            <button className="black_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile" className="flex gap-2 flex-center">
              <Image
                src={session?.user?.image}
                width={40}
                height={40}
                className="rounded-full object-contain"
                alt="logo"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="black_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={40}
              height={40}
              className="object-contain"
              alt="profile"
              onClick={(prev) => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create
                </Link>
                <button
                  className="black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="mt-5 w-full black_btn"
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
