import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async dispatch => {
        // someFolder/myImage.jpg => ['someFolder', 'myImage.jpg] => myImage.jpg
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image, //path from temporary directory
                to: newPath
            });
        } catch (err) {
            console.log(err);
            throw err;
        }

        dispatch({ type: ADD_PLACE, placeData: {title: title, image: newPath } });
    };
};
