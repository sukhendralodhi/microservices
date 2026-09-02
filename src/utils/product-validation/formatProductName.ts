export function formatProductName(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}