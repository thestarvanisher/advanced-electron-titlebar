//const DEFAULT_BCKG_COLOR = "";

class Titlebar {
    constructor(settings, menu) {
        this.settings = settings;
        this.menu = menu;
        this.params = {
            defaultTextColor: "",
            backgroundColor: "t",
            buttonHoverColor: "t",
            closeButtonHoverColor: "t",
            submenuButtonHoverColor: "t",
            icon: null,
            titlebarLabelFont: "t",
            titlebarLabelColor: "t",
            menuButtonsColor: "t",
            
        };
        this.createTitlebar();
    }

    /**
     * Creates the titlebar
     */
    createTitlebar() {
        this.setParams();
        console.log(this.params);
        this.makeTitlebar()
    }

    /**
     * Sets the parameters for the titlebar
     */
    setParams() {
        for(let key in this.settings) {
            if(key in this.params) {
                this.params[key] = this.settings[key];
            }
        }
    }


    makeTitlebar() {
        let titlebar = document.createElement("div");
        $(titlebar).attr({"id": "titlebar"});
        $(titlebar).css({
            "display": "none",
            "background-color": this.params.backgroundColor,
            "width": "100%",
            "height": "30px",
            "display": "flex",
            "-webkit-user-select": "none",
            "color": this.params.defaultTextColor,
            
        });
        $("body").append(titlebar);
    }

    /*makeScrollbar() {

    }*/

    makeMenu() {

    }



}

$(document).ready(function() {

    let menu = {};

    var r = new Titlebar({buttonHoverColor: "gray"}, menu);
});
