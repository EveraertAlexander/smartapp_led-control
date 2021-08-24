export interface ColorPalette {
    id: number,
    name: string
    colors: Color[]

}

export interface Color {
    colorId?: number,
    h: number,
    s: number,
    v: number
}