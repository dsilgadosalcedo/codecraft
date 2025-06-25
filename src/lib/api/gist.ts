export async function exportGist(
  token: string,
  description: string,
  files: { html: string; css: string; js: string }
): Promise<string> {
  const response = await fetch("https://api.github.com/gists", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      public: false,
      files: {
        "index.html": { content: files.html },
        "style.css": { content: files.css },
        "script.js": { content: files.js },
      },
    }),
  })
  const data = await response.json()
  if (!data.html_url) {
    throw new Error("Failed to create gist")
  }
  return data.html_url
}
