export function parseAndValidate(dataString) {
    const dia = dataString.substring(0, 2);
    const mes = dataString.substring(3, 5);
    const ano = dataString.substring(6);  
    const date = new Date(ano, mes - 1, dia);
    if(date.getDate() != dia || date.getMonth() != mes - 1 || date.getFullYear() != ano) {
        return null;
      }
    return date;
}

