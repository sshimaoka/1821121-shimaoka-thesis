//test

/*index.html内scriptで現在実行、画面左のworkspaceを表示、また初期値を表示

var demoWorkspace = Blockly.inject('blocklyDiv',
{media: 'https://unpkg.com/blockly/media/',
 toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
                       demoWorkspace);
*/

//問題文章用変数　
var q_code ="test";

//BlockをJavaScriptコードに変換して表示
function showCodeJS() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    alert(code);
}

//BlockをPythonコードに変換して表示
function showCodePy() {
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.Python.workspaceToCode(demoWorkspace);
    alert(code);
}

//JavaScriptコードに変換後実行
function runCodeJS() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}

//Pythonコードに変換後実行
function runCodePy() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    Blockly.Python.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    var code = Blockly.Python.workspaceToCode(demoWorkspace);
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}

//BlockからPythonコードに変換
function generatepy() {
    // Generate JavaScript code and run it.
    try {
        window.LoopTrap = 1000;
        Blockly.Python.INFINITE_LOOP_TRAP =
            'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        var code = Blockly.Python.workspaceToCode(demoWorkspace);
        Blockly.Python.INFINITE_LOOP_TRAP = null;
    } catch (e) {
        alert(e);
        return;
    }
    document.getElementById('output').value = code;
}

//BlockからJavaScriptコードに変換
function generateJS() {
    // Generate JavaScript code and run it.
    try {
        window.LoopTrap = 1000;
        Blockly.Python.INFINITE_LOOP_TRAP =
            'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        var code = Blockly.JavaScript.workspaceToCode(demoWorkspace);
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    } catch (e) {
        alert(e);
        return;
    }
    document.getElementById('output').value = code;
}

//txtファイルから例となるXMLを受け取り、Pythonコードに変換し表示
function questionpy() {
    var ele = document.getElementById('file'); // input要素オブジェクトの取得

    // ファイルが選択されたら引数の関数を実行
    ele.addEventListener("change", function (ev) {
        var file = ev.target.files;    // 選択されたファイルはFileListオブジェクトに入り、配列のように扱える
        var reader = new FileReader(); // FileReaderオブジェクトの生成
        reader.readAsText(file[0]);    // 選択されたファイル(fileの先頭要素）を文字列として読み込む

        // 読み込みが完了した際に実行される処理
        reader.onload = function (e) {
            var xmltext = reader.result;
            var xml = Blockly.Xml.textToDom(xmltext);
            var testWorkspace = new Blockly.Workspace();
            Blockly.Xml.domToWorkspace(xml, testWorkspace);
            var code = Blockly.Python.workspaceToCode(testWorkspace);
            document.getElementById('question_area').innerHTML = code;
            q_code = question_str(code);
        }
    }, false);
}

//回答の言語を変換したい(作成中)
function change() {
    const changeLang = document.querySelector('language');
    changeLang.addEventListener('change', (event) => {
        const result = a;
    })
}

//選択されたテキストと、生成したコードが完全一致ならばyes
function answer() {
    var code1 = q_code;
    //code1 = code1.replace(',','');
    var code2 = document.getElementById("output").value;
    if (code1 == code2) {
        document.getElementById("answer").innerHTML = "yes";
    } else {
        document.getElementById("answer").innerHTML = "no";
    }
}



//xmlを保存する関数　未完成
function saveBlocks() {
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    // do whatever you want to this xml
}

//xmlを保存する関数　未完成
function loadBlock(xml) { // xml is the same block xml you stored
    if (typeof xml != "string" || xml.length < 5) {
        return false;
    }
    try {
        var dom = Blockly.Xml.textToDom(xml);
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
        return true;
    } catch (e) {
        return false;
    }
}

//文字列を配列に変換
function stringsinarray() {
//    var k = /[ \n]/g; //正規表現, 半角スペースと改行を含む場合
    var question = q_code;
    var que_ary = [];
    que_ary = question.split(" ");
//    document.getElementById('output').innerHTML = que_ary;
    return que_ary;
}

//配列から文字列に変換
function join_str(code) {
    code = code.join(' ');
    return code;
}

//整数の疑似乱数の生成
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//穴あき個所を作成する関数
function anaaki(code){
    code[getRandomInt(code.length)] = "[ question ]";
    return code
}

/*配列から穴埋めを作成する,sitai
現在の問題点：
    現在半角スペースを区切り文字として文字列を配列に変換している関係上、改行では区切られない
    →例えばelse:などの次に改行し、次の行で書き始めた最後の単語までを一つとして分かれている
    →改行を区切り文字として含めるとインデントが消える
    print()のように関数が含まれる場合に、print("hello world")の”print("hello”までを単語として認識している
    →穴埋めを生成するにあたって、()などを認識して区切りたい
    →（）は配列（文章）に残しておきたい
*/
function make_question() {
    que_ary = stringsinarray(); //文字列を配列に変換する関数を呼び出し

    //配列のランダムな位置の単語をを入れ替え, 複数回実行すれば複数個所を変換
//    que_ary[getRandomInt(que_ary.length)] = "[ question ]";
    que_ary = anaaki(que_ary);

    que_ary = join_str(que_ary); //配列を文字列に変換する関数を呼び出し
    document.getElementById('question_area').innerHTML = que_ary; //結果を表示
//    document.getElementById('output').innerHTML = q_code;
}

//question1 問題文を隠していない元の形に戻す
function que_area_back(){
    document.getElementById('question_area').innerHTML = q_code;
}

//問題文の内容を保存する関数
function question_str(code){
    q_code = code;
    return q_code;
}