import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ArtworkSearchCard, Header, UserSearchCard } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import searchArt from "../../../services/art.service";
import { Art } from "../../../types/art";
import searchUser from "../../../services/user.service";
import { User } from "../../../types/user";

function LoadingSkeleton() {
  return (
    <div>
      {[1, 2, 3, 4].map((item) => {
        return (
          <div key={item} className="animate-pulse mt-3 mx-2">
            <div className="flex flex-row col-span-5">
              <div className="w-28 h-24 bg-slate-200 rounded-3xl" />
              <div className="overflow-hidden pl-3">
                <div className="flex flex-row justify-between mt-3 mb-2">
                  <div className="h-2 w-32 bg-slate-200 rounded" />
                </div>
                <div className="mt-6 mr-2">
                  <div className="h-2 w-44 bg-slate-200 rounded mb-2" />
                  <div className="h-2 w-44 bg-slate-200 rounded mb-2" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type LocationDataType = {
  oldFilter?: string;
  oldSearch?: string;
};

function Search() {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);

  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [arts, setArts] = useState<Art[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  // filters
  const artsFilters = ["title", "city", "artist"];
  const usersFilters = ["user"];
  const filters = [
    {
      sectionName: "arts",
      sectionFilters: artsFilters,
    },
    {
      sectionName: "users",
      sectionFilters: usersFilters,
    },
  ];
  const currentFilter = useRef<string>("title");
  const submittedFilter = useRef<string>("title");

  // for infinite scroll
  const [hasMore, setHasMore] = useState<boolean>(true);
  const currentPage = useRef<number>(1);

  const setCurrentPage = (page: number) => {
    currentPage.current = page;
  };

  // if the user arrive from details artwork, we recharge his old search
  const location = useLocation().state as LocationDataType;
  useEffect(() => {
    if (location?.oldFilter && location?.oldSearch) {
      currentFilter.current = location?.oldFilter;
      submittedFilter.current = location?.oldFilter;
      setSearch(location?.oldSearch);

      if (artsFilters.includes(submittedFilter.current)) {
        searchArt(
          location?.oldSearch,
          location?.oldFilter,
          currentPage.current,
          setHasMore,
          setArts,
          setIsLoading,
          setCurrentPage
        );
      } else {
        searchUser(
          location?.oldSearch,
          currentPage.current,
          setHasMore,
          setUsers,
          setIsLoading,
          setCurrentPage
        );
      }
    }
  }, [location?.oldFilter, location?.oldSearch]);

  const handleFilterChange = (filter: string) => {
    setOpen(false);
    currentFilter.current = filter;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    if (search !== "") {
      submittedFilter.current = currentFilter.current;
      currentPage.current = 1;
      setHasMore(true);
      setArts(null);
      setUsers(null);

      if (artsFilters.includes(submittedFilter.current)) {
        searchArt(
          search,
          submittedFilter.current,
          currentPage.current,
          setHasMore,
          setArts,
          setIsLoading,
          setCurrentPage
        );
      } else {
        searchUser(
          search,
          currentPage.current,
          setHasMore,
          setUsers,
          setIsLoading,
          setCurrentPage
        );
      }
    }
  };

  const fetchArts = () => {
    searchArt(
      search,
      submittedFilter.current,
      currentPage.current,
      setHasMore,
      setArts,
      setIsLoading,
      setCurrentPage
    );
  };

  const fetchUsers = () => {
    searchUser(
      search,
      currentPage.current,
      setHasMore,
      setUsers,
      setIsLoading,
      setCurrentPage
    );
  };

  const getFilterShow = (filter: string) => {
    return currentFilter.current === filter
      ? "font-medium text-gray-900 block px-4 py-2"
      : "text-gray-500 block px-4 py-2";
  };

  return (
    <div>
      <Header />

      <div className="pb-5">
        <div className="relative z-10 mt-5 mx-3">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <input
            type="text"
            id="search-input"
            className="block p-2 px-10 w-full text-gray-900 bg-gray-50 rounded-xl border border-gray-300 sm:text-sm focus:ring-gray-500 focus:border-gray-50"
            placeholder={
              artsFilters.includes(currentFilter.current)
                ? t("search.arts")
                : t("search.users")
            }
            value={search}
            onChange={handleInputChange}
          />

          <div className="flex absolute inset-y-0 right-8 items-center pr-3 text-gray-500">
            <button type="button" id="search-button" onClick={handleClick}>
              {t("ok")}
            </button>
          </div>

          <div className="flex absolute inset-y-0 right-0 items-center pr-3 text-gray-500">
            <button
              type="button"
              className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              id="menu-button"
              onClick={() => setOpen(!open)}
            >
              <FilterListIcon />
            </button>
          </div>

          {open && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filters.map((section, index) => {
                return (
                  <div
                    key={section.sectionName}
                    className={index === 0 ? "py-1" : "py-1 border-t-2"}
                  >
                    <div className="px-4 py-2 text-lg text-gray-700">
                      {t(`search.${section.sectionName}`)}
                    </div>
                    {section.sectionFilters.map((filter) => {
                      return (
                        <button
                          key={filter}
                          type="button"
                          className={getFilterShow(filter)}
                          id={`menu-item-${filter}`}
                          onClick={() => handleFilterChange(filter)}
                        >
                          {t(`filter.${filter}`)}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {arts && (
          <div className="mx-3 -mt-2 pt-3 pb-3 mb-24 z-0 border border-gray-300 bg-gray-100 drop-shadow-lg rounded-b-lg">
            <InfiniteScroll
              dataLength={arts.length}
              next={() => fetchArts()}
              hasMore={hasMore}
              loader={isLoading && <LoadingSkeleton />}
            >
              {arts.length === 0 ? (
                <div className="pt-1 text-center">{t("no.result")}</div>
              ) : (
                arts.map((art: Art) => {
                  return (
                    <div key={art.id} className="mt-3 mx-2">
                      <Link
                        to="/details-artwork"
                        state={{ art, filter: submittedFilter.current, search }}
                        className="w-fit"
                      >
                        <ArtworkSearchCard data={art} />
                      </Link>
                    </div>
                  );
                })
              )}
            </InfiniteScroll>
          </div>
        )}

        {users && (
          <div className="mx-3 -mt-2 pt-3 pb-3 mb-24 z-0 border border-gray-300 bg-gray-100 drop-shadow-lg rounded-b-lg">
            <InfiniteScroll
              dataLength={users.length}
              next={() => fetchUsers()}
              hasMore={hasMore}
              loader={isLoading && <LoadingSkeleton />}
            >
              {users.length === 0 ? (
                <div className="pt-1 text-center">{t("no.result")}</div>
              ) : (
                users.map((user: User) => {
                  return (
                    <div key={user.id} className="mt-3 mx-2">
                      <Link
                        to="/users-profile"
                        state={{
                          user,
                          filter: submittedFilter.current,
                          search,
                        }}
                        className="w-fit"
                      >
                        <UserSearchCard data={user} />
                      </Link>
                    </div>
                  );
                })
              )}
            </InfiniteScroll>
          </div>
        )}
      </div>

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default Search;