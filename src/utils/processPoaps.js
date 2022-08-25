import { poapsOf } from "./getPoaps.js";
import githubUsernameRegex from "github-username-regex";
import prettify from "html-prettify";

export async function getPoapsRes(github_handle, size) {
  try {
    const badgeSize = handleSize(Number(size));
    const poapObjects = ["<p>"];
    if (!githubUsernameRegex.test(github_handle)) {
      return "invalid github username syntax";
    }

    const poaps = await poapsOf(github_handle);

    for (const poap of poaps) {
      const poapObj = `<a href="https://www.gitpoap.io/gp/${poap?.gitPoapEventId}"><img src="${poap?.imageUrl}"  alt="poap" height="${badgeSize}" width="${badgeSize}"></a>  `;
      poapObjects.push(poapObj);
    }

    poapObjects.push("</p>");

    if (poapObjects.length <= 2) {
      return false;
    }
    return prettify(poapObjects.join("").trim());
  } catch (error) {
    console.log(error);
    return false;
  }
}

function handleSize(size) {
  if (!size) {
    return 150;
  }

  if (!Number.isInteger(size) || size < 50) {
    return 150;
  }
  return size;
}
