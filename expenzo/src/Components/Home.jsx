import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/Images/Logo1.png";
import { gsap } from "gsap";

const Home = () => {
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const loginFormRef = useRef(null);
  const signUpFormRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // initial landing animation
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power1.out" },
      delay: 1.5,
    });

    tl.to(logoRef.current, {
      x: 120,
      y: -45,
      duration: 0.6,
      ease: "circ.out",
    })
      .to(headingRef.current, {
        x: -45,
        y: 20,
        duration: 0.4,
        ease: "circ.out",
      })
      .fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.inOut" }
      );
  }, []);

  useEffect(() => {
    if (showLogin && loginFormRef.current) {
      gsap.set(loginFormRef.current, { pointerEvents: "auto", zIndex: 50 });
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "back.out(1.7)" },
      });
      tl.fromTo(
        loginFormRef.current,
        { opacity: 0, y: -20, scale: 0.5 },
        { opacity: 1, scale: 1 }
      );
    }
  }, [showLogin]);

  // showing login form while clicking on get started button
  const handleClick = () => {
    console.log("get started clicked");
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power2.out" },
    });

    tl.to(logoRef.current, {
      y: -250,
      duration: 0.4,
      ease: "power3.out",
    })
      .to(headingRef.current, {
        y: -200,
        duration: 0.2,
        ease: "power3.out",
      })
      .to(btnRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          btnRef.current.style.display = "none";
          setShowLogin(true);
        },
      });
  };

  useEffect(() => {
    if (showSignUp && signUpFormRef.current) {
      gsap.set(signUpFormRef.current, { pointerEvents: "auto", zIndex: 50 });
      gsap.fromTo(
        signUpFormRef.current,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [showSignUp]);

  // switch to signup form
  const handleShowSignUp = () => {
    if (showSignUp) return;

    gsap.to(loginFormRef.current, {
      autoAlpha: 0,
      y: -50,
      duration: 0.5,
      pointerEvents: "none",
      onComplete: () => {
        setShowLogin(false);
        setShowSignUp(true);
      },
    });
  };

  // switch back to login form
  const handleShowLogin = () => {
    if (showLogin) return;

    gsap.to(signUpFormRef.current, {
      autoAlpha: 0,
      y: 50,
      duration: 0.5,
      pointerEvents: "none",
      onComplete: () => {
        setShowSignUp(false);
        setShowLogin(true);
      },
    });
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center">
      <div className="w-96 h-64 z-50 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <img
            ref={logoRef}
            src={Logo}
            alt="expenzo logo"
            loading="lazy"
            className="h-20 w-24"
          />
          <h1 ref={headingRef} className="text-6xl font-bold">
            Expenzo
          </h1>
        </div>
        <button
          type="button"
          onClick={handleClick}
          ref={btnRef}
          className="bg-black h-10 w-36 mt-10 rounded-lg text-lg font-semibold"
        >
          Get started
        </button>
      </div>

      {/* login form */}

      {showLogin && (
        <form
          ref={loginFormRef}
          action=""
          className="absolute top-60 opacity-0 z-10 h-80 flex flex-col items-center justify-around w-96"
        >
          <h2 className="text-3xl font-semibold">Login</h2>
          <div className="flex flex-col w-80 h-32 items-center">
            <input
              className="w-full h-12 text-black rounded-md focus:outline-none p-2"
              type="text"
              placeholder="Username"
            />
            <input
              className="w-full h-12 text-black rounded-md mt-3 focus:outline-none p-2"
              type="password"
              placeholder="password"
            />
            <a href="/" className="underline ml-48">
              Forgot Password?
            </a>
          </div>
          <input
            className="w-80 h-12 text-xl font-semibold cursor-pointer rounded-md bg-black"
            type="submit"
            value="Login"
          />
          <p>
            Don't have an account?{" "}
            <button type="button" onClick={handleShowSignUp}>
              Sign up
            </button>
          </p>
        </form>
      )}

      {/* signup form */}

      {showSignUp && (
        <form
          ref={signUpFormRef}
          action=""
          className="absolute top-52 opacity-0 z-10 h-96 flex flex-col items-center justify-around w-96"
        >
          <h2 className="text-3xl font-semibold">Sign Up</h2>
          <div className="flex flex-col w-80 h-64 items-center justify-around">
            <input
              className="w-full h-12 text-black rounded-md focus:outline-none p-2"
              type="text"
              placeholder="First Name"
            />
            <input
              className="w-full h-12 text-black rounded-md focus:outline-none p-2"
              type="text"
              placeholder="Last Name"
            />
            <input
              className="w-full h-12 text-black rounded-md focus:outline-none p-2"
              type="password"
              placeholder="password"
            />
            <input
              className="w-full h-12 text-black rounded-md focus:outline-none p-2"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <input
            className="w-80 h-12 text-xl mt-3 font-semibold cursor-pointer rounded-md bg-black"
            type="submit"
            value="Sign Up"
          />
          <p>
            Already have an account?{" "}
            <button onClick={handleShowLogin}>Login</button>
          </p>
        </form>
      )}
    </section>
  );
};

export default Home;
