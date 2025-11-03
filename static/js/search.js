document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("searchInput");
  const output = document.getElementById("searchResults");

  if (!input) return;

  fetch("/index.json")
    .then(res => res.json())
    .then(data => {
      const fuse = new Fuse(data, {
        includeScore: true,
        threshold: 0.4,
        ignoreLocation: true,
        useExtendedSearch: true,
        keys: ["title", "summary", "content"]
      });

      input.addEventListener("input", e => {
        const query = e.target.value.trim();
        if (!query) {
          output.innerHTML = "";
          return;
        }

        // 支持中文与英文混合输入
        const results = fuse.search(query);
        output.innerHTML = results.map(r => `
          <div style="margin:10px 0;">
            <a href="${r.item.permalink}" style="font-weight:bold;">${r.item.title}</a>
            <p>${r.item.summary || ""}</p>
          </div>
        `).join("");
      });
    });
});
