# Duplicate Finder CLI

This is a home assignment for Full-Stack Engineer.

The application scans a list of company names (from a `.txt` file) and detects potential duplicates caused by typos, inconsistent naming, regional suffixes (e.g. "Inc", "Ltd", "Studio"), or diacritics (e.g. "é" → "e").

---

## 📦 Installation

```bash
npm install
```

---

## 🚀 Build & Run

### Build

```bash
npm run build
```

### Run

```bash
npm start -- find-duplicates <inputFile> [--output <outputFile>]
```

### Examples

```bash
# Console output
npm start -- find-duplicates data/input/companies.txt

# Output to file
npm start -- find-duplicates data/input/companies.txt --output data/output/result.txt
```

---

## 🧠 Normalization logic

* Transforms to lowercase;
* Removes diacritics (e.g. `Montréal` → `Montreal`);
* Removes noise suffixes: `studio`, `inc`, `ltd`, `corp`, etc;
* Removes punctuation and excess whitespace;
* Filters out meaningless strings (`---`, `...`, `0`, etc.).

---

## ✅ Example output

```text
🖁 Possible duplicates (3):
   • Ubisoft Montréal Studio
   • Ubisoft Montreal
   • Ubisoft Canada

🖁 Possible duplicates (2):
   • Sony Santa Monica
   • Santa Monica Studio
```
