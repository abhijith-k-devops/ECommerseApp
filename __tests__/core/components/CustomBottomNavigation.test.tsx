import React from "react";
import ReactTestRenderer from "react-test-renderer";
import { TouchableOpacity } from "react-native";
import CustomBottomNavigation from "../../../src/core/components/CustomBottomNavigation";
import { ThemeContext } from "../../../src/core/contexts/ThemeContext";
import { lightColors } from "../../../src/core/theme/Colors";

jest.mock("@react-native-vector-icons/ionicons", () => {
    const React = require("react");
    const { View } = require("react-native");
    const MockIcon = (props: any) => <View testID={`icon-${props.name}`} />;
    MockIcon.displayName = "MockIonicons";
    return MockIcon;
});

const mockThemeContextValue = {
    colors: lightColors,
    themeMode: "light" as const,
    setThemeMode: jest.fn(),
};

async function renderWithTheme(ui: React.ReactElement) {
    let renderer!: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(async () => {
        renderer = ReactTestRenderer.create(
            <ThemeContext.Provider value={mockThemeContextValue}>
                {ui}
            </ThemeContext.Provider>
        );
    });
    return renderer;
}

function buildNavProps(overrides?: Partial<{ index: number; routes: any[] }>) {
    const routes = overrides?.routes ?? [
        { key: "home-key", name: "Home" },
        { key: "search-key", name: "Search" },
        { key: "favorites-key", name: "Favorites" },
        { key: "profile-key", name: "Profile" },
    ];
    const index = overrides?.index ?? 0;
    const descriptors = Object.fromEntries(
        routes.map((r) => [r.key, { options: { title: r.name } }])
    );
    const navigation = {
        emit: jest.fn().mockReturnValue({ defaultPrevented: false }),
        navigate: jest.fn(),
    };
    return { state: { routes, index }, descriptors, navigation };
}

describe("CustomBottomNavigation", () => {
    it("renders all four default tabs", async () => {
        const props = buildNavProps();
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const tabs = renderer.root.findAllByType(TouchableOpacity);
        expect(tabs).toHaveLength(4);
    });

    it("renders the correct icon for each known tab", async () => {
        const props = buildNavProps();
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const MockIonicons = require("@react-native-vector-icons/ionicons");
        const icons = renderer.root.findAllByType(MockIonicons);
        const iconNames = icons.map((i: any) => i.props.name);
        expect(iconNames).toContain("home-outline");
        expect(iconNames).toContain("search-outline");
        expect(iconNames).toContain("heart-outline");
        expect(iconNames).toContain("person-outline");
    });

    it("shows the label only for the focused tab", async () => {
        const props = buildNavProps({ index: 1 }); // Search tab focused
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const { Text } = require("react-native");
        const texts = renderer.root.findAllByType(Text);
        const labels = texts.map((t: any) => t.props.children).flat();
        expect(labels).toContain("Search");
        expect(labels).not.toContain("Home");
        expect(labels).not.toContain("Favorites");
        expect(labels).not.toContain("Profile");
    });

    it("shows the fallback title for an unrecognised tab name", async () => {
        const props = buildNavProps({
            index: 0,
            routes: [{ key: "unknown-key", name: "Unknown" }],
        });
        props.descriptors["unknown-key"] = { options: { title: "Unknown" } };
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const { Text } = require("react-native");
        const texts = renderer.root.findAllByType(Text);
        const labels = texts.map((t: any) => t.props.children).flat();
        expect(labels).toContain("Unknown");
    });

    it("calls navigation.emit with tabPress when a tab is pressed", async () => {
        const props = buildNavProps({ index: 0 });
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const tabs = renderer.root.findAllByType(TouchableOpacity);
        await ReactTestRenderer.act(async () => {
            tabs[1].props.onPress(); // Press Search tab
        });
        expect(props.navigation.emit).toHaveBeenCalledWith(
            expect.objectContaining({ type: "tabPress", target: "search-key" })
        );
    });

    it("calls navigation.navigate when a non-focused tab is pressed", async () => {
        const props = buildNavProps({ index: 0 }); // Home is focused
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const tabs = renderer.root.findAllByType(TouchableOpacity);
        await ReactTestRenderer.act(async () => {
            tabs[2].props.onPress(); // Press Favorites tab
        });
        expect(props.navigation.navigate).toHaveBeenCalledWith("Favorites");
    });

    it("does not call navigation.navigate when the already-focused tab is pressed", async () => {
        const props = buildNavProps({ index: 0 }); // Home is focused
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const tabs = renderer.root.findAllByType(TouchableOpacity);
        await ReactTestRenderer.act(async () => {
            tabs[0].props.onPress(); // Press already-focused Home tab
        });
        expect(props.navigation.navigate).not.toHaveBeenCalled();
    });

    it("does not call navigation.navigate when the event default is prevented", async () => {
        const props = buildNavProps({ index: 0 });
        props.navigation.emit = jest
            .fn()
            .mockReturnValue({ defaultPrevented: true });
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const tabs = renderer.root.findAllByType(TouchableOpacity);
        await ReactTestRenderer.act(async () => {
            tabs[1].props.onPress(); // Press Search tab
        });
        expect(props.navigation.navigate).not.toHaveBeenCalled();
    });

    it("applies active styles to the focused tab", async () => {
        const props = buildNavProps({ index: 2 }); // Favorites focused
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const tabs = renderer.root.findAllByType(TouchableOpacity);
        const activeTab = tabs[2];
        const flatStyle = [activeTab.props.style].flat();
        const hasActiveBg = flatStyle.some(
            (s: any) =>
                s?.backgroundColor === lightColors.bottomNavigationActiveTint
        );
        expect(hasActiveBg).toBe(true);
    });

    it("applies inactive styles to non-focused tabs", async () => {
        const props = buildNavProps({ index: 0 }); // Home focused
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const tabs = renderer.root.findAllByType(TouchableOpacity);
        const inactiveTab = tabs[1]; // Search
        const flatStyle = [inactiveTab.props.style].flat();
        const hasTransparentBg = flatStyle.some(
            (s: any) => s?.backgroundColor === "transparent"
        );
        expect(hasTransparentBg).toBe(true);
    });

    it("uses the correct icon color for focused and unfocused tabs", async () => {
        const props = buildNavProps({ index: 0 }); // Home focused
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const MockIonicons = require("@react-native-vector-icons/ionicons");
        const icons = renderer.root.findAllByType(MockIonicons);
        // First icon is Home (focused)
        expect(icons[0].props.color).toBe(lightColors.bottomNavActiveLabel);
        // Second icon is Search (inactive)
        expect(icons[1].props.color).toBe(lightColors.bottomNavInactiveLabel);
    });

    it("falls back to ellipse-outline icon for unknown tab names", async () => {
        const props = buildNavProps({
            index: 0,
            routes: [{ key: "misc-key", name: "Settings" }],
        });
        props.descriptors["misc-key"] = { options: {} };
        const renderer = await renderWithTheme(<CustomBottomNavigation {...props} />);
        const MockIonicons = require("@react-native-vector-icons/ionicons");
        const icons = renderer.root.findAllByType(MockIonicons);
        expect(icons[0].props.name).toBe("ellipse-outline");
    });
});
