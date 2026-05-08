# Convert Files

A simple web app to convert files and text between JSON and CSV formats.

## Features

- Convert JSON to CSV
- Convert CSV to JSON
- Upload `.json` and `.csv` files
- Paste raw text directly into the input
- Copy converted output to clipboard
- CSV parser with quoted field support
- Handles arrays and nested objects
- Basic validation for invalid inputs

---

## Supported Conversions

### JSON → CSV
Supports:
- Arrays of objects
- Arrays inside objects
- Nested objects (serialized)

Example:

```json
[
  {
    "name": "Phellipe",
    "skills": ["driving", "coding"],
    "address": {
      "city": "Rio"
    }
  }
]
```

Converts to:

```csv
name,skills,address
Phellipe,"[""driving"",""coding""]","{""city"":""Rio""}"
```

---

### CSV → JSON

Supports:
- Quoted fields
- Escaped quotes
- Commas inside fields

Example:

```csv
name,quote
Phellipe,"hello, world"
```

Converts to:

```json
[
  {
    "name": "Phellipe",
    "quote": "hello, world"
  }
]
```

---

## Technologies Used

- HTML
- CSS
- JavaScript

---

## Future Improvements

- Better UI/UX
- Download converted files
- JSON flattening
- Multi-line CSV support
- XML support
- Auto-detect CSV delimiters

---

## Running Locally

Clone the repository:

```bash
git clone <your-repo-url>
```

Open the project folder and run it with a local server.

Example using VS Code Live Server.

---

## Author

Made by Phellipe Cardoso
