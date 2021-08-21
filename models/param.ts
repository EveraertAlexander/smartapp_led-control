export interface Params {
    masterBrightness: Param,
    masterColorTemp: Param,
    masterSaturation: Param,
    primaryPattern: Param,
    primarySpeed: Param,
    primaryScale: Param,
    palette: Param,
}

export interface Param {
    title: string,
    key: string,
    minValue?: number,
    maxValue?: number
}