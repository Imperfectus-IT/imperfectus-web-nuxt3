const useWindowSize = () => {
    const addResize = window.addEventListener('resize', setDeviceType)
    const removeResize = window.addEventListener('resize', updateWidth);
    return { addResize, removeResize}
};