import axios from 'axios';
import _ from 'lodash';

export const filesAdd = (files) => {
    return {
        type: 'file',
        payload: files
    };
};

export const deleteFile = (files, file) => {
    _.pull(files, file);
    return {
        type: 'file',
        payload: files
    };
};