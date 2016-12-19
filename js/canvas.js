_.canvas = {
    toDataURL: function (img) {
        try {
            var canvas = document.createElement("canvas"),
                gc = canvas.getContext("2d");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            gc.drawImage(img, 0, 0);
            return canvas.toDataURL();
        }
        catch (e) {
            return null;
        }
    }
};