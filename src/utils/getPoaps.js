import axios from "axios";

export async function poapsOf(github_handle) {
  try {
    const poapsClaimed = (
      await axios.get(
        `https://public-api.gitpoap.io/v1/github/user/${github_handle}/gitpoaps?status=claimed`
      )
    )?.data;
    const poapsUnclaimed = (
      await axios.get(
        `https://public-api.gitpoap.io/v1/github/user/${github_handle}/gitpoaps?status=unclaimed`
      )
    )?.data;
    return poapsClaimed.concat(poapsUnclaimed);
  } catch (error) {
    return [];
  }
}
