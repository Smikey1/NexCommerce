import fs from "fs/promises";
import path from "path";

class TemplateService {
    async render(htmlTemplate, variables = {}) {
        const file = await fs.readFile(
            path.join(
                process.cwd(),
                "src/modules/notification/templates",
                `${htmlTemplate}`
            ),
            "utf8"
        );

        let html = file;

        for (const [key, value] of Object.entries(variables)) {
            html = html.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );
        }
        return html;
    }
}

export const templateService = new TemplateService();