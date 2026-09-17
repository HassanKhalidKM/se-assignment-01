# TaskFlow — Task Manager

A clean, minimal **Task Manager** web application built with pure HTML, CSS, and JavaScript.  
No frameworks. No dependencies. Just the web platform.

> **SE Assignment 01** | Muhammad Hassan Khalid | FA25-BCS-132

---

## 🚀 Live Demo

🔗 **[https://hassankhalidkm.github.io/se-assignment-01/](https://hassankhalidkm.github.io/se-assignment-01/)**

---

## ✨ Features

- **Add tasks** — type and press Enter or click Add
- **Complete tasks** — click the circle checkbox to toggle
- **Delete tasks** — hover a task and click ✕
- **Filter tasks** — All / Active / Completed tabs
- **Persistent storage** — tasks survive page refreshes via `localStorage`
- **Pending badge** — live count of incomplete tasks in the header
- **Clear completed** — bulk-remove finished tasks
- **Accessible** — ARIA labels, keyboard navigation, focus indicators
- **Responsive** — works on mobile and desktop

---

## 🛠 Tech Stack

| Layer      | Technology |
|------------|-----------|
| Markup     | HTML5 (semantic) |
| Styling    | CSS3 (custom properties, flexbox, animations) |
| Logic      | Vanilla JavaScript (ES5/ES6) |
| Persistence| `localStorage` Web API |
| CI/CD      | GitHub Actions |
| Hosting    | GitHub Pages |

---

## 📁 Project Structure

```
se-assignment-01/
├── index.html              # App entry point
├── style.css               # Stylesheet (dark theme, responsive)
├── app.js                  # Task manager logic
├── README.md               # This file
├── report/
│   └── SEAss01_Report.md   # Assignment report
└── .github/
    └── workflows/
        ├── ci.yml          # CI pipeline (validate + lint)
        └── deploy.yml      # GitHub Pages deployment
```

---

## 🏃 Running Locally

No build step needed — just open in a browser:

```bash
# Clone the repo
git clone https://github.com/HassanKhalidKM/se-assignment-01.git
cd se-assignment-01

# Open directly
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux
```

---

## ⚙️ CI Pipeline

Every push to `main` triggers the GitHub Actions workflow which:

1. **Validates HTML5** — checks markup against W3C rules
2. **Checks required files** — ensures all source files are present
3. **Lints JavaScript** — runs `jshint` to catch syntax errors

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for full details.

---

## 📄 License

MIT — free to use and modify.
