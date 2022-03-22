const searchUser = async (
  search: string,
  currentPage: number,
  // eslint-disable-next-line no-unused-vars
  setHasMore: (hasMore: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setUsers: (user: any) => void,
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (page: number) => void
) => {
  setIsLoading(true);
  const url = `${process.env.REACT_APP_API}/users/search?page=${currentPage}&limit=10`;

  const body = { fullname: search };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    await response.json().then((res) => {
      setUsers((old: any | null) =>
        old === null ? res.results : [...old, ...res.results]
      );
      if (res.results === 0) {
        setHasMore(false);
      }
    });
  } catch (error) {
    throw new Error();
  } finally {
    setIsLoading(false);
    setCurrentPage(currentPage + 1);
  }
};

export default searchUser;