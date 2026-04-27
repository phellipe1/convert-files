/*
    1- pegar texto do textarea
    2- selecionar o tipo de arquivo
    3- fazer conversão
*/ 
const Conversor = {
    file: null,
    render: function (text){
        document.getElementById("output").value = text; 
    },
    JSONtoCSV: function (){
       const textarea = document.getElementById("input").value;
       
       try {
            const data = JSON.parse(textarea);
            console.log(Array.isArray(data[0].items));

            if(!Array.isArray(data)){
                alert("JSON needs to be an array of objects!");
                return;
            }
            // write headers in csv variable
            const headers = Object.keys(data[0]);
            let csv = headers.join(";") + "\n";

            // write rows in csv variable
            data.forEach(obj => {
                const row = headers.map(key => obj[key]).join(";");
                csv += row + "\n";
            });
            this.render(csv);
        } catch (error) {
            alert("JSON invalid!");
       }
    },
    CSVtoJSON: function (){
        let list = [];
        const myObj = {}; 
        const textarea = document.getElementById("input").value;
        try {
            const data = textarea;
            const rows = data.split("\n");
            if (!rows.length || rows[0].trim() === "") {
                alert("Empty CSV!");
                return;
            }
            const headers = rows[0].split(',').map(item => item.trim());
            for(let x = 1; x < rows.length; x++){
                let rowValues = rows[x].split(',');
                
                if(rowValues.length < headers.length) {continue;}
                let myObj = {}; 

                headers.forEach((header, index) =>{
                    myObj[header] = rowValues[index] ? rowValues[index].trim() : null;
                });
                list.push(myObj);
            }
            console.log(list)
            this.render(JSON.stringify(list, null, 2));
            
        } catch (error) {
            alert("CSV invalid!");
        }
    },
    convert: function() {
        // get select section
        let format = document.getElementById("filesFormats").value;
        let text = document.getElementById("input").value;
        // if user did not select any conversion
        if(!format){
            alert("Select a format to convert!");
            return;
        }
        if(format === "JsontoCSV"){
            this.JSONtoCSV();
        } else if( format === "CSVtoJson"){
            this.CSVtoJSON();
        }

    }
}

document.getElementById("filesFormats").addEventListener("change", (event) => {
    console.log("Formato selecionado:", event.target.value);
});

document.getElementById("convert").addEventListener("click", () => {Conversor.convert();});
