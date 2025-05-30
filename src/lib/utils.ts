import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";
import tailwindConfig from "../../tailwind.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sectionIsEmpty = (
  section: PlannerSections,
  data: PlannerContentData
) => {
  switch (section) {
    case "summary":
      return data.summary === "" || data.summary === "<p></p>";
    default:
      return data[section].length === 0;
  }
};

export const formatTailwindHTML = (
  html: string,
  structure: PlannerStructureData,
) => {
  const colorKey = structure.colorTheme as keyof typeof colors;
  return `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com/"></script>
          <script>
            tailwind.config = ${JSON.stringify(tailwindConfig)};         
            document.documentElement.style.setProperty(
              "--planner-primary",
              "${colors[colorKey][500]}"
            );
          </script>
        </head>

        <body>
          ${html}
        </body>
      </html>
    `
}

export const isValidJSON = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return false;
  }
}

export const removeJSONMarkers = (json: string) => {
  return json.replace(/^```json\s*|\s*```$/g, "");
};

export function generateIdRandom() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}