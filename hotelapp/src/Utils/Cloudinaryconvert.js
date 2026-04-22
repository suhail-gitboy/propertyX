export const optimizeImage = (url, width = 800, height = 600) => {
    if (!url) return ''
    return url.replace(
        '/upload/',
        `/upload/w_${width},h_${height},c_fill,f_auto,q_auto/`
    )
}