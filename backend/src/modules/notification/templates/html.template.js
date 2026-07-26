import { templateService } from "./template.service.js"

export const HTML_TEMPLATE = {
    WELCOME: "welcome.html"
}

export const getHTMLTemplate = async (templateName, templateVariables = {}) => {
    return await templateService.render(templateName, templateVariables)
}