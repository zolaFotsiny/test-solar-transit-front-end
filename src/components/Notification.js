import { notification } from 'antd';

export const showSuccessNotification = (rep) => {


    notification.success({
        message: 'Succees',
        description: rep,
        placement: 'bottomLeft',
    });


};




export const showErrorNotification = (rep) => {
    let respProv = '';

    if (!rep) {
        respProv = 'Operation Failed'
    }
    else {
        respProv = rep
    }
    notification.error({
        message: 'Erreur',
        description: respProv,
        placement: 'bottomLeft',
    });
};