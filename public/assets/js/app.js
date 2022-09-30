const editor = document.getElementById("editor");
const fontBtn = document.getElementById("fontBtn");
const fontSizeBtn = document.getElementById("fontSizeBtn");
const fontColorBtn = document.getElementById("fontColorBtn");
const bgColorbtn = document.getElementById("bgColorBtn");
const exportBtn = document.getElementById("downloadBtn");
const colorModal = document.getElementById("colorModal");
const colorTitle = document.getElementById("colorTitle");
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const nonValuedCommands = document.querySelectorAll("[data-command-type=nonValue]");
const valuedCommands = document.querySelectorAll("[data-command-type=value]");
const alignBtns = document.querySelectorAll("a.align-btn");

const exportHtml= function () { 
    let docName = prompt("Enter document name", "Untitled");
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${docName}</title>
    </head>
    <body>
        ${editor.innerHTML}
    </body>
    </html> `;
    editor.innerHTML;
    const blob = new Blob([html], {type: "text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `${docName}.html`;
    a.href = url;
    a.click();
    a.remove();
}
const exportText = function () {
    let docName = prompt("Enter document name", "Untitled");
    const text = editor.innerText;
    const blob = new Blob([text], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `${docName}.txt`;
    a.href = url;
    a.click();
    a.remove();
}

const printDoc = function () {
    let docName = prompt("Enter document name", "Untitled");
    const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status =0');
    printWindow.document.write(editor.innerHTML);
    printWindow.document.head.innerHTML = document.head.innerHTML;
    printWindow.document.title = docName;
    printWindow.focus();
    printWindow.print();
    printWindow.document.close();
};

const align = function (type) {
    editor.style.textAlign = type;
};

const formatCommand = function (command, value = null) {
    document.execCommand(command, false, value);
    window.getSelection().empty();
};

valuedCommands.forEach(el => {
    el.addEventListener("click", function () {
        const { dataset: data } = this;
        const arg = (data.valueIsInt=='true') ? parseInt(data.value) : data.value;
        formatCommand(data.command, arg);
    });
});

[...nonValuedCommands].forEach(el => {
    el.addEventListener("click", function () {
        formatCommand(this.dataset.command);
    });
});

alignBtns.forEach(el => {
    el.addEventListener("click", function () {
        align(this.dataset.align);
    });
});

fontColorBtn.addEventListener("click", function () {
    colorTitle.innerText = "Font Color";
    colorModal.querySelectorAll("[data-command]").forEach(el => {
        el.dataset.command = `foreColor`;
    });
});

bgColorbtn.addEventListener("click", function () {
    colorTitle.innerText = "Background Color";
    colorModal.querySelectorAll("[data-command]").forEach(el => {
        el.dataset.command =  `hiliteColor`;
    });
});

document.getElementById("exportHtml").addEventListener("click", exportHtml);
document.getElementById("exportText").addEventListener("click", exportText);
document.getElementById("printBtn").addEventListener("click", printDoc);

document.addEventListener("keydown", function(e) {
    if (e.ctrlKey) {
        if (e.key == "b") {
            formatCommand("bold");
            e.preventDefault();
        } else if (e.key == "i") {
            formatCommand("italic");
            e.preventDefault();
        }else if (e.key == "u") {
            formatCommand("underline");
            e.preventDefault();
        } else if (e.key == "=") {
            formatCommand("strikeThrough");
            e.preventDefault();
        } else if (e.key == "-") {
            formatCommand("subscript");
            e.preventDefault();
        } else if (e.shiftKey && e.key == "_") {
            formatCommand("superscript");
            e.preventDefault();
        } else if (e.shiftKey && e.key == "H") {
            bgColorbtn.click();
            e.preventDefault();
        } else if (e.shiftKey && e.key == "F") {
            fontColorBtn.click();
            e.preventDefault();
        } else if (e.key == "f") {
            fontBtn.click();
            e.preventDefault();
        } else if (e.shiftKey && e.key == "P") {
            fontSizeBtn.click();
            e.preventDefault();
        } else if (e.key == "l") {
            align("left");
            e.preventDefault();
        } else if (e.key == "r") {
            align("right");
            e.preventDefault();
        } else if (e.key == "e") {
            align("center");
            e.preventDefault();
        } else if (e.key == "j") {
            align("justify");
            e.preventDefault();
        } else if (e.key == "z") {
            formatCommand("undo");
            e.preventDefault();
        } else if (e.key == "y") {
            formatCommand("redo");
            e.preventDefault();
        } else if (e.key == "p") {
            printDoc();
            e.preventDefault();
        } else if (e.key == "s") {
            exportBtn.click();
            e.preventDefault();
        }
    }

});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.add('hidden');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tab-active');
        });

        tab.classList.add('tab-active');
        target.classList.remove('hidden');
    });
});