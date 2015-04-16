//quickFrameRate
//version 1.0
//2015 04.16 23:17
//copyright (c) songz meng

//string
fR_Data = new Object()
fR_Data.scriptName = {
    en: "quickFrameRate",
    cn: "快速帧速"
}
fR_Data.inPuText = {
    en: "Input FPS  (0 restore origin)",
    cn: "输入帧速   (0为原始帧速)"
}
fR_Data.exeCute = {
    en: "Execute",
    cn: "执行"
}
fR_Data.noItem = {
    en: "Select items in project panel",
    cn: "请在项目面板选择一个项目"
}
fR_Data.about = {
    en: "Thank you for using quickFrameRate ae script. \n " + "\n" + "contact me: weibo.com/songz",
    cn: "谢谢使用\n" + "\n" + "联系我 weibo.com/songz"
}
fR_Data.error = {
    en: "Error",
    cn: "错误"
}

//interface
win = new Window('palette', fR_localize(fR_Data.scriptName));

wP = win.add("panel", [0, 0, 225, 100], fR_localize(fR_Data.inPuText));

wP.eT = wP.add("edittext", [15, 15, 150, 35]);

wP.eC = wP.add("button", [15, 45, 205, 75], fR_localize(fR_Data.exeCute));

wP.aB = wP.add("button", [180, 15, 205, 35], '?');

win.show();

//valid num
function fR_validNum() {

    var enteredValue = this.text;

    if (isNaN(enteredValue) || (enteredValue < 0)) {

        this.text = 1;
    } else if (enteredValue > 99) {
        this.text = 99
    };
};
wP.eT.onChange = fR_validNum;

//localize
function fR_localize(Var) {

    if (app.isoLanguage === "zh_CN") {

        return Var["cn"];

    } else {

        return Var["en"];

    }
};
wP.aB.onClick = function() {

    alert(fR_localize(fR_Data.about), fR_localize(fR_Data.scriptName));

};

//main
wP.eC.onClick = function() {
    
    //var
    var targetFps = wP.eT.text
    var frameDur = ""
    if (targetFps >= 1) {
        frameDur = 1 / targetFps;
    } else {
        frameDur = 1;
    }
    var sI = app.project.selection;
    
    //function
    app.beginUndoGroup(fR_localize(fR_Data.scriptName))
    if (sI.length == 0) {
        alert(fR_localize(fR_Data.noItem), fR_localize(fR_Data.error), "i")
    } else {

        for (i = 0; i < sI.length; i++) {
            if (sI[i] == "[object FolderItem]") {
            }
            if (sI[i] == "[object CompItem]") {
                sI[i].frameDuration = frameDur
            }
            if (sI[i] == "[object FootageItem]" && !(sI[i].mainSource.isStill)) {
                sI[i].mainSource.conformFrameRate = targetFps
            }

            app.endUndoGroup()
        }

    }
}