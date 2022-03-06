export const acceptPropositions = (
  propositions: number[],
  token: string | undefined
) => {
  const url = `${process.env.REACT_APP_API}/proposition/validate`;
  const body = { propositions };
  const authorization = `Bearer ${token}`;

  try {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        authorization,
      },
    });
  } catch (error) {
    throw new Error();
  }
};

export const refusePropositions = (
  propositionId: number,
  token: string | undefined
) => {
  const url = `${process.env.REACT_APP_API}/proposition/${propositionId}`;
  const authorization = `Bearer ${token}`;

  try {
    return fetch(url, {
      method: "DELETE",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    throw new Error();
  }
};