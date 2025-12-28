import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState<boolean>(false);

  const toggleMenu = (): void => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    //{ name: "DOMAINS", path: "/domain" },
    { name: "DASHBOARD", path: "/dashboard" },
    { name: "DISCORD", path: "https://discord.gg/9ZhvDdgS" },
    { name: "FAQS", path: "/faqs" },
  ];

  const navLinksMobile = [
    { name: "HOME", path: "/" },
    //{ name: "DOMAINS", path: "/domain" },
    { name: "DASHBOARD", path: "/dashboard" },
    { name: "DISCORD", path: "https://discord.gg/9ZhvDdgS" },
    { name: "PROFILE", path: "/profile" },
    { name: "FAQS", path: "/faqs" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const item = {
    hidden: { x: -40, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { x: -40, opacity: 0 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { x: "-100%", transition: { duration: 0.3 } },
  };

  return (
    <>
      <div
        className={`fixed w-[100vw] h-[8vh] overflow-hidden font-press-start z-30 sm:px-6 px-4 py-10 pt-16 lg:justify-around justify-between items-center flex transition-colors duration-300 ${
          scrolled ? "bg-black bg-opacity-90" : "bg-transparent"
        }`}
      >
        <img src="IEEE-CS.svg" className="h-[8vh] hidden lg:block" />

        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() =>
              link.name === "DISCORD"
                ? window.open(link.path, "_blank")
                : navigate(link.path)
            }
            className={`${
              isActive(link.path)
                ? "text-[#F87D10] underline"
                : "text-white hover:text-[#F87D10] hover:underline"
            } text-2xl hidden lg:block`}
          >
            {link.name}
          </button>
        ))}

        <button
          className="z-50 transition-all duration-500 ease-in-out lg:hidden"
          onClick={toggleMenu}
        >
          <img
            src={isOpen ? "navbar2.svg" : "navbar.svg"}
            className="h-[5vh]"
            alt="menu"
          />
        </button>

        <img
          src="IEEE-CS.svg"
          className="h-[5vh] sm:h-[7vh] relative lg:hidden"
        />

        <button
          onClick={() => navigate("/profile")}
          className="ring-2 ring-[#F8B95A] rounded-md shadow-red-glow flex flex-wrap text-white lg:text-xl text-xs px-2 gap-x-4 mr-3 sm:mr-0 lg:h-14 lg:w-16 h-[5vh] w-[5vh] border border-solid border-[#F8B95A] bg-[#F8B95A] bg-opacity-50 items-center justify-center relative  lg:left-[0vw]"
        >
          <img
            className="w-6 h-6 sm:h-8 sm:w-8 "
            src="profile.png"
            alt="profile"
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-70"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 z-40 w-full h-full bg-black sm:w-80"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <motion.img
                src="IEEE-CS.svg"
                className="h-[5vh]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              <div className="flex items-center gap-4">
                <motion.button
                  className="flex items-center justify-center text-white"
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src="navbar2.svg" className="h-[4vh]" alt="close menu" />
                </motion.button>
              </div>
            </div>

            <motion.nav
              className="p-8 pt-12"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <ul className="space-y-8">
                {navLinksMobile.map((link) => (
                  <motion.li
                    key={link.name}
                    variants={item}
                    onClick={() => {
                      if (link.name === "DISCORD") {
                        window.open(link.path, "_blank");
                      } else {
                        navigate(link.path);
                        toggleMenu();
                      }
                    }}
                    className={`cursor-pointer text-xl sm:text-2xl font-press-start transition-colors duration-300 ${
                      isActive(link.path)
                        ? "text-[#F87D10] underline"
                        : "text-white hover:text-[#F87D10] hover:underline"
                    }`}
                  >
                    {link.name}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="absolute bottom-10 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F87D10] to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
