export const loadImage = (path: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = err => reject(err);
        image.src = path;
    });
}
