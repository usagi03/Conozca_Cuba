export default class Validation{

     validRequiered(value) {
        let error = '';
        console.log(value);
        if(value == null || value == undefined || value === '' ) {
            console.log(error)
            error = 'El campo es requerido';
        }
        
        return error;
    }
}
