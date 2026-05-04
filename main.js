let currentInput = null;
let fileContent = null;
const Conversor = {
    render: function (text){
        document.getElementById("output").value = text; 
    },
    JSONtoCSV: function (text){
       try {
            const data = JSON.parse(text);
            if(!Array.isArray(data)){
                alert("JSON needs to be an array of objects!");
                return;
            }
            // write headers in csv variable
            const headers = Object.keys(data[0]);
            let csv = headers.join(";") + "\n";

            // write rows in csv variable
            data.forEach(obj => {
                const row = headers.map(key => {
                    const value = obj[key];
                    if(typeof value === "object" && value !== null){
                        return JSON.stringify(value);
                    }
                    return value;
                }).join(";");
                csv += row + "\n";
            });
            this.render(csv);
        } catch (error) {
            alert("JSON invalid!");
       }
    },
    CSVtoJSON: function (text){
        let list = [];
        try {
            // to not accept JSON text in the CSV -> JSON
            if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
            alert("Invalid CSV: looks like JSON input");
            return;
            }
            const rows = text.split("\n");
            if (!rows.length || rows[0].trim() === "") {
                alert("Empty CSV!");
                return;
            }
            const headers = rows[0].split(';').map(item => item.trim());
            for(let x = 1; x < rows.length; x++){
                let rowValues = rows[x].split(';');
                
                if(rowValues.length < headers.length) {continue;}
                let myObj = {}; 

                headers.forEach((header, index) =>{
                    myObj[header] = rowValues[index] ? rowValues[index].trim() : null;
                });
                list.push(myObj);
            }
            this.render(JSON.stringify(list, null, 2));
            
        } catch (error) {
            alert("CSV invalid!");
        }
    },
    convert: function() {
        // get select section
        let format = document.getElementById("filesFormats").value;
        // if user did not select any conversion
        if(!format){
            alert("Select a format to convert!");
            return;
        }
        let text;

        if(currentInput === "file"){
            text = fileContent;
        } else if(currentInput === "text"){
            text = document.getElementById("input").value;
        } else{
            alert("Provide input (text or file)!");
            return;
        }


        if(format === "JsontoCSV"){
            this.JSONtoCSV(text);
        } else if( format === "CSVtoJson"){
            this.CSVtoJSON(text);
        }

    },
    copy: async function (){
        const text = document.getElementById("output").value;
        try {
            await navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } catch (e) {
            alert("Failed to copy");
        }
    },
    upload: function(event){
        const file = event.target.files[0];
        if(file){
            document.getElementById("convert").disabled = true;
            const reader = new FileReader();
            const fileName = file.name.toLowerCase();

            reader.onload = (e) => {
                fileContent = e.target.result;
                currentInput = "file";
                document.getElementById("input").value = '';
                document.getElementById("convert").disabled = false;
            }
            reader.readAsText(file);
        }
    }
}
document.getElementById("input").addEventListener("input", () => {
    currentInput = "text";
})
document.getElementById("upload").addEventListener("change", (e) => {Conversor.upload(e);});
document.getElementById("convert").addEventListener("click", () => {Conversor.convert();});
document.getElementById("copy").addEventListener("click", () => {Conversor.copy();});