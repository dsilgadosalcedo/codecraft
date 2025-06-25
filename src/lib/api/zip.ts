import JSZip from "jszip"

export async function exportZip(
  name: string,
  files: { html: string; css: string; js: string }
) {
  const zip = new JSZip()
  zip.file("index.html", files.html)
  zip.file("style.css", files.css)
  zip.file("script.js", files.js)
  const blob = await zip.generateAsync({ type: "blob" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${name || "workspace"}.zip`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importZip(
  file: File
): Promise<{ html: string; css: string; js: string }> {
  const zip = await JSZip.loadAsync(file)
  const html = await (zip.file("index.html")?.async("string") ??
    Promise.resolve(""))
  const css = await (zip.file("style.css")?.async("string") ??
    Promise.resolve(""))
  const js = await (zip.file("script.js")?.async("string") ??
    Promise.resolve(""))
  return { html, css, js }
}
