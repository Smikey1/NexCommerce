import { defineConfig } from "eslint/config";

export default defineConfig([
    /*
     * ================================================================
     * BASE
     * ================================================================
     */
    {
        files: ["src/**/*.js"],
        ignores: ["src/scripts/**"],

        rules: {
            /*
             * General JavaScript rules
             */
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_"
                }
            ]
        }
    },

    /*
     * ================================================================
     * CROSS-MODULE BOUNDARY
     *
     * Modules must communicate through:
     *
     *     <module>/<module>.api.js
     *
     * They must NOT import another module's internal layer directly.
     *
     * ❌ user/service/user.service.js
     * ❌ user/repository/user.repository.js
     * ❌ user/model/user.model.js
     * ❌ user/controller/user.controller.js
     *
     * ✅ user/user.api.js
     * ================================================================
     */
    {
        files: ["src/**/*.js"],
        ignores: ["src/scripts/**"],

        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: [
                                "../*/service/**",
                                "../../*/service/**",
                                "../../../*/service/**",

                                "../*/repository/**",
                                "../../*/repository/**",
                                "../../../*/repository/**",

                                "../*/model/**",
                                "../../*/model/**",
                                "../../../*/model/**",

                                "../*/controller/**",
                                "../../*/controller/**",
                                "../../../*/controller/**"
                            ],
                            message:
                                "Do not import another module's internal layer directly. Use the module's public *.api.js file."
                        }
                    ]
                }
            ]
        }
    },

    /*
     * ================================================================
     * CONTROLLER
     *
     * Controller:
     *
     *     Controller → Service
     *
     * Controller must NOT access:
     *     Repository
     *     Model
     *
     * ================================================================
     */
    {
        files: ["src/**/controller/**/*.js"],

        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: [
                                "../repository/**",
                                "../../repository/**",
                                "../model/**",
                                "../../model/**"
                            ],
                            message:
                                "Controllers must not access repositories or models directly. Use the service layer."
                        }
                    ]
                }
            ]
        }
    },

    /*
     * ================================================================
     * SERVICE
     *
     * Service:
     *
     *     Service → Repository
     *
     * Service must NOT access:
     *     Model
     *     Controller
     *
     * ================================================================
     */
    {
        files: ["src/**/service/**/*.js"],

        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: [
                                "../model/**",
                                "../../model/**"
                            ],
                            message:
                                "Services must not access models directly. Use the repository layer."
                        },
                        {
                            group: [
                                "../controller/**",
                                "../../controller/**"
                            ],
                            message:
                                "Services must not access controllers."
                        }
                    ]
                }
            ]
        }
    },

    /*
     * ================================================================
     * REPOSITORY
     *
     * Repository:
     *
     *     Repository → Model
     *
     * Repository must NOT access:
     *     Service
     *     Controller
     *
     * ================================================================
     */
    {
        files: ["src/**/repository/**/*.js"],

        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: [
                                "../service/**",
                                "../../service/**"
                            ],
                            message:
                                "Repositories must not access services."
                        },
                        {
                            group: [
                                "../controller/**",
                                "../../controller/**"
                            ],
                            message:
                                "Repositories must not access controllers."
                        }
                    ]
                }
            ]
        }
    }
]);
