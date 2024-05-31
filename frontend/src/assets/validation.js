export default class Validation{

     validRequiered(value) {
        let error = '';
        console.log(value);
        if(value == null || value == undefined || value === '' || value === 0) {
            console.log(error)
            error = 'El campo es requerido';
        }
        
        return error;
    }
    convertDateFormat(isoDateString) {
        // Crear un objeto Date a partir de la cadena ISO
        const date = new Date(isoDateString);
        
        // Extraer año, mes y día
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0, así que sumamos 1 y aseguramos dos dígitos
        const day = String(date.getDate()).padStart(2, '0'); // Aseguramos dos dígitos para el día
        
        // Construir la cadena de fecha en el formato YYYY-MM-DD
        return `${year}-${month}-${day}`;
      }
      
      
   
}
