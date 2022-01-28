import * as vscode from 'vscode';

function htmlToString(text : string) : string{
    const regex = /(<[^>]*>.*)/g

    //https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
    //$& 表示替換全部 match , 在此跟 GUI 不一樣不能用 $1
    const result = text.replace(regex , "+ '$&'").replace(/^[+]/, '').trim();
    return result;
}


function stringToHtml(text : string) : string{
    const regex = /'(<[^>]*>.*)'/g
    const result = text.replace(regex , '$1').replace(/[+]/g,'').trim();
    return result;
}

export function activate(context: vscode.ExtensionContext) {
	
	let toStringCmd = vscode.commands.registerCommand('htmltostring.toString', () => {

        const editor = vscode.window.activeTextEditor;
        if(!editor) return;

        const selections = editor.selections;
        editor.edit(editBuilder => {
            selections.forEach(selection=>{
                const text = editor.document.getText(selection);
                console.log(text);
                editBuilder.replace(selection, htmlToString(text));
            })
        })

	});



	let toHtmlCmd = vscode.commands.registerCommand('htmltostring.toHtml', () => {

        const editor = vscode.window.activeTextEditor;
        if(!editor) return;

        const selections = editor.selections;
        editor.edit(editBuilder => {
            selections.forEach(selection=>{
                const text = editor.document.getText(selection);
                console.log(text);
                editBuilder.replace(selection, stringToHtml(text));
            })
        })
        vscode.commands.executeCommand('editor.action.formatSelection');
	});

	context.subscriptions.push(toStringCmd);
	context.subscriptions.push(toHtmlCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
