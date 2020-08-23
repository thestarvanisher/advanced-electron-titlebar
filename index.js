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
        $(titlebar).attr({"id": "ect-titlebar"});
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

    /**
     * Creates a menu button together with its parent
     * @returns {Element} The element that contains the button on the titlebar
     */
    makeMenuButton() {
        let menu_buton_outer = document.createElement("div");
        $(menu_buton_outer).attr({"class": "ect-b_group"});
        $(menu_buton_outer).css({
            "display": "inline-block",
            "float": "left",
        });

        let menu_button = document.createElement("button");
        $(menu_button).attr({"class": "ect-menu_b"});
        $(menu_button).css({
            "display": "inline-block",
            "border": "none",
            "height": "30px",
            "padding-left": "10px",
            "padding-right": "10px",
            "color": this.params.defaultTextColor,
            "font-size": "14px",
            "background-color": this.params.backgroundColor,
            "outline": "none",
            "cursor": "pointer"
        });

        $(menu_button).hover(function() {
            $(this).css({"background-color": this.params.buttonHoverColor});
        });

        $(menu_button).mouseleave(function() {
            $(this).css({"background-color": this.params.backgroundColor});
        });


        $(menu_buton_outer).append(menu_button);
        return menu_buton_outer;
    }

    /**
     * Creates a submenu
     * @returns {Element} The submenu
     */
    makeSubmenu() {
        let submenu = document.createElement("div");
        $(submenu).attr({"class": "ect-submenu"});
        $(submenu).css({
            "position": "absolute",
            "display": "none",
            "min-width": "200px",
            "line-height": "normal",
            "font-family": "Arial",
            "font-size": "14px",
            "cursor": "pointer",
            "background-color": this.params.buttonHoverColor,
            "-webkit-box-shadow": "3px 3px 12px -2px rgba(0,0,0,0.75)"
        });

        let submenu_ul = document.createElement("ul");
        $(submenu_ul).css({
            "list-style-type": "none",
            "padding": "0",
            "margin": "5px 0px"
        });
        $(submenu).append(submenu_ul);

        return submenu;
    }

    /** TODO: create the different buttons depending on their function.
     * Creates a submenu button
     * @returns {Element} The submenu button
     */
    makeSubmenuButton() {
        let subbutton = document.createElement("li");
        $(subbutton).css({
            "background-color": this.params.buttonHoverColor,
            "padding": "5px 20px"
        });

        let subbutton_left_text = document.createElement("span");
        $(subbutton_left_text).attr({"class": "ect-submenu_option"});
        $(subbutton_left_text).css({
            "white-space": "nowrap",
            "text-overflow": "ellipsis"
        });
        
        let subbutton_right_text = document.createElement("span");
        $(subbutton_right_text).attr({"class": "ect-submenu_option_command"});
        $(subbutton_right_text).css({
            "float": "right"
        });

        $(subbutton).append([subbutton_left_text, subbutton_right_text]);

        $(subbutton).hover(function() {
            $(this).css({
                "background-color": this.params.backgroundColor,
            });
        });

        $(subbutton).mouseleave(function() {
            $(this).css({
                "background-color": this.params.buttonHoverColor,
            });
        });

        return subbutton;
    }

    makeMenu() {

    }



}

$(document).ready(function() {

    let menu = {};

    var r = new Titlebar({buttonHoverColor: "gray"}, menu);
});
