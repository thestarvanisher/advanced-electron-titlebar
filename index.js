//const DEFAULT_BCKG_COLOR = "";

/**
 * The Titlebar class creates a modern looking titlebar for an electron window.
 * @constructor
 * @param {Object[]} settings - The settings for the titlebar
 * @param {Object[]} menu - The menu structure for the menu on the titlebar
 */
class Titlebar {
    constructor(settings, menu) {
        this.settings = settings;
        this.menu = menu;
        this.params = {
            defaultTextColor: "#D3D3D3",
            defaultFont: "Impact",
            backgroundColor: "#484848",
            buttonHoverColor: "#686868",
            closeButtonHoverColor: "firebrick",
            submenuButtonHoverColor: "t",
            icon: null,
            titlebarLabelFont: "t",
            titlebarLabelColor: "t",
            menuButtonsColor: "t",
            defaultChevronRight: '<i class="fas fa-chevron-right"></i>',
        };
        this.buttonTypes = {
            standard: "standard",
            submenu: "submenu",
        }
        this.createTitlebar();
    }

    /** TODO: take the size of the electron window
     * Get the window size
     * @returns The window's size
     */
    getWindowSize() {
        let window_size = []
        window_size.push($(window).width());
        window_size.push($(window).height());

        return window_size;
    }

    /**
     * Creates the titlebar
     */
    createTitlebar() {
        this.setParams();
        console.log(this.params);
        this.makeTitlebar();
        this.makeTitlebarZones();
        this.makeMenu();
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

    /**
     * Creates the titlebar
     */
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
     * Creates the titlebar zones. For now they are three - the left, center and right.
     * The left zone holds the menu buttons. The center holds the window title. The 
     * right zone holds the window buttons.
     */
    makeTitlebarZones() {
        let left_zone = document.createElement("div");
        $(left_zone).attr({"class": "ect-titlebar_panel ect-t_p_left"});
        $(left_zone).css({
            //"font-family": this.params.defaultFont,
            //"font-size": "16px",
            "display": "inline-block",
            "position": "relative",
            "white-space": "nowrap"
        });

        let center_zone = document.createElement("div");
        $(center_zone).attr({"class": "ect-titlebar_panel ect-t_p_center"});
        $(center_zone).css({
            "font-family": this.params.defaultFont,
            "font-size": "16px",
            "display": "inline-block",
            "position": "relative",
            "flex": "2",
            "text-align": "center",
            "-webkit-app-region": "drag",
            "min-width": "100px",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            "overflow": "hidden"
        });

        let right_zone = document.createElement("div");
        $(right_zone).attr({"class": "ect-titlebar_panel ect-t_right"});
        $(right_zone).css({
            "font-family": this.params.defaultFont,
            "font-size": "16px",
            "display": "inline-block",
            "position": "relative",
            "white-space": "nowrap"
        });

        $("#ect-titlebar").append([left_zone, center_zone, right_zone]);
    }


    /**
     * Creates a menu button together with its parent
     * @param text - The text on the button
     * @returns {Element} The element that contains the button on the titlebar
     */
    makeMenuButton(text) {
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

        console.log(this.params.buttonHoverColor);

        let obj = this;

        $(menu_button).hover(function() {
            $(this).css({"background-color": obj.params.buttonHoverColor});
        });

        $(menu_button).mouseleave(function() {
            $(this).css({"background-color": obj.params.backgroundColor});
        });

        $(menu_button).click(function(event) {
            event.stopPropagation();
            $(".ect-submenu").hide();
            $(this).parent().children(".ect-submenu").first().css("display", "block");
        });


        $(menu_button).text(text);
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

    /** TODO: Fix the click handling
     * Creates a submenu button
     * @param {String} text - The text displayed on the button
     * @param {Element} btn - The submenu object
     * @param {boolean} opens_submenu - A flag that indicates if the button opens a submenu (true) or not (false)
     * @param {boolean} hidden_at_first - A flag that indicates if the submenu button is hidden at the beginning (true) or not (false)
     * @returns {Element} The submenu button
     */
    makeSubmenuButton(text, btn, opens_submenu, hidden_at_first) {
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

        $(subbutton_left_text).text(text);
        
        let subbutton_right_text = document.createElement("span");
        $(subbutton_right_text).attr({"class": "ect-submenu_option_command"});
        $(subbutton_right_text).css({
            "float": "right"
        });


        if(opens_submenu) {
            $(subbutton_right_text).html(this.params.defaultChevronRight);

            let obj = this;
            $(subbutton).hover(function() {
                $(this).css({
                    "background-color": obj.params.backgroundColor,
                });

                let subsubmenu = $(this).children("ect-subsubmenu").first();
                let left_offset = $(this)[0].getBoundingClientRect().x;
                let top_offset = $(this)[0].getBoundingClientRect().y;
                let outer_width = $(this).outerWidth();
                let subsubmenu_outer_width = $(subsubmenu).outerWidth();
                let subsubmenu_outer_height = $(subsubmenu).outerHeight();
                let window_size = obj.getWindowSize();

                if(left_offset + outer_width + subsubmenu_outer_width > window_size[0]) {
                    $(subsubmenu).css({
                        "display": "inline-block",
                        "left": ("" + (left_offset + outer_width) + "px"),
                        "top": ("" + top_offset + "px")
                    });
                }
                else {
                    $(subsubmenu).css({
                        "display": "inline-block",
                        "left": ("" + (left_offset + 10) + "px"),
                        "top": ("" + top_offset + "px")
                    });
                }

                $(subsubmenu).css("max-height", "none");

                subsubmenu_outer_height = $(subsubmenu).outerHeight();

                if(top_offset + subsubmenu_outer_height > window_size[1]) {
                    let dist_top = top_offset - (top_offset + subsubmenu_outer_height - window_size[1]);
                    if(dist_top < 30) {
                        dist_top = 30;
                    }

                    $(subsubmenu).css({
                        "top": ("" + dist_top + "px"),
                        "max-height": ("" + (window_size[1] - 30) + "px"),
                    });
                }   
                else {
                    $(subsubmenu).css({
                        "max-height": "none",
                    });
                }
            });
    
            $(subbutton).mouseleave(function() {
                $(this).css({
                    "background-color": obj.params.buttonHoverColor,
                });

                let subsubmenu = $(this).children("ect-subsubmenu").first();
                $(subsubmenu).css("display", "none");
            });
        }
        else {
            $(subbutton_right_text).text(btn.command);

            let obj = this;
            $(subbutton).hover(function() {
                $(this).css({
                    "background-color": obj.params.backgroundColor,
                });
            });
    
            $(subbutton).mouseleave(function() {
                $(this).css({
                    "background-color": obj.params.buttonHoverColor,
                });
            });
        }


        $(subbutton).click(btn.method);
        
        $(subbutton).append([subbutton_left_text, subbutton_right_text]);

        return subbutton;
    }

    /**
     * Creates a subsubmenu
     * @returns {Element} The subsubmenu
     */
    makeSubSubmenu() {
        let subsubmenu = document.createElement("div");
        $(subsubmenu).attr({"class": "subsubmenu"});
        $(subsubmenu).css({
            "display": "none",
            "position": "fixed",
            "min-width": "200px",
            "line-height": "normal",
            "font-family": "Arial",
            "font-size": "14px",
            "cursor": "pointer",
            /*color: white;*/
            "background-color": "#686868",
            "-webkit-box-shadow": "3px 3px 12px -2px rgba(0,0,0,0.75)",
            /*left: 0;*/
            "z-index": "120",
            "overflow-y": "auto"
        });

        return subsubmenu;
    }

    /**
     * Creates a separation line for the submenus
     * @returns {Element} The separation line
     */
    makeSeparatorLine() {
        let separator = document.createElement("li");
        $(separator).attr({"class": "ect-separated"});
        $(separator).css({
            "background-color": "" + this.params.buttonHoverColor + "!important",
        });

        let separator_line = document.createElement("span");
        $(separator_line).attr({"class": "ect-separator"});
        $(separator_line).css({
            "display": "block",
            "border-bottom": "1px solid" + this.params.defaultTextColor,
        });

        $(separator).append(separator_line);

        return separator;
    }

    /**
     * Create the submenu buttons recoursively
     * @param {*} obj - The submenu 
     * @param {Element} add_to - The element which the submenu will be added to
     */
    recoursiveAddition(obj, add_to) {
        for(let i in obj) {
            
            switch(obj[i].type) {
                case this.buttonTypes.standard: {
                    let new_submenu_button = this.makeSubmenuButton(i, obj[i], 0, 1);
                    $(add_to).children("ul").first().append(new_submenu_button);
                    console.log("" + i + " " + obj[i].command);
                    break;
                }
                case this.buttonTypes.submenu: {
                    console.log("" + i + " >");
                    let new_submenu_button = this.makeSubmenuButton(i, obj[i], 1, 1);
                    $(add_to).children("ul").first().append(new_submenu_button);
                    this.recoursiveAddition(obj[i].submenu, );
                    break;
                }
            }
        }
    }

    /**
     * Creates the menu
     */
    makeMenu() {
        for(let i in this.menu) {
            let new_button = this.makeMenuButton(i);
            let new_submenu = this.makeSubmenu();
            console.log(new_submenu);
            $(new_button).append(new_submenu);
            $("#ect-titlebar").children(".ect-titlebar_panel").first().append(new_button);
            this.recoursiveAddition(this.menu[i], new_submenu);
        }
    }



}

$(document).ready(function() {

    let menu = {
        "File": {
            "New File": {
                type: "standard",
                command: "Ctrl+N",
                method: () => testAlert(),
            },
            "Open File": {
                type: "standard",
                command: "Ctrl+O",
                method: () => testAlert(),
            },
            "Print menu": {
                type: "submenu",
                submenu: {
                    "Print": {
                        type: "standard",
                        command: "Ctrl+P",
                        method: () => testAlert(),
                    },
                }
            }
        },
        "Edit": {
            "Edit mode": {
                type: "standard",
                command: "Ctr+E",
                method: () => testAlert(),
            }            
        }
    };

    var r = new Titlebar({buttonHoverColor: "#686868"}, menu);
});

/**
 * Just a test function
 */
function testAlert() {
    alert("Test successful!");
}