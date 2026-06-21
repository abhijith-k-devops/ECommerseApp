import React from "react";
import ReactTestRenderer from "react-test-renderer";
import * as ReactNative from "react-native";
import { useTheme } from "../../../src/core/hooks/useTheme";
import ThemeProvider from "../../../src/core/contexts/ThemeContext";
import { darkColors, lightColors } from "../../../src/core/theme/Colors";

function ThemeProbe({
    onRead,
}: {
    onRead: (value: ReturnType<typeof useTheme>) => void;
}) {
    const value = useTheme();
    onRead(value);
    return null;
}

describe("ThemeContext and useTheme", () => {
    let useColorSchemeSpy: jest.SpyInstance;

    beforeAll(() => {
        useColorSchemeSpy = jest.spyOn(ReactNative, "useColorScheme");
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        useColorSchemeSpy.mockRestore();
    });

    it("throws when useTheme is used outside ThemeProvider", async () => {
        const UnsafeConsumer = () => {
            useTheme();
            return null;
        };

        await expect(async () => {
            await ReactTestRenderer.act(async () => {
                ReactTestRenderer.create(<UnsafeConsumer />);
            });
        }).rejects.toThrow("useTheme must be used within ThemeProvider");
    });

    it("uses light colors by default when system scheme is light", async () => {
        useColorSchemeSpy.mockReturnValue("light");
        let captured!: ReturnType<typeof useTheme>;

        await ReactTestRenderer.act(async () => {
            ReactTestRenderer.create(
                <ThemeProvider>
                    <ThemeProbe onRead={(value) => { captured = value; }} />
                </ThemeProvider>
            );
        });

        expect(captured.themeMode).toBe("auto");
        expect(captured.colors).toEqual(lightColors);
    });

    it("uses dark colors by default when system scheme is dark", async () => {
        useColorSchemeSpy.mockReturnValue("dark");
        let captured!: ReturnType<typeof useTheme>;

        await ReactTestRenderer.act(async () => {
            ReactTestRenderer.create(
                <ThemeProvider>
                    <ThemeProbe onRead={(value) => { captured = value; }} />
                </ThemeProvider>
            );
        });

        expect(captured.themeMode).toBe("auto");
        expect(captured.colors).toEqual(darkColors);
    });

    it("updates colors when themeMode is changed manually", async () => {
        useColorSchemeSpy.mockReturnValue("light");
        let captured!: ReturnType<typeof useTheme>;

        await ReactTestRenderer.act(async () => {
            ReactTestRenderer.create(
                <ThemeProvider>
                    <ThemeProbe onRead={(value) => { captured = value; }} />
                </ThemeProvider>
            );
        });

        expect(captured.colors).toEqual(lightColors);

        await ReactTestRenderer.act(async () => {
            captured.setThemeMode("dark");
        });

        expect(captured.themeMode).toBe("dark");
        expect(captured.colors).toEqual(darkColors);

        await ReactTestRenderer.act(async () => {
            captured.setThemeMode("light");
        });

        expect(captured.themeMode).toBe("light");
        expect(captured.colors).toEqual(lightColors);
    });
});
