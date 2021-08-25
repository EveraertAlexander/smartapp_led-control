import { Params } from "../models/param";

export const params: Params  = {
    masterBrightness: {
        title: "Brightness",
        key: "master_brightness",
        minValue: 0,
        maxValue: 1
    },

    masterColorTemp: {
        title: "Color Temp",
        key: "master_color_temp",
        minValue: 1000,
        maxValue: 12000
    },
    masterSaturation: {
        title: "Saturation",
        key: "master_saturation",
        minValue: 0,
        maxValue: 1
    },
    primaryPattern: {
        title: "Animation",
        key: "primary_pattern",
    },
    primarySpeed: {
        title: "Speed",
        key: "primary_speed",
        minValue: 0,
        maxValue: 2
    },
    primaryScale: {
        title: "Scale",
        key: "primary_scale",
        minValue: -10,
        maxValue: 10
    },
    palette: {
        title: "Theme",
        key: "palette"
    }
}