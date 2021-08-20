

export const fileUpload = async ( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/jurgen-rg-api/image/upload';

    const formData = new FormData();
    formData.append('upload_preset','react.journal') // Datos del upload en Postman
    formData.append('file', file ) // Datos del upload en Postman

    try {

        const resp = await fetch( cloudUrl, {// cloudUrl es una aplicacion Get  y  se necesita un Post == el segundo argumento va a ser la continuacion de ese fetch
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json(); // If there is an error it will be from cloudinary and resp.json is the expination
        }

    } catch (error) {
        throw error;
    }


    // return url de la imagen
}
