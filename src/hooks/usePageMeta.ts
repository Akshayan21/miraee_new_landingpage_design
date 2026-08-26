import { useEffect } from "react"

export function usePageMeta(title: string, description: string) {
    useEffect(() => {
        document.title = title

        const setMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
            let element = document.head.querySelector<HTMLMetaElement>(selector)
            if (!element) {
                element = document.createElement("meta")
                element.setAttribute(attribute, key)
                document.head.appendChild(element)
            }
            element.content = content
        }

        setMeta('meta[name="description"]', "name", "description", description)
        setMeta('meta[property="og:title"]', "property", "og:title", title)
        setMeta('meta[property="og:description"]', "property", "og:description", description)
        setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image")
        setMeta('meta[name="twitter:title"]', "name", "twitter:title", title)
        setMeta('meta[name="twitter:description"]', "name", "twitter:description", description)
    }, [title, description])
}
