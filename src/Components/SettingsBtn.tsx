/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineLanguage } from "react-icons/md";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { BsMoon } from "react-icons/bs";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../Pages/Guest/SignIn/SignIn.service";
import { LoginContext } from "./Context/LoginCtxProvider";
import { StyledModal, Backdrop } from "./utils/types";

export default function SettingsBtn() {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const loginCtx = useContext(LoginContext);
  const [darkMode, setDarkMode] = useState<boolean>();

  useEffect(() => {
    setDarkMode(localStorage.theme === "dark");
  }, []);

  const handleDarkModeChange = () => {
    window.document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
    loginCtx.setDarkMode(!darkMode);
  };

  return (
    <>
      {!showModal && (
        <button
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 outline-none focus:outline-none bg-white text-slate-700 text-3xl shadow-center dark:shadow-none rounded-full z-50"
          onClick={() => setShowModal(true)}
          data-modal-toggle="defaultModal"
        >
          <AiOutlineSetting />
        </button>
      )}

      <StyledModal
        open={showModal}
        onClose={() => setShowModal(false)}
        BackdropComponent={Backdrop}
        className="backdrop-blur-sm"
      >
        <Box className="w-100 bg-transparent inset-0">
          <button
            type="button"
            className="fixed inline-flex items-center justify-center w-11 h-11 top-4 right-2 outline-none focus:outline-none bg-slate-600 dark:bg-slate-700 text-white text-3xl shadow-lg rounded-full z-50"
            onClick={() => setShowModal(false)}
            data-modal-toggle="defaultModal"
          >
            <AiOutlineSetting />
          </button>
          <div className="fixed w-screen top-12 left-0 z-10">
            <div className="w-72 mx-auto my-3 bg-white w-100 dark:bg-black rounded-3xl shadow-2xl relative flex flex-col p-3 outline-none focus:outline-none">
              <div className="flex flex-row my-3 justify-between gap-14">
                <div className="flex flex-row">
                  <div className="mr-4 text-2xl dark:text-white my-auto">
                    <MdOutlineLanguage />
                  </div>
                  <p className="text-blueGray-500 dark:text-white text-lg font-medium leading-relaxed">
                    {t("language")}
                  </p>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    i18n.changeLanguage("fr");
                    setShowModal(false);
                  }}
                  className="flex flex-row"
                >
                  <p className="text-slate-500 text-md dark:text-slate-400 mx-2 leading-7">
                    {t("french")}
                  </p>
                  <div className="text-lg my-auto">
                    <ReactCountryFlag countryCode="FR" />
                  </div>
                </div>
              </div>

              <div className="flex flex-row my-3 justify-between gap-14">
                <div className="flex flex-row">
                  <div className="mr-4 text-2xl dark:text-white my-auto">
                    <MdOutlineLanguage />
                  </div>
                  <p className="text-blueGray-500 dark:text-white text-lg font-medium leading-relaxed">
                    {t("language")}
                  </p>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    i18n.changeLanguage("en");
                    setShowModal(false);
                  }}
                  className="flex flex-row"
                >
                  <p className="text-slate-500 text-md dark:text-slate-400 mx-2 leading-7">
                    {t("english")}
                  </p>
                  <div className="text-lg my-auto">
                    <ReactCountryFlag countryCode="US" />
                  </div>
                </div>
              </div>

              <div className="flex flex-row my-3 justify-between gap-14">
                <div className="flex flex-row">
                  <div className="mr-4 text-xl dark:text-white my-auto">
                    <BsMoon />
                  </div>
                  <p className="text-blueGray-500 dark:text-white text-lg font-medium leading-relaxed">
                    Dark Mode
                  </p>
                </div>
                <div className="flex justify-center form-check form-switch">
                  <input
                    className="form-check-input appearance-none w-12 -ml-10 rounded-full float-left h-6 bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={darkMode}
                    onChange={handleDarkModeChange}
                  />
                </div>
              </div>

              <div className="flex flex-row my-3 justify-between gap-14">
                {loginCtx.isLoggedIn ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      logout(loginCtx.setUser, loginCtx.setIsLoggedIn);
                    }}
                    className="flex flex-row"
                  >
                    <div className="mr-4 text-2xl dark:text-white my-auto">
                      <BiLogOut />
                    </div>
                    <p className="text-blueGray-500 dark:text-white text-lg font-medium leading-relaxed">
                      {t("logout")}
                    </p>
                  </div>
                ) : (
                  <Link to="/login">
                    <div className="flex flex-row">
                      <div className="mr-4 text-2xl dark:text-white my-auto">
                        <BiLogIn />
                      </div>
                      <p className="text-blueGray-500 dark:text-white text-lg font-medium leading-relaxed">
                        {t("login")}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Box>
      </StyledModal>
    </>
  );
}
