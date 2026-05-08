export function parseCSVLine(line, delimiter = ","){
    const result = [];
    let current = "";
    let inQuotes = false;
    for(let i = 0; i < line.length; i++){
        let char = line[i];
        let nextchar = line[i + 1];
        if(char == '"'){
            if(inQuotes && nextchar === '"'){
                current += '"';
                i++;
            } else{
                inQuotes = !inQuotes;
            }
        } 
        else if(char === delimiter && !inQuotes){
            result.push(current);
            current = "";
        } 
        else{
            current += char;
        }        
    }
    result.push(current);
    return result;
}
export function escapeCSV(value, delimiter = ","){
    if(value === null || value === undefined) return "";
    let str = String(value);
    if(str.includes('"')){
        str = str.replace(/"/g, '""');
    }
    if(
        str.includes(delimiter) || 
        str.includes('"') || 
        str.includes("\n")
    ) {
        str = `"${str}"`;
    }
    return str;
}