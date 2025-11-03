document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("searchInput");
  const output = document.getElementById("searchResults");

  if (!input || !output) return;

  fetch("/index.json")
    .then(res => res.json())
    .then(data => {
      const fuse = new Fuse(data, {
        keys: ["title", "summary", "content"],
        threshold: 0.4,
        ignoreLocation: true,
      });

      input.addEventListener("input", (e) => {
        const query = e.target.value.trim();
        if (!query) {
          output.innerHTML = "";
          return;
        }

        const results = fuse.search(query);
        if (results.length === 0) {
          output.innerHTML = "<p>未找到匹配内容。</p>";
          return;
        }

        output.innerHTML = results.map(r => `
          <div style="margin: 1em 0;">
            <a href="${r.item.permalink}" style="font-weight:bold;">${r.item.title}</a>
            <p>${r.item.summary || ""}</p>
          </div>
        `).join("");
      });
    })
    .catch(err => console.error("搜索加载错误:", err));
});
